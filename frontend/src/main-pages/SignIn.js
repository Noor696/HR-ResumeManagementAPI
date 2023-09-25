import React, { useContext } from 'react'
import './SignIn.css'
import { BsFillPersonFill,BsFileLockFill,BsFileLock2Fill,BsLockFill } from "react-icons/bs";
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

function SignIn() {
    let {loginUser} = useContext(AuthContext)
  return (
    <div className='signin-container'>
        <div className='header'>
            <div className='text'>Admin Sign In</div>
            <div className='underline'></div>
        </div>

        <Form onSubmit={loginUser} className='inputs'>
            <Form.Group className='input'>
                <BsFillPersonFill className='icon'/>
                <Form.Control 
                className='control' 
                placeholder='user name'
                type='text'
                name='username'/>
            </Form.Group>

            <Form.Group className='input'>
                <BsLockFill className='icon'/>
                <Form.Control 
                className='control'
                placeholder='password' 
                type='password'
                name='password'/>
            </Form.Group>

            <div className='submit-container'>
                <button type='submit' className='submit'>Login</button>
            </div>
        </Form>
        
    </div>
  )
}

export default SignIn