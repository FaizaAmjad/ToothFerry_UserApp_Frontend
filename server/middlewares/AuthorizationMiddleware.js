const encryption = require("../utilities/crypto-utils");

async function authorizationMiddleware(req, res, next) {
  const ispublic = req.originalUrl.toLowerCase().includes("/public");
  if (ispublic) {
    next();
    return;
  }
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }
  try {
    const userid = encryption.decryptToken(req.headers.authorization);
    req.userid = userid;
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  next();
}
module.exports = authorizationMiddleware;
