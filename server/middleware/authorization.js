/*This is a JWT authorization middleware */

const jwt = require("jsonwebtoken")
require('dotenv').config()


module.exports = async(req, res, next) => {

    const jwtToken = req.header("token"); //getting token from header

    //check if token not present
    if(!jwtToken) {
        return res.status(403).json("Not authorised");
    }

    //verify token
    try {

        const payload = jwt.verify(jwtToken, process.env.JWT_TOKEN);

        req.user = payload.user;
        next();

    } catch(err) {
        console.error(err.message)
        return res.status(403).json("Not authorised!")
    }
}

