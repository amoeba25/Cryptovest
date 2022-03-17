import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';

const Transactions = ({setAuth}) => {

  const [transaction, setTransaction] = useState([]);


  const getTransactions = async() => {
    try {
      const response = await fetch("http://localhost:5000/account/transaction", {
        method: "GET",
        headers: {token: localStorage.token}
      }); 

      const parseRes = await response.json(); 
      setTransaction(parseRes)


      
    } catch (err) {
        console.error(err.message); 
    }
  }

  useEffect (() => {
    getTransactions();
  }, []);


  return ( 
    <div className="container my-5">
      <h1 className="mb-5 text-center">Transactions</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Amount</th>
            <th scope="col">Transaction</th>
            <th scope="col">Coin</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((trans)=>{
            if(trans.sell_price !== null){
              //coin is sold
              return (
                <tr key={trans.date}>
                  <th scope="row">{trans.sell_price* trans.quantity}</th>
                  <td>{'Credit'}</td>
                  <td>{trans.coin}</td>
                  <td>{trans.sell_date}</td>
                </tr>
              )
            }
            return (
              <tr key={trans.date}>
                <th scope="row">{trans.buy_price* trans.quantity}</th>
                <td>{'Debit'}</td>
                <td>{trans.coin}</td>
                <td>{trans.buy_date}</td>
              </tr>
            )
          })}
          
        </tbody>
      </table>
      <Link to='/account/profile'>Profile</Link>
    </div>
   );
}
 
export default Transactions;