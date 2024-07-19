const jwt = require("jsonwebtoken");
const config = require("config");

const auth_middleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
    
    const token = req.headers.auth.split(" ")[1]; // "Bearer TOKEN"
    
    if (!token) {
      return res.status(401).json({ error: "no_auth" });
    }
    
    const decoded = jwt.verify(token, config.get("jwt_key"));
    req.employee = decoded;
    
    next();
};

module.exports = auth_middleware;