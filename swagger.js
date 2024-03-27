const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Blog Api',
    description: 'Test Api for yout Blog Projects'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];



swaggerAutogen(outputFile, routes, doc).then(()=>{
    require("./index.js")
});