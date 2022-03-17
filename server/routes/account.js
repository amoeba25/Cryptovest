const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//route to get the name and funds associated with user
router.get("/profile", authorization, async(req, res)=> {
    try {
        //getting the username and funds
        const newUser = await pool.query("SELECT f_name, funds FROM USERS WHERE user_id=$1", [req.user]);
        res.json(newUser.rows[0])
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Account not accesible")
    }
})

//route to alter funds in an account
router.post("/profile", authorization, async(req, res)=> {
    const {updateFunds}= req.body;
    try {
        const newFunds = await pool.query("UPDATE USERS SET funds= funds+$1 WHERE user_id=$2 RETURNING *", [updateFunds, req.user]);

        res.json(newFunds.rows[0].funds);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("profile not accesible")
    }
})

//getting all the trasactions for a user
router.get("/transaction", authorization, async(req, res)=> {
    try {
        const getTransaction = await pool.query("SELECT coin,buy_price,buy_date,quantity,sell_date,sell_price FROM TRANSACTIONS WHERE user_id=$1", [req.user]);

        res.json(getTransaction.rows);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Transaction not accesible")
    }
})

module.exports = router;