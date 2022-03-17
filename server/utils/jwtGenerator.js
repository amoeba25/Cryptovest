const jwt = require('jsonwebtoken')
require('dotenv').config();

const jwtGenerator = (user_id) => {
    const payload = {
        user: user_id
    }

//sign the token
 return jwt.sign(payload, process.env.JWT_TOKEN, {expiresIn : "2hr"} )

}
module.exports = jwtGenerator;