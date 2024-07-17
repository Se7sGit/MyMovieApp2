const jwt = require("jsonwebtoken");
const { User } = require("./models/User");

async function AdminProtectionMiddleware(req, res, next) {
  try {
    if (!req.headers["authorization"]) {
      return res.status(403).json({ message: "Forbidden, No token provided" });
    }
    const key = req.headers["authorization"].split(" ")[0];
    const token = req.headers["authorization"].split(" ")[1];
    if (
      key !== process.env.JWT_ADMIN_KEY ||
      token !== process.env.JWT_ADMIN_SECRET
    ) {
      return res.status(403).json({ message: "Forbidden, Invalid token" });
    }
    let decodedToken = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    if (!decodedToken) {
      return res.status(403).json({ message: "Forbidden, Invalid token" });
    }
    const user = await User.findOne({
      _id: decodedToken._id,
      isAdmin: true,
    });
    if (!user) {
      return res.status(403).json({ message: "Forbidden, User not found" });
    }
    req.user = decodedToken.id;
    next();
  } catch (error) {
    // console.log("Request Body: ", req.body);
    // console.log("User Found: ", decodedToken);
    // console.log("Compared Password: ", comparedPassword);
    return res.status(200).json({ message: error.message });
  }
}

module.exports = AdminProtectionMiddleware;
/*
decode lel token , to check the type of the logged user 
, if it's admin or not , if it's admin 
, he can access to the /admin route
*/
