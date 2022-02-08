const fs = require('fs');
const http = require('http');
const url = require('url');

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

const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url === '/' || req.url === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html'})
    const cardsHtml = dataObj.map( item => prepareTemplate(tempCard, item)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
  }
  else if (req.url === '/product') {
    
    res.writeHead(200, { 'Content-Type': 'text/html'})
    res.end("You've visitied the overview page");
  }
  else if (req.url === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);
  }
  else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.end(`<h1>You've requested the ${req.url} page, and it doesn't exist!</h1>`);
  }
})

prepareTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  
  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
}

server.listen(8000, '127.0.0.1', () => {
  console.log("server initialised");
});