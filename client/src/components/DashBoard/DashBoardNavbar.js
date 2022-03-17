import { Link } from "react-router-dom";

const DashBoardNavbar = ({setAuth}) => {
   //function to logout
   const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem('token');
    setAuth(false);
  }
  return ( 

    <nav className="navbar navbar-expand-lg navbar-light">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/home" className="text-decoration-none">
              <span className="nav-link active fs-4">Home</span>
            </Link>
            
          </li>
          <li className="nav-item">
            <Link to="/portfolio" className="text-decoration-none">
              <span className="nav-link active fs-4">Portfolio</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/account/profile" className="text-decoration-none">
              <span className="nav-link active fs-4">Account</span>
            </Link>
          </li>
          </ul>
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              {localStorage.token ? (<button className="btn btn-danger" id="logout" onClick={(e)=> logout(e)}>Logout</button>): <> </>}
            </li>
          </ul>
      </div>
    </div>
  </nav>
   );
}
 
export default DashBoardNavbar;