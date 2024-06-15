// console.log('hello')
const http = require('http');


// const server = http.createServer();
const server = http.createServer((req, res) => {
    console.log(http.METHODS)
    console.log(http.STATUS_CODES)
    if(req.url === '/') {
        console.log('hello')
        res.write('hello world')
        res.end();
    }
    else if(req.url === '/hello') {
        console.log("inside hello req")
        res.write(JSON.stringify([1,2,3]))
        res.end();
    }
});

// server.on('connection', (socket) => {
//     console.log(socket)
// })

server.listen(3000, () => {
    console.log('server listening at port 3000');
});
