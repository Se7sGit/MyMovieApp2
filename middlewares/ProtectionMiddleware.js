const jwt = require("jsonwebtoken");

function ProtectionMiddleware(req, res, next) {
  try {
    const key = req.headers["authorization"].split(" ")[0];
    const token = req.headers["authorization"].split(" ")[1];
    if (key !== process.env.JWT_KEY) {
      return res.status(403).json({ message: "Forbidden, Invalid token" });
    }
    if (!token) {
      return res.status(403).json({ message: "Forbidden,No token provided" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(403).json({ message: "Forbidden, Invalid token" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    // console.log("Request Body: ", req.body);
    // console.log("User Found: ", decodedToken);
    // console.log("Compared Password: ", comparedPassword);
    return res.status(200).json({ message: error.message });
  }
}

module.exports = ProtectionMiddleware;
/*
decode lel token , to check the type of the logged user 
, if it's admin or not , if it's admin 
, he can access to the /admin route
*/
