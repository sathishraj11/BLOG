const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.googleCallback = async (req, res) => {
  try {
    const { googleId, email, name } = req.user;

    let user = await User.findOne({ where: { googleId } });
    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        password: null,
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ message: "Google Login failed.", error });
  }
};



