const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv'); // Import the dotenv package
// Load environment variables from .env file
dotenv.config();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());  // enable CORS for all routes
app.use(express.json());  // parse incoming JSON requests body

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// example route
app.post('/data', (req, res) => {
  // console.log('Received GET request at /data =>', req); // log the query parameters
  // const name = req.body.name;
  // const age = req.body.age;
  const {name, age} = req.body;

  console.log(`Received data: Name - ${name}, Age - ${age}`);

  // send some reponse back to the client
  res.status(201).json({message: 'Data received successfully'
    // , 
    // data: {name, age}
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})