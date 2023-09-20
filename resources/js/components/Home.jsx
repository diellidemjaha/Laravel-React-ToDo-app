
import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';



function AddTodo() {


  const [userId, setUserId] = useState(null);

  useEffect(() => {
   
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
  }, []);

  const [todos, setToDos] = useState([]);

  const handleCheckboxChange = async (taskId) => {
   
    const updatedTodos = [...todos];
    
    const index = updatedTodos.findIndex((todo) => todo.id === taskId);
  
   
    if (index !== -1) {
     
      updatedTodos[index].completed = !updatedTodos[index].completed;

 

    try {
   
      const response = await axios.put(`/api/todos/${taskId}/done`, {
        checkbox: updatedTodos[index].completed,
      });

      if (response.status === 200) {
     
        setToDos(updatedTodos);
        console.log(response.data.message)
        console.log("task id", taskId)
      }
    } catch (error) {
      console.error('Error updating checkbox:', error);
    }
  }};



  const [todoData, settodoData] = useState({
    title: '',
    checkbox: false,
  })

  const handleInput = (e) => {
  
    settodoData((prevtodoData) => ({
      ...prevtodoData,
      title: e,
    }));
  }
  const handleCheckBox = (e) => {
    const { data } = e;

    settodoData((prevtodoData) => ({
      ...prevtodoData,
      title: data,
      checkbox: isChecked,
    }));
  }
  console.log(todoData)

  const saveTodo = async (e) => {
    
    const checkboxValue = todoData.checkbox !== null ? todoData.checkbox : false;


    let body = {
      title : todoData?.title,
      user_id : userId,
      checkbox:false,
    }
    try {

      const res = await axios.post('/api/todos/', body);
  
      if (res.data.status === 200) {
        console.log(res.data.todo);
        getToDos()
   
         settodoData((prevTodoData) => ({
          ...prevTodoData,
          title: '',
        }));
      }
    } catch (error) {
      console.error('Error saving todo:', error);
    }
    }

  const handleDeleteTodo = async (taskId) => {
    try {

      const response = await axios.delete(`/api/todos/${taskId}`);
  
      if (response.status === 200) {
       
        const updatedTodos = todos.filter((todo) => todo.id !== taskId);
        setToDos(updatedTodos);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };


  const getToDos = () => {
    axios.get(`api/todos/${userId}`).then(
      data => {
        console.log("getToDos", data.data.todos);
        setToDos(data.data.todos);
      }
    ).catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    getToDos()
  }, [userId]);


  return (
    <>
      <section className="vh-100" style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">

              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">

                  <h6 className="mb-3">Todo Tasks</h6>

                  <div className="form-outline flex-fill">
                    <input type="text" id="form3" name="title" className="form-control form-control-lg" default={todos?.title} onChange={(e) => handleInput(e.target.value)} />
                    <label className="form-label">What do you need to do today?</label>
                  </div>
                  <button onClick={() => saveTodo()} className="btn btn-primary btn-lg ms-2">Add</button>

                  <ul className="list-group mb-0">
                    {todos?.map((el, index) => {
                      return (
                        <>
                          <li
                          key={el.id}
                          className={`list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2`}
                          style={{ textDecoration: el.completed || el.checkbox  ? 'line-through' : 'none' }}>
                            <div className="d-flex align-items-center">
                              <input className="form-check-input me-2" type="checkbox"  defaultChecked={el.checkbox} onChange={() => handleCheckboxChange(el.id,index)} />
                              {el?.title} 
                            </div>
                            <button
                            className="badge bg-danger float-end"
                            onClick={() => handleDeleteTodo(el.id)}
                              >
                            Delete
                            </button>
                          </li>
                        </>
                      )
                    })}
                  </ul>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>

  );
}


export default AddTodo;