const jwt = require('jsonwebtoken');


// middleware that checks if the user is authorized to access an endpoint
module.exports = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.userData = decoded;
      next();
   } catch (error) {
      res.status(401).json({
         message: 'authentications fail'
      })

   }



}