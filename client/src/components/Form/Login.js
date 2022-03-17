import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Login =({setAuth}) => {

    const [inputs, setInputs] = useState({
        email:"",
        password:""
    })

    const {email, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {
            const body = {email, password};

            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST", 
                headers: {"Content-type":"application/json"},
                body: JSON.stringify(body)
            }); 

            const paraRes = await response.json();

            localStorage.setItem('token', paraRes.token);
            setAuth(true);
            
        } catch (err) {
            console.error(err.message)
        }
    }
  return (
     <div className='container'>
    <h1 className='text-center my-5'>Login</h1>
    <form onSubmit={onSubmitForm}>
        <input type='email' name='email' placeholder='Email' className='form-control my-3' value={email} onChange={(e)=>onChange(e)}/>
        <input type='password' name='password' placeholder='Password' className='form-control my-3' value={password} onChange={(e)=> onChange(e)} />
        <button className='btn btn-primary w-100'>Log In</button>
    </form>
    <Link to='/register'>Register</Link>
    </div>
  )
}

export default Login; 