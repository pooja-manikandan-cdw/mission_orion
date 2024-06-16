const express = require('express');

const router = express.Router();

const users = [
    {
        id:1,
        name: 'pooja'
    },
    {
        id: 2,
        name:'srija'
    }
]

router.get('/', (req, res)=>{
    console.log(req.user)
    res.send(users);
})

module.exports = router;