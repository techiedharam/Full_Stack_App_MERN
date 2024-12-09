const jwt = require('jsonwebtoken');
const blacklist = require('../blacklist');
require("dotenv").config()

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (blacklist.includes(token)) {
            res.status(401).json({ message: "Invalid token Login First !" })
        }
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                res.status(401).json({ message: "Invalid token Login First !" })
            }
            else {
                req.userId = decoded._id
                req.role = decoded.role;
                next()
            }
        })

    } catch (error) {
        res.status(401).json({ message: "Error in middleware function" })
    }
}

module.exports = auth


// const authMiddleware = (req, res, next) => {
//     // here i should get the token
//     // then that token should be verified
//     // if token verified , then allowed to next route
//     // else send res as unauthorized
//     const token = req.headers.token.split(" ")[1];
//     console.log(token);
//     // from where token is comming
//     // generallly it is passed through header
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     // console.log(decoded);
//     if (decoded) {
//         res.send("Decoded successfully in auth")
//         next()
//     }
//     else {
//         res.send("unauthorized...")
//     }

// }
// module.exports = authMiddleware