const express = require('express');
const authRoutes = require('./router/authRouter');
const userRoutes = require('./router/usersRouter')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const app = express();

app.use(express.json())
app.use('/', authRoutes)
app.use('/user', authenticateUser,  userRoutes)


function authenticateUser(req, res, next) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1]
    if(!token) res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) {
            console.log('Error',err)
            // res.sendStatus(403)
            res.status(403).send({'error': err});
        }
        req.user = user;
        next();
    })
}

app.listen(8080, () => {
    console.log('app listening to port 8080')
})