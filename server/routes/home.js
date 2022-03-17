const router = require("express").Router(); 
const pool = require("../db"); 
const authorization = require("../middleware/authorization"); 

//buying a coin
router.post("/", authorization, async(req, res)=> {

    const user_id = req.user;
    console.log("user",user_id)
    const {coin, buy_price, buy_date, quantity} = req.body;
    const total_price = buy_price * quantity; 

    try {

        const buyTransact = await pool.query(
            "INSERT INTO transactions(user_id, coin, buy_price, buy_date,quantity) VALUES($1, $2, $3, $4, $5) RETURNING *", 
            [user_id, coin, buy_price, buy_date, quantity]
        ); 

        //check if coin already exisists in portfolio
        const checkCoin = await pool.query(
            "SELECT coin FROM portfolio WHERE user_id= $1 AND coin=$2", 
            [user_id, coin]
        ); 

        if(checkCoin.rowCount){
            
            const changePort = await pool.query(
                "UPDATE portfolio SET price = price + $1, quantity = quantity + $2 WHERE user_id = $3 AND coin=$4 RETURNING *",
                [total_price, quantity, user_id, coin]
            );

            res.json(changePort.rows);

        }

        else{

            //coin added to portfolio
            const changePort = await pool.query(
                "INSERT INTO portfolio(user_id, coin, price, quantity) VALUES($1, $2, $3, $4) RETURNING *",
                [user_id, coin, total_price, quantity]
            );
    
            res.json(changePort.rows);
        }

        //reduce the funds
        const reduceFunds = await pool.query(
            "UPDATE users SET funds = funds - $1 WHERE user_id= $2 RETURNING *",
            [total_price ,user_id]
        ); 

        
    } catch (err) {
        console.error(err.message); 
        res.status(500).json("error while buying coin");
    }
})


module.exports = router; 
