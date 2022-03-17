import DashBoardNavbar from "./DashBoardNavbar";

import { BrowserRouter as Router ,
  Route, Redirect, Routes, Switch} from "react-router-dom";
import HomePage from "./HomePage";
import Portfolio from "../Portfolio/Portfolio";
import MyAccount from "../Profile/MyAccount";

const DashBoard = () => {
  return ( 
    <div className="">
        <DashBoardNavbar />
        
        <Routes>
          
          <Route exact path="/portfolio" element={<Portfolio />} ></Route>
          <Route exact path="/account" element={<MyAccount />} > </Route>
          <Route path="/home" element={<HomePage />} ></Route>
          
        </Routes>
    </div>
   );
}
 
export default DashBoard;