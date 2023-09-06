const express = require('express');
require('dotenv').config();
const workoutroutes = require('./routes/workout');
const DB = require('mongoose');
const cors = require("cors");
const userroute = require('./routes/user');
const jwt = require('jsonwebtoken');;


const app = express();
// cors
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// use json
app.use(express.json());

// jwt middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    const tokenValue = token.split(' ')[1];

    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('token validation failed');
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        next();
    });
};
// using workout router
app.use("/workout", verifyToken, workoutroutes);
app.use("/user", userroute)



app.get("/", verifyToken, (req, res) => {
    res.end("hello express")
});

// connect to DB and start the server

DB.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`connected to DB & server started at port ${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log('failed to connect to DB');
    })