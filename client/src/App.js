import { useEffect, useState } from "react";
import { BrowserRouter as Router ,
  Route, Redirect, Routes, Navigate} from "react-router-dom";
import './App.css';
import DashBoard from "./components/DashBoard/DashBoard";
import DashBoardNavbar from "./components/DashBoard/DashBoardNavbar";
import HomePage from "./components/DashBoard/HomePage";
import MyAccount from "./components/Profile/MyAccount";
import Portfolio from "./components/Portfolio/Portfolio";
import GetStarted from "./components/Started/GetStarted";
import Login from "./components/Form/Login";
import Register from "./components/Form/Register";
import Transactions from "./components/Profile/Transactions";



const App = () => {

  // useEffect(async()=>{
  //   const rest= await fetch('http://localhost:3000/users'); 
  //   const response = await rest.json();

  //   console.log(response)
  // }, [])

  //authentication state intially false
  const [isAuthenticated, setisAuthenticated] = useState(false);

  //sets the authentication state
  const setAuth = boolean => {
    setisAuthenticated(boolean);
  }

  useEffect(()=>{
    isAuth()
  })

  const isAuth = async() => {
    try {

      const response = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: {token:localStorage.token}
      })

      const praseRes = await response.json(); 

      praseRes === true ? setisAuthenticated(true): setisAuthenticated(false)
      
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <Router> 
    <div className="App">
        <DashBoardNavbar setAuth={setAuth}/>
      <Routes>

        <Route path= '/' element= {<GetStarted />} /> 

        
        <Route path="/login" element={!isAuthenticated?
                                      (<Login setAuth={setAuth}/>): (<Navigate to='/home' />)}/>
        <Route path="/register" element={!isAuthenticated?
                                      (<Register setAuth={setAuth}/>): (<Navigate to='/home' />)}/>
        <Route path="/home" element={isAuthenticated?
                                    (<HomePage setAuth={setAuth} />):(<Navigate to='/login' />)} ></Route>
        <Route path="/portfolio" element={isAuthenticated? 
                                          (<Portfolio setAuth={setAuth}/>):(<Navigate to='/login' />)} ></Route>
        <Route path="/account/profile" element={isAuthenticated? 
                                          (<MyAccount setAuth={setAuth}/>):(<Navigate to='/login' />)} ></Route>
        <Route path="/account/transactions" element={isAuthenticated? 
                                          (<Transactions setAuth={setAuth}/>):(<Navigate to='/login' />)} ></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
