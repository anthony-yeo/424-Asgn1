const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;

const { validPass } = require('./utils/services');

app.use(cors());
app.use(express.json());

const logins = [
    { username: 'user1', password: 'pass1'},
]

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/login', (req, res) => {
    user = req.body.user;
    pass = req.body.pass;

    isValidUser = logins.some(creds => creds.username === user && creds.password === pass);
    if (isValidUser){
        setTimeout(() => {
            res.status(200).json({token: '2342f2f1d131rf12'});
        }, 250);
    } else {
        res.status(401).send("Invalid Login");
    }
});

app.post('/new', async (req, res) => {

    const { user, pass1, pass2 } = req.body;

    if (await validPass(pass1)){
        if (pass1 === pass2){
            const exists = logins.some(login => login.username === user);
            console.log(exists);
            if(!exists){
                logins.push({username: user, password: pass1});
                res.sendStatus(200);
            } else {
                res.sendStatus(409);
            }
        } else {
            res.sendStatus(422);
        }
    } else {
        res.sendStatus(400);
    }    
});

app.get('/users', (req, res) => {
    const users = logins.map(user => user.username);
    res.json(users);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   