import React from 'react';
import { useEffect, useState } from 'react';
import PortfolioModal from './PortfolioModal';

function PortfolioTable({portfolio, currVal}) {

    // console.log('cuurr', currVal);
    const [currCoin, setCurrCoin] = useState({
        'coin': '',
        'sell_price': ''
    });

    
    //when the sell button is clicked
    const btnClicked = async(e) => {

        setCurrCoin((prevState)=> ({
            ...prevState,
            'coin': e.target.value,
            'sell_price': currVal.find(current => e.target.value === current.coin).amount
        }))
    }

    const getCurrent = (coin) => {
        if(currVal.length){
            if(currVal.find(current => coin.name === current.coin).amount){
                return currVal.find(current => coin.name === current.coin).amount * coin.quantity
            }
            else{
                return 0
            }
        }
        return 0;
    }

    const roundPrice= (price) => {
        return Math.round(price*1000)/1000
    }
    
    return (
        <div className='container mt-5'>
            <h3>Your Portfolio</h3>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Coin</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Invested</th>
                    <th scope="col">Current</th>
                    <th scope="col">P/L</th>
                    <th scope="col">Option</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolio.map(port=> {
                        return (
                            <tr key={port.coin}>
                                <th scope='row'>{port.coin}</th>
                                <td scope='row'>{port.quantity}</td>
                                <td scope='row'>{Math.round((port.price * 100))/100}</td>
                                <td scope='row'>
                                    {roundPrice(currVal.length ? 
                                        (currVal.find(current => port.coin === current.coin).amount ?
                                              currVal.find(current => port.coin === current.coin).amount * port.quantity : 0
                                               ) : 0)}
                                    </td>
                                <td scope='row'>{roundPrice((currVal.length ? 
                                        (currVal.find(current => port.coin === current.coin).amount ?
                                              currVal.find(current => port.coin === current.coin).amount * port.quantity : 0
                                               ) - port.price : 0) / roundPrice(port.price))}%</td>
                                               
                                <td scope='row'>{currVal.length ? (<button className="btn btn-primary" data-toggle='modal' data-target='#sellModal' value={port.coin} onClick={e=> btnClicked(e)}>Sell</button>)
                                                : (<button className="btn btn-primary" data-toggle='modal' data-target='#sellModal' value={port.coin} onClick={e=> btnClicked(e)} disabled>Sell</button>) } </td>
                            </tr>
                        ) 
                    })}
                </tbody>
            </table>

            <PortfolioModal currCoin={currCoin}/>
        </div>
    )
}

export default PortfolioTable