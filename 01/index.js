// require the fs module
const fs = require('fs');

// require the http module
const http = require('http');

// require the url module
const url = require('url');


/*------------------------------------*\
  READING AND WRITING FILES
\*------------------------------------*/


/*** BLOCKING, synchronous way of reading ad writing files ***/

// Reading a file from the file system
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// Writing a file to the file system
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);

// console.log('File written!');



/*** NON - BLOCKING, Asynchronous way of reading ad writing files - CALLBACK HELL! ***/

// fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
//   if(error) return console.log('There was an error!');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (error, data3) => {
//       console.log(data3);
//       fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, 'utf-8', error => {
//         console.log('The file has been written!')
//       });
//     });
//   });
// });

// console.log('will read file');



/*----------------------------------------------------*\
  BUILD A WEB SERVER, ROUTING, BUILDING A SIMPLE API
\*----------------------------------------------------*/


// Using the synchronous readFileSync() method to read the template files; 
// This is done at the top level code when the script starts, outside of the request, in order to only execute it once instead of every time we get a request.
// The fields will then change dynamically.
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");

// Function to dynamically replace the content inside of each product template; it receives a template and an object (product) containing the values to use.
const replaceTemplate = (template, product) => {
  // Replace all instances of the placeholder inside the template with the value associated to a specific key inside the product object
  let output = template.replace(/{%ID%}/g, product.id);

  output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%ORIGIN%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  // If the product is not organic, the class "not-organic" will be added to the product instead of the placeholder
  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic")
  }
  return output;
};




// Retrieve the data, the products stored into a Json file
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

// Convert the data into an array of objects, our products
const dataObject = JSON.parse(data);

// create the server and store it into a variable
const server = http.createServer((request, response) => {

// Destructure two variables, query and pathname, from the object we obtain parsing the request url.
const {query, pathname} = url.parse(request.url, true);

  // store the url of the request
  const pathName = request.url;

  // Overview page
  if(pathname === "/" || pathname === "/overview") {

    response.writeHead(200, {
      'Content-type': 'text/html'
    });

    // Loop through each product we have in our dataObject array and for each one of them we return a template with all the placeholders replaced by the data stored inside the product. We store all the templates inside the cardsHtml array. We join all the templates into a single string.
    const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');

    // Replace the "{%PRODUCT_ CARDS%}" placeholder inside the template-overview with our string that represents all the products
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    // Return the response
    response.end(output);


  // Product page
  } else if(pathname === "/product") {

    // We specify that we are sending back html
    response.writeHead(200, {'Content-type': 'text/html'});
    // Find the product we want to display retrieving the element inside the dataObject array at index equal to the value of query.id
    const product = dataObject[query.id];

    // Replace all fields of the template-product with the values of the current product and store the result inside the output variable.
    const output = replaceTemplate(tempProduct, product);

    // Return the new product template will all the fields replaced
    response.end(output);

  // API
  } else if(pathname === '/api'){

    response.writeHead(200, {
      'Content-type': 'application/json' // We specify that we are sending back json
    });
    response.end(data);

  // Not found - error
  } else { 
    response.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    response.end("<h1>Page NOT FOUND</h1>");
  }

});

// listen to incoming requests to our server from the client
server.listen(8000, '127.0.0.1', () => {
  console.log('listening to requests on port 8000');
}); 




