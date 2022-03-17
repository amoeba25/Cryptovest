import InputField from "./InputField";

import { useState } from "react";

const LoginForm = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  return ( 
    <form >

        <h4 className="mb-4">Sign In</h4>

        <InputField type="email" placeholder="Email Address" 
        value={email} hook={setEmail} />

        <InputField type="password" placeholder="Password" 
        value={password} hook={setPassword} />

        <button type="submit" className="btn text-light w-100 mb-2 bg-primary" >
          Login
        </button>

    </form>
   );
}
 
export default LoginForm;