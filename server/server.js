const express= require('express')
const app= express()
const pool = require('./db')
const cors = require('cors');

app.use(cors()) //cors useage
app.use(express.json()) //json parser middleware

//ROUTES//

//regiser and login routing
app.use("/auth", require("./routes/jwtAuth"))

//home route
app.use("/home", require("./routes/home"))

//account route
app.use("/account", require("./routes/account"))

//portfolio route
app.use("/portfolio", require("./routes/portfolio"))

//getting all the users
app.get('/users', async(req, res)=>{
    try {
        const allUser = await pool.query(
            "SELECT * FROM users"
        )
        res.json(allUser.rows)
    } catch(err) {
        console.error(err.messages)
    }
})


const port= 5000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`); 
})
 