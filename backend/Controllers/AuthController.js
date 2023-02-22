const User = require("../model/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// User Singup
exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(401).send("Please fill all fields");
  }

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .send({ success: false, message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      name: name,
      email: email,
      password: securePass,
    });

    // Retrive user id and store it in 'data' for creating a web token
    const data = {
      user: {
        id: newUser.id,
      },
    };

    // sign 'data' with JWT_STRING to create a token
    const authtoken = JWT.sign(data, process.env.JWT_STRING);
    res.cookie("jwt", authtoken, {
      expire: new Date() + 9999,
      httpOnly: true,
    });
    newUser.password = undefined;

    res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};

// User SingIn
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .send({ success: false, message: "Please fill all fields" });
  }

  try {
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "User not found!" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).send({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    // If the password is valid create a token
    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = JWT.sign(data, process.env.JWT_STRING);

    res.cookie("jwt", authtoken, {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    res.status(200).send({ success: true });
  } catch (err) {
    res.status(401).send({ success: false, message: err.message });
  }
};
