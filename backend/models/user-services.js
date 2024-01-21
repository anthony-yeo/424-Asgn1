const mongoose = require('mongoose');
const userModel = require('./user');
const jwt = require('jsonwebtoken');
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

async function getUsers(name, job) {
  let result;
  if (name === undefined && job === undefined) {
    result = await userModel.find();
  } else if (name && !job) {
    result = await findUserByName(name);
  } else if (job && !name) {
    result = await findUserByJob(job);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
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
  
    console.log(user);

    if(user.length === 0){
      return undefined;
    } else {
      if(cred.pass === user[0].password){
        return user[0];
      }
    }

    return undefined;    
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function findUserByName(name) {
  console.log(name);
  return await userModel.find({ user: name });
}

async function findUserByJob(job) {
  return await userModel.find({ job: job });
}

function generateAccessToken(username){
  return jwt.sign(username, token, {expiresIn: '86400s'});
}



exports.addUser = addUser;
exports.validateUser = validateUser;
exports.generateAccessToken = generateAccessToken;