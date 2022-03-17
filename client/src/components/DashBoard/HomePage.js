import Coin from "./Coin";
import { useEffect, useState } from "react";

const HomePage = ({setAuth}) => {
  const [currCoin, setCurrCoin] = useState([]);
  const [inputs, setInputs] = useState({
    quantity:"",
    buy_price: "",
  })


  const {buy_price, quantity} = inputs;

  const requiredSymbols = [
    {
      name: 'Bitcoin',
      sym: 'BTCUSDT',
    },
    {
      name: 'Etherium',
      sym: 'ETHUSDT',
    },
    {
      name: 'Cardano',
      sym: 'ADAUSDT',
    },
    {
      name: 'Polkadot',
      sym: 'DOTUSDT',
    },
    {
      name: 'Matic',
      sym: 'MATICUSDT',
    },
  ];


  const btnClicked = async(e,lastPrice) => {
    setCurrCoin(requiredSymbols.filter(symbol => symbol.sym === e.target.value)[0]);
    
    setCurrCoin((prevState) => ({
      ...prevState,
      "buy_price": lastPrice
    }));
    
    setInputs((prevState) => ({
      ...prevState,
      "buy_price": lastPrice
    }));

  }

  const onChange = (e)=> {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async(e) => {
    e.preventDefault(); 

    //clearing the input quantity
    setInputs((prevState) => ({
      ...prevState,
      "quantity": ''
    }));

    const coin = currCoin.sym;
    const buy_date = new Date().toJSON().slice(0,10).replace(/-/g,'-');

    try {
      const body = {coin, buy_price, buy_date, quantity}; 
      
      const response = await fetch("http://localhost:5000/home", {
        method: "POST", 
        headers: {"Content-type": "application/json", token: localStorage.token},
        body: JSON.stringify(body)
      }); 

      const paraRes = await response.json();


      
    } catch (err) {
      console.error(err.message);
    }
  }


  return (
    <div> 
      <div className="container d-flex mt-3 justify-content-around">
        
      </div>
      <div className="container">
        { requiredSymbols.map((coin,index) => <Coin symbols={requiredSymbols} coin={coin} btnClicked={btnClicked}  key={index} /> )}
      </div>
              {/* modal popup for buying */}
      <div className="modal fade" id="buyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{currCoin.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={onSubmitForm}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Buy price: </label>
                   {currCoin.buy_price}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Quantity</label>
                    <input type="number" className="form-control"  placeholder="Enter the quantity" value={quantity} name='quantity' onChange ={(e)=> onChange(e)}/>
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-primary">Buy</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
    
   );
}
 
export default HomePage;