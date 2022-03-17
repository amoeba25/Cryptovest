import PortfolioTop from "./PortfolioTop";
import PortfolioTable from "./PortfolioTable";
import { useEffect, useState } from "react";

const Portfolio = () => {

    const [portfolio, setPortfolio] = useState([]);
    const [currVal, setcurrVal] = useState([]);


    //function to get the portfolio table data
    const getPortfolio = async () => {
      try {
          const response = await fetch("http://localhost:5000/portfolio", {
              method: "GET",
              headers: {token: localStorage.token}
          });

          const parseRes = await response.json();
                    console.log("pro",parseRes)

          setPortfolio(parseRes); 
          
      } catch (err) {
          console.error(err.message);
      }
  }

  //function too get the current value of coins
  const currentData = async(portfolio) => {

    try {
      const coin = await Promise.all(portfolio.map(async port=>{
        const req = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${port.coin}`);
        const response = await req.json(); 
        console.log("Response",response)
        
        return {'coin': port.coin,
              'amount': response.lastPrice }
      }))

      setcurrVal(coin);
      
    } catch (error) {
      console.error(error.message)
    }

  }

  // console.log(portfolio)

  
  useEffect(()=> {
      //getting the portfolio data
      getPortfolio();

  }, []);

  useEffect(()=> {
      
      //getting the real time value of each coin
      const refreshValues = setInterval(async()=> {
          currentData(portfolio)
      }, 3000); 

      //cleanup
      return ()=> {
        clearInterval(refreshValues);
      }

  }, [currVal]);



  // console.log(currVal);


  return ( 
    <div className="container">
      <PortfolioTop portfolio={portfolio} currVal={currVal} />
      <PortfolioTable portfolio={portfolio} currVal={currVal} />
    </div>
    
   );
} 
export default Portfolio;