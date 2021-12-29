// require the fs module
const fs = require('fs');

// require the http module
const http = require('http');



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



/*------------------------------------*\
  BUILD A WEB SERVER
\*------------------------------------*/


// create the server and store it into a variable
const server = http.createServer((request, response) => {
  response.end("Hello from the server");
});

// listen to incoming requests to our server form the client
server.listen(8000, '127.0.0.1', () => {
  console.log('listening to requests on port 8000');
}); 


