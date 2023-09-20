import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/Register';
import ToDoNav from './components/Navbar';
import LogInForm from './components/Login';
import AddTodo from './components/Home';




function App() {
    let logged_in = localStorage.getItem('token')
    return (
        <>
            <Router>
            <ToDoNav />
                <Routes>
                    <Route path="/" element={logged_in == null ? <LogInForm/> : <AddTodo />} />
                    <Route path="/login" element={logged_in == null ? <LogInForm/> :<LogInForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </Router>
        </>
    )
}


const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);
