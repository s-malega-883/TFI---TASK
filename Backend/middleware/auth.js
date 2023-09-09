const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    // const authHeader = req.get('Authorization');
    // if(!authHeader)
    // {
    //     const error = new Error('Not Authenticated!');
    //     error.statusCode = 401;
    //     throw error;
    // }
    // const token = authHeader.split(' ')[1];
    // console.log(token);
    // let decodedToken;
    // const secret = 'secretForToken';
    // try{
    //     decodedToken = jwt.verify(token, secret);
    // }   catch(err)
    // {
    //     console.log(err);
    //     err.statusCode = 500;
    //     throw err;
    // }
    // if(!decodedToken)
    // {
    //     const error = new Error('Not Authenticated!');
    //     error.statusCode = 401;
    //     throw error;
    // }
    req.isLoggedIn = true;
    //req.userId = decodedToken.userId;
    //req.email = decodedToken.email;
    next();
}
