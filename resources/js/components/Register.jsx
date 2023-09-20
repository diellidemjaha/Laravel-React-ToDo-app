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

function RegisterForm() {
    const navigate = useNavigate('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/registerUser', formData);

            if (response.status === 201) {
                console.log('Registration successful');

                navigate('/login');

            }
        } catch (error) {
            console.error('Login error:', error);
            console.log('Error response data:', error.response?.data); }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)} method="POST" action="/registerUser">
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{ backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)' }}>
                <div className='mask gradient-custom-3'></div>
                <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
                    <MDBCardBody className='px-5'>
                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                        <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='name' type='text' name="name" onChange={(e) => { handleChange(e) }} />
                        <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='email' type='email' name="email" onChange={(e) => { handleChange(e) }} />
                        <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='password' type='password' name="password" onChange={(e) => { handleChange(e) }} />
                        <div className='d-flex flex-row justify-content-center mb-4'>
                        </div>
                        <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit'>Register</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </form>
    );
}

export default RegisterForm;