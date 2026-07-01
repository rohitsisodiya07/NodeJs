const jwt = require("jsonwebtoken");
const signupModel = require("../Model/signupModel");
const secretKey = "rohitsisodiyachann";

module.exports = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    console.log(">>>>>authToken", authToken);

    if (!authToken) {
      return res.status(403).json({ message: "Token missing" });
    }

    const token = authToken.split(" ")[1];
    console.log(">>>>>token", token);

    if (!token) {
      return res.status(400).json({ message: "Token value is empty" });
    }

    const decoded = jwt.verify(token, secretKey);

    console.log(">>>> Decoded:", decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { email } = decoded;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email payload is missing from token" });
    }

    const userDetails = await signupModel.findOne({ email });

    if (!userDetails) {
      return res.status(404).json({ message: "User not found in database" });
    }

    console.log(">>>>> userDetails:", userDetails);

    req.user = userDetails; // or decoded

    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Token not verified" });
  }
};
