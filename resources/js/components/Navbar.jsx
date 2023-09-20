import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

function ToDoNav() {
    const navigate = useNavigate('')
    const handleLogout = async (e) => {
        try {
        const response = await axios.post('api/logout', null, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, 
            },
          });

          if (response.status === 200) {
            console.log(response.data.message);

            localStorage.clear()

          navigate('/login');
        }} catch (error) {
          console.error('Logout failed:', error);
        }
      };
  return (
    <>
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Todo Tasks</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Sign in</Nav.Link>
            <Nav.Link onClick={() => handleLogout()}>Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    </>
  );
}

export default ToDoNav;
