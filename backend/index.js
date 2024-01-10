const express = require('express');
const cors = require('cors');
const fakeAuth = require('./utils/services');

const app = express();
const port = 8000;

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

        console.log("HERE");
        res.status(401).send("Invalid Login");
    }
})

app.get('/test', async (req, res) => {
    console.log("HERE");
    res.status(200).send("GOOD");
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   