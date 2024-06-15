const express = require('express');;
const mysql = require('mysql');

const app = express();

// config for creating a connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sample'
})

// excecuting the connection
db.connect((err) => {
    if(err)
        console.log('err', err)

    console.log("connected to db successfully")
})

app.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employees'
    db.query(sql, (err, data) => {
        if(err)
            console.log('err',err)
        console.log('data',data)
        if(data)
        res.send(data);
    })
    // res.send()
})

app.listen(8080, () => {
    console.log('app listening at port 8080');
})