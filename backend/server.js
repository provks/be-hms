const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv'); // Import the dotenv package
// Load environment variables from .env file
dotenv.config();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');

// mongodb connection
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// middleware
app.use(cors());  // enable CORS for all routes
app.use(express.json());  // parse incoming JSON requests body

app.get('/', (req, res) => {
  res.send('Hello Ninjas!');
})

// Use the user routes
app.use('/users', userRoutes);

// example route
app.post('/data', (req, res) => {
  // console.log('Received GET request at /data =>', req); // log the query parameters
  // const name = req.body.name;
  // const age = req.body.age;
  const {name, age} = req.body;

  console.log(`Received data: Name - ${name}, Age - ${age}`);

  // send some reponse back to the client
  res.status(201).json({message: 'Data received successfully'
    , 
    data: {name, age}
  });
});

// Error 404 handling middleware
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Handling 500 errors
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})