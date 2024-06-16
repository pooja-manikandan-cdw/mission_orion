const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const {email, password} = req.body;
    // console.log('login', email, password);
    // const token = jwt.sign({email}, process.env.SECRET_KEY, { expiresIn: "1800s" })
    const token = jwt.sign({email}, process.env.SECRET_KEY, { expiresIn: "15s" });
    console.log('token', token);
    res.send({token: token});
}

module.exports = { login };