const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// have environment variables in env file
require('dotenv').config(); 

// create express server
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// connect to database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// require routers
const entriesRouter = require('./routes/entries');

// use routers
app.use('/entries', entriesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});