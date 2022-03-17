import React from 'react';
import { useEffect, useState } from "react";


function PortfolioModal({currCoin}) {

    const [inputs, setInputs] = useState({
        quantity:"",
      })

      let {quantity} = inputs;
      quantity = parseFloat(quantity);

      const onChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
      }

      const onSubmit = async(e) => {
        e.preventDefault(); 

        //clearing the input quantity
        setInputs((prevState) => ({
          ...prevState,
          "quantity": ''
        }));

        const coin = currCoin.coin;
        const sell_date = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        const sell_price = parseFloat(currCoin.sell_price);

        try {
          const body = {coin, sell_price, sell_date,quantity};

          const response = await fetch("http://localhost:5000/portfolio", {
          method: "POST", 
          headers: {"Content-type": "application/json", token: localStorage.token},
          body: JSON.stringify(body)
          }); 

          const paraRes = await response.json();

          console.log(paraRes);


          
        } catch (err) {
            console.error(err.message)
        }
      }

  return (
    <div className="modal fade" id="sellModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{currCoin.coin}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form onSubmit={onSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Sell price</label> <br />
                    {currCoin.sell_price}
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Quantity</label>
                    <input type="number" className="form-control"  placeholder="Enter the quantity" value={quantity} name='quantity' onChange={(e)=> onChange(e)}/>
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <button type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
                  <button type="submit" className="btn btn-primary">Sell</button>
                </div>
              </form>
            </div>
          </div>
        </div>
  )
}

export default PortfolioModal