const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signupcontroller = async (req,res,next) => {
  const { username, password, isAdmin } = req.body;
  console.log(username, password);

  try{
    const hashedPwd = await bcrypt.hash(password, 12);
    const user = new User({
      username: username,
      password: hashedPwd,
      isAdmin: isAdmin
    });
    await user.save();
    return res.status(200).json({ status: "success", message: "user created!", data: user});
  } catch(error) {
    if(!error.statusCode){
      error.statusCode = 500;
    }
    throw error;
  }
};


exports.logincontroller = async (req,res,next) => {
  const { username, password } = req.body;
  console.log(username, password);

  try{
    
    const user = await User.findOne({username});
    console.log("user=>",user._id);

    if(!user){
      return res.status(401).json({ status: "failed", message: 'No user found with this username'});
    }
    const isEqual= bcrypt.compare(user.password, password);
    if(!isEqual){
      return res.status(401).json({ status: "failed", message: 'wrong username or password'});
    }
    const token = await jwt.sign({
      userid: user._id,
      isAdmin: user.isAdmin,
    },'thisismysecretforjwttoken',{
      expiresIn: '1h'
    });
    return res.status(200).json({ status: "success", message: "user logged in sucessfully!", data: user, token: token});
    
    
  } catch(error) {
    if(!error.statusCode){
      error.statusCode = 500;
    }
    next(error);
  }
};
