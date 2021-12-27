const fs = require('fs');

// Reading a file from the file system
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

// Writing a file to the file system
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut);

console.log('File written!');