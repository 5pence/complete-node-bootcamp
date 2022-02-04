const fs = require('fs');
const http = require('http');

////////////////////////////////////////////////////////////////
////   FILES

// //Blocking synchronous way
// const text = fs.readFileSync('./txt/input.txt', 'utf-8');

// const textOut = "Here is some random text to try to write to a file";
// fs.writeFileSync('./txt/newfile.txt', textOut, 'utf-8')

// //Not blocking asynchronous way
// fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
//   console.log(data);
// })

// fs.writeFile('./txt/newfile2.txt', textOut, 'utf-8', (err, data) => {
//   console.log('file written successfully...');
// })


////////////////////////////////////////////////////////////////
////   SERVER

const server = http.createServer((req, res) => {
  console.log(req);
  res.end('I am your server and I am pleased to meet you')
})

server.listen(8000, '127.0.0.1', () => {
  console.log("server initialised");
});