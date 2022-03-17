import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = ({setAuth}) => {

    //setting state for inputs
    const [inputs, setInputs] = useState({
        
        f_name:"",
        l_name:"",
        email:"",
        password:""
    })

    const {f_name, l_name, email, password} = inputs;

    //function to record state for an input field change
    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value}) //set the key in state wrt to the changing value of input
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {
            const body= {f_name, l_name, email, password}; 
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST", 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify(body)
            }); 

            const parseRes = await response.json(); 

            localStorage.setItem('token', parseRes.token);

            setAuth(true);

            
            
        } catch (err) {
            err.message(err);
        }
    }


    return (
        <div className='container'>
        <h1 className='text-center my-5'>Register</h1>
        <form onSubmit={onSubmitForm}>
            <input type='text' name='f_name' placeholder='First Name' className='form-control my-3' value={f_name} onChange={(e)=> onChange(e)}/>
            <input type='text' name='l_name' placeholder='Last Name' className='form-control my-3' value={l_name} onChange={(e)=> onChange(e)}/>
            <input type='email' name='email' placeholder='Email' className='form-control my-3' value={email} onChange={(e)=> onChange(e)}/>
            <input type='password' name='password' placeholder='Password' className='form-control my-3'value={password} onChange={(e)=> onChange(e)} />
            <button className='btn btn-primary w-100'>Sign Up</button>
        </form>
        <Link to='/login'>Login</Link>
        </div>
    )
}

export default Register