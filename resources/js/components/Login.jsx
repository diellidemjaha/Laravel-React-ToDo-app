import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = "http://127.0.0.1:8000/";


axios.defaults.withCredentials = true;


function LogInForm() {
  const navigate = useNavigate('');

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };
    
    try {
      const response = await axios.post('/api/login', formData, { headers });

      if (response.status === 201) {
        console.log('Login successful');
        console.log('Response data:', response.data);
         
      
      const token = response.data.token;
      const userId = response.data.user_id;

     
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', userId);

        
        window.location.href = '/'; 
       
      }
    } catch (error) {
      console.error('Login error:', error);
      console.log('Error response data:', error.response?.data);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)' }}>
    <form onSubmit={handleSubmit} method="POST" action="/loginUser">
      <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
        <div className='mask gradient-custom-3'></div>
        <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
          <MDBCardBody className='px-5'>
            <h2 className="text-uppercase text-center mb-5">Log in to todo-app</h2>
            <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' name='email' onChange={(e) => { handleChange(e) }} />
            <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' name='password' onChange={(e) => { handleChange(e) }} />
            <div className='d-flex flex-row justify-content-center mb-4'>
            </div>
            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Login</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
    </section>
  );
}

export default LogInForm;