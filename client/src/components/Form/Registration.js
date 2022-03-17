import InputField from "./InputField";

import { useState } from "react";

import { Collapse } from "bootstrap";

const Registration = () => {
  const [name,setName]= useState('');
  const [regEmail,setRegEmail]= useState('');
  const [regPassword,setRegPassword]= useState('');
  const [reEnterPass,setReEnterPass]= useState('');

  return ( 
    <div>
    <button 
      className="btn btn-outline-primary w-100 mt-1 mb-3"
      data-bs-toggle="collapse"
      data-bs-target="#collapseRegister"
      >
        Register
      </button>

      <div className="collapse" id="collapseRegister">
        <div className="card card-body overflow-auto">
          <form >
            <InputField type="text" placeholder="Full Name"
            value={name} hook={setName} />
            <InputField type="email" placeholder="Email Address"
            value={regEmail} hook={setRegEmail} />
            <InputField type="password" placeholder="Password"
            value={regPassword} hook={setRegPassword} />
            <InputField type="password" placeholder="Re-Enter Password"
            value={reEnterPass} hook={setReEnterPass} />

            <button type='submit' className="btn btn-primary btn-block w-100">Submit</button>

          </form>
        </div>
      </div>
    </div>

   );
}
 
export default Registration;