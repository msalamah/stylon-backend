const admin = require('firebase-admin');
admin.initializeApp();

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).send("Access denied");

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).send("Invalid token");
  }
};
