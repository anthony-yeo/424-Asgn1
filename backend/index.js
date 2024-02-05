const https = require("https");
const fs = require("fs");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 8000;

const { validPass } = require('./utils/services');
const userServices = require('./models/user-services');
const User = require('./models/user');

var limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
});


const TOKEN_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;


app.use(cors({
    origin: 'https://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(port, () => {
    console.log(`Server is runing at https://localhost:8000`);
  });

// const logins = [
//     { username: 'user1', password: 'pass1'},
// ]


// When do we authenticate the token
// When the token expires how do we renew it and store it in the database
function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    //console.log(token);

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        // console.log(err);

        if (err) return res.sendStatus(403);

        req.user = user; // Set the user in the request

        next(); // Call the next middleware/route handler
    });
}


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/login', async (req, res) => {

    try{
        const result = await userServices.validateUser(req.body);

        if(result === undefined){
            return res.sendStatus(401);
        }

        console.log(result.token);


        res.cookie('token', result.token, {httpOnly: true, secure: true });
        res.status(200).json({message: 'Login successful'});
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occured in the server");
    }
    
});

app.get('/checkauth', authenticateToken, (req, res) => {
    // If this point is reached, token is authenticated
    return res.status(200).send("Authenticated");
});

app.post('/new', async (req, res) => {
    const { user, pass1, pass2, phone, email } = req.body;
    // const user_obj = {user: user, password: pass1};

    try{

        // Password is not strong enough 
        if (await validPass(pass1)){

            // Passwords Don't Match
            if  (pass1 === pass2){

                const token = userServices.generateAccessToken({ username: user });

                const hashedPassword = await bcrypt.hash(pass1, saltRounds);
                const user_obj = {user: user, password: hashedPassword, phone: phone, email: email, token: token};

                const result = await userServices.addUser(user_obj);
                console.log(result);
                
                // User Already Exists
                if (result === false){
                    res.sendStatus(409);
                } else {
                    res.cookie('token', token, { httpOnly: true, secure: true});
                    res.sendStatus(200);
                }

            } else {
                console.log("not valid");
                res.sendStatus(422);
            }
        } else {
            console.log("not valid");
            res.sendStatus(400);
        }
    } catch (error) {
        
        console.log(error);
        res.sendStatus(500);
    }
});


app.post('/logout', (req, res) => {
    try{
        res.clearCookie('token');
        return res.status(200).send('Succesful Log Out');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }
});

app.get('/users', async (req, res) => {
    const users = await userServices.getAllUserDetails();
    // console.log(users);
    res.json(users);
});



// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });   