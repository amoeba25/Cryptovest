
import { useEffect, useState } from "react";

const Coin = ({coin,btnClicked}) => {
  const [coinInfo,setCoinInfo]= useState([]);

  /*gets the coin symbol and fetches the 
  data related to the symbol
  
  returns: cleanup function*/
  useEffect(() => {
    const refreshValues = setInterval( async() => {
      await getData(coin.sym);
    }, 3000);
    
    return () => {
      clearInterval(refreshValues);
    }
  }, []);

  const getData = async(symbol) => {
    let burl = "https://api.binance.com";

    let query = `/api/v3/ticker/24hr?symbol=${symbol}`;
        
    let url = burl + query;
        
    const req= await fetch(url);
    const response = await req.json();
    
    setCoinInfo(response); 

  } 

  //formats the price to ??
  const formatPrice = (price) => {
    if(isNaN(price) ){
      return '  ';
    }
    return Math.floor( price * 100) / 100;
  }



  return ( 
    <div className="d-flex container-fluid border mt-4 align-items-center">
      
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-coin" viewBox="0 0 16 16">
          <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path fillRule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
        </svg>
        <div className="container">
          <h2 className="m-2">{coin.name}</h2>
          <div className="d-flex justify-content-between">
            <p className="ms-2"> Open: {formatPrice(coinInfo.openPrice)}</p>  
            <p className="ms-2">High: {formatPrice(coinInfo.highPrice)}</p> 
            <p className="ms-2"> Low: {formatPrice(coinInfo.lowPrice)}</p>
          </div>
        </div>
        <button className="btn btn-dark m-3" data-toggle='modal' data-target='#buyModal' value={coin.sym} onClick={(e)=>btnClicked(e,formatPrice(coinInfo.lastPrice))}>Buy</button>
        


        <h4 className="text-success">{ formatPrice(coinInfo.lastPrice) }$</h4>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-arrow-up text-success" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
        </svg>
        
      </div>
   );
}
 
export default Coin;