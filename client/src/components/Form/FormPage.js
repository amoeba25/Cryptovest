import LoginForm from "./LoginForm";
import Registration from "./Registration";


const FormPage = () => {
  return ( 
    <div className="vh-100 bg-dark" >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card bg-light" style= {{ borderRadius: '1rem' }}>
              
              {/* LEFT CARD IMAGE  */}
              <div className="row g-0 ">
              <div className=" col-md-6 col-lg-5 d-none d-md-block">
                <img 
                src=""
                className="img-fluid"
                alt="formImage"
                style= {{borderRadius: '1rem 0 0 1rem', maxHeight: '90vh'}}
                />
              </div>
              
              {/* Need to change max height */}
                <div className="col-md-6 col-lg-7 d-flex overflow-auto" style= {{maxHeight: '80vh'}}>
                <div className="card-body p-4 p-lg-5">
                <div className="d-flex align-items-center mb-3 pb-2">

                  {/* LOGO AND TITLE ON FORM */}
                    <div className="col-1 me-2 h3 mt-1">
                    <i class="bi bi-person-badge-fill"></i>
                    </div>
                    <div className="col-lg-8 col-md-11">
                      <span className="h2 mb-4">Crypto Paper Trader</span>
                    </div>
                  </div>
                    <LoginForm />

                    <Registration />
                      
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

   );
}
 
export default FormPage;