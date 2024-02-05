const mongoose = require('mongoose');
const userModel = require('./user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);


const token = process.env.JWT_SECRET;
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));


async function getAllUserDetails(){
  try{
    const users = await userModel.find({});
    return users.map(user => {
      return {
        username: user.user,
        email: user.email,
        phone: user.phone
      };
    });
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {

    const exists = await findUserByName(user.user);

    if(exists == []){
      console.log("User Already exists");
      return false;
    }

    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function validateUser(cred){
  try {
    if(cred.user === undefined || cred.pass === undefined){
      return undefined;
    } 

    const user = await findUserByName(cred.user);

    console.log("HERE");

    if(user.length === 0){
      return undefined;
    } else {
      const checkPass = await bcrypt.compare(cred.pass, user[0].password);
      
      if (checkPass){
        return user[0];
      } else {
        return undefined;
      }
    } 
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findUserByName(name) {
  console.log(name);
  return await userModel.find({ user: name });
}


function generateAccessToken(username){
  return jwt.sign(username, token, {expiresIn: '86400s'});
}


exports.getAllUserDetails = getAllUserDetails;
exports.addUser = addUser;
exports.validateUser = validateUser;
exports.generateAccessToken = generateAccessToken;