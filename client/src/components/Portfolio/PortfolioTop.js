import React from 'react';
import { useEffect, useState } from 'react';

const PortfolioTop = ({portfolio, currVal}) => {

      let sum=0;
      
      const values = currVal.length? (currVal.map(item => item.amount).reduce((prev, next) => parseFloat(prev) + parseFloat(next))): 0;
      for(let i=0;i<portfolio.length;i++){
          sum += parseFloat(portfolio[i].price )
      }

      const getCoinQuantity = (coinName) => {
        return currVal.filter((coin) => coin.coin === coinName)?.[0]?.amount;
      }

      const roundPrice = (price) => {
        return Math.round(price*1000)/1000;
      }

      let profit = values - sum; 

      const getCurrentTotal = () => {
        let current = 0;
        for(let i=0;i<portfolio.length;i++){
          current += parseFloat(portfolio[i].quantity) * 
           parseFloat(getCoinQuantity(portfolio[i].coin));
      }
      console.log("current",current)
      return current;
      }

      return ( 
          <div className="mt-5">
            <div className="row d-flex justify-content-center m-2">
              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Invested: </h5>
                    <p className="card-text fs-4">{roundPrice(sum)}</p>

                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Current: </h5>
                    { isNaN(roundPrice(getCurrentTotal())) ? '...' : roundPrice(getCurrentTotal()) }
                    <p className="card-text fs-4">{portfolio?.quantity}</p>

                  </div>
                </div>
              </div>
              <div className="col-12 m-2">
                <div className="card">
                  <div className="card-body d-flex justify-content-center">
                    <h5 className="card-title ">Profit/Loss:   </h5>
                    <h5 className={`card-text 
                    ${(getCurrentTotal() - sum) > 0 ? 'text-success':'text-danger'} ms-2`}>  
                    { isNaN(roundPrice(getCurrentTotal() - sum)) ? 'loading' : roundPrice(getCurrentTotal() - sum) }</h5>
                    <p className={`card-text 
                    ${(getCurrentTotal() - sum) > 0 ? 'text-success':'text-danger'} ms-2`}>
                        ({ isNaN (roundPrice((getCurrentTotal() - sum)/sum) ? '' : roundPrice(getCurrentTotal() - sum)/sum)}%) 
                      </p>

                  </div>
                </div>
              </div>
            </div>
          </div>

        );
}
 
export default PortfolioTop;