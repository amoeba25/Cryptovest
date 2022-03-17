const router = require("express").Router(); 
const pool = require("../db"); 
const authorization = require("../middleware/authorization"); 

//getting all the coins in portfolio
router.get("/", authorization, async(req, res)=> {
    try {
        const getPortfolio = await pool.query("SELECT coin,price,quantity from PORTFOLIO WHERE user_id= $1 AND QUANTITY > 0", [req.user]); 

        res.json(getPortfolio.rows); 

        
    } catch (err) {
        console.error(err.message); 
        res.status(500).json("Error fetching portfolio");
    }
}); 


//selling a coin
router.post("/", authorization, async(req, res)=> {

    const user_id = req.user;
    const {coin, sell_price,sell_date, quantity} = req.body;

    try {


        //checking if coin exists in portfoio 
        const checkCoin = await pool.query(
            "SELECT coin FROM portfolio WHERE user_id= $1 AND coin=$2", 
            [user_id, coin]
        ); 

        if(checkCoin.rowCount){
            const bought = await pool.query(
                "SELECT * FROM transactions WHERE user_id = $1 AND coin= $2 ORDER BY buy_date", 
                [user_id, coin]
            ); 

            //to calculate the deduction in portfolio
            let total_price = 0; 
            let sell_qty = quantity; 

            for(let i=0; i<bought.rows.length; i++) {
                
                    if(sell_qty/bought.rows[i].quantity >= 1){
                        sell_qty = sell_qty - bought.rows[i].quantity; 
                        total_price += bought.rows[i].buy_price * bought.rows[i].quantity; 
                    }
                    else {
                        total_price += bought.rows[i].buy_price * (sell_qty);
                        break;
                    }
               
            }

            //altering portfolio
            const alterPort = await pool.query(
                "UPDATE portfolio SET price = price - $1, quantity = quantity - $2 WHERE user_id=$3 AND coin=$4 RETURNING *",
                [total_price, quantity, user_id, coin]
            ); 

            //adding the transaction 
            const sellTransact = await pool.query(
                "INSERT INTO transactions(user_id, coin, quantity, sell_price, sell_date) VALUES($1,$2,$3,$4,$5) RETURNING *",
                [user_id, coin, quantity, sell_price, sell_date]
            );

            //adding to funds
            const sellFunds = await pool.query(
                "UPDATE users SET funds = funds + $1 WHERE user_id= $2", 
                [total_price, user_id]
            );

            res.json(sellTransact);
           
        }

        else{
            return res.status(401).json("coin dosent exist in portfolio")
        }

        
    } catch (err) {
        console.error(err.message); 
        res.status(500).json("error while selling coin");
    }
})

module.exports = router; 
