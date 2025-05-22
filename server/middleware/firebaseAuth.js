const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Token missing");

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send("Invalid token");
  }
};
