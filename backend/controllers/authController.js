const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const createToken = (username) => {
  return jwt.sign(
    {
      username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.login = async (req, res, next) => {
  try {
    console.log(process.env.JWT_SECRET);
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(404).send("username of password not provided");
    }

    //not the best way, since required only one login hardcording directly without hashing and using db
    const authorized = username === "Batman" && password === "iambatman";

    if (!authorized) {
      return res.status(401).send("username of password is incorrect");
    }

    const token = createToken("Batman");

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next("no token found");
    }

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    if (decode.username === "Batman") {
      next();
    } else {
      throw "User not found";
    }
  } catch (error) {
    next(error);
  }
};
