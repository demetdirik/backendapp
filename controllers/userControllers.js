import User from "../models/User.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //const hashedPassword = bcrypt.hashSync(password);

  const user = await User.create({
    name,
    email,
    password,
    //:hashedPassword
  });

  return res.status(201).json({
    _id: user._id,
    avatar: user.avatar,
    name: user.name,
    email: user.email,
    verified: user.verified,
    admin: user.admin,
    token: await user.generateJWT(),
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "mail user bulunamadi" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } else {
    return res.status(400).json({ message: "yanliş şifre" });
  }
};

const userProfile = async (req, res, next) => {
  let user = await User.findById(req.user._id);

  if (user) {
    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
    });
  } else {
    let error = new Error("User not found");
    error.statusCode = 404;
    next(error);
  }
};

export { registerUser, loginUser, userProfile };

/**
 * const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if(!isPasswordCorrect){
    return res.status(400).json({message:"yanliş şifre"})
  }
  
  return res.status(200).json({message:"login basarili",
  _id: user._id,
  avatar: user.avatar,
  name: user.name,
  email: user.email,
  verified: user.verified,
  admin: user.admin,
  token: await user.generateJWT(),



})
 * 
 * 
 */
