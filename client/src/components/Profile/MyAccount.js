import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';


const MyAccount = ({setAuth}) => {

  const [name, setName] = useState(""); 
  const [funds, setFunds] = useState(); 
  const [updateFunds, setupdateFunds] =useState(0);

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/account/profile", {
        method: "GET",
        headers: {token: localStorage.token}
      });

      const praseRes = await response.json(); 
      if(praseRes) {
        setName(praseRes.f_name);
        setFunds(praseRes.funds);
      }
     
      
    } catch (err) {
      console.error(err.message)
    }
  }

  const onChange = (e) => {
    setupdateFunds(e.target.value);
  }

  const onSubmitForm = async(e) => {  
    // e.preventDefault();

    try {
      const body = {updateFunds};

      const response = await fetch("http://localhost:5000/account/profile", {
        method: "POST", 
        headers: {token: localStorage.token, "Content-type":"application/json"}, 
        body: JSON.stringify(body)
      })

      const paraRes = await response.json();


      
    } catch (err) {
        console.err(err.message);
    }

  }

  useEffect(()=> {
    getProfile();
  }, [])
  return ( 
    <div className='container'> 
  <div className="col-7 container mt-5">
    <div className="d-flex justify-content-between">
      <h3>Name:  </h3>
      <h4>{name} </h4>
    </div>
    <div className="d-flex justify-content-between">
      <h3>Funds:  </h3>
      <h4>{funds} </h4>
    </div>
    <Link to='/account/transactions'>Transactions</Link>
    <form className='mt-5' onSubmit={onSubmitForm}>
      <input type='number' name='funds' placeholder="funds" className="form-control" value={updateFunds}  onChange={(e)=>onChange(e)}/>
      <button className="btn btn-primary mt-2">Add Funds</button>
    </form>
  </div>

    </div>
   );
}
 
export default MyAccount;