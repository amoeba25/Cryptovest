const router = require('express').Router(); 
const pool = require('../db');
const bcrypt = require("bcrypt"); 
const jwtGenerator = require("../utils/jwtGenerator"); 
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registeration
router.post("/register", validInfo, async(req, res)=> {

    const {f_name, l_name, email, password} = req.body;
    console.log(password);
    try {
        //check if user email exists already
        const user = await pool.query(
            "SELECT * FROM users WHERE email= $1", 
            [email]
        );

        if(user.rows.length !== 0) {
            return res.status(401).send("User already exists!")
        }

        //hashing the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt)
        console.log(bcryptPassword);
        //adding new user
        const newUser = await pool.query(
            "INSERT INTO users(f_name, l_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [f_name, l_name, email, bcryptPassword]
        );

        //generating JWT token
        const token = jwtGenerator(newUser.rows[0].user_id); 
        
        res.json({token})
    

        
    } catch (err) {
        console.error(err.message); 
        res.status(505).send("Server error")
    }
});

//login route
router.post("/login", validInfo, async(req, res)=> {
    const {email, password} = req.body;

    try {
        const user = await pool.query(
            "SELECT * FROM USERS WHERE email = $1", 
            [email]
        );

        //email validation
        if(user.rows.length === 0) {
            return res.status(401).json("No user with that email");
        }

        //password validation
        const validPassword = await bcrypt.compare(password, user.rows[0].password); //decrypts and compares the password

        if(!validPassword) {
            return res.send(401).json("Invalid Password");
        }

        //generate a JWT token
        const token = jwtGenerator(user.rows[0].user_id); 

        res.json({token})
        
    } catch (err) {
        console.error(err.message); 
        res.status(505).send("Server error")
    }
})

//to verify if the person is authorised with correct jwt token
router.get('/verify', authorization, async(req, res)=> {
    try {
        res.json(true)

    } catch (err) {
        console.error(err.message); 
        res.status(505).send("Server error")
        
    }
})

module.exports = router;
