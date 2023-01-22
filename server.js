const express = require('express');

const app = express();
const fs = require('fs');
const path = require('path');
const ApiRoutes = require('./routes/ApiRoutes');
const HtmlRoutes = require('./routes/HtmlRoutes');
const Notes=require ('./db/db.json')

// creating  port
const PORT = process.env.PORT || 3001;


// asks express  midleware create path to files in the  'public' folder 
app.use(express.static('public'));
// sets up express app to handel data parser, middleware created req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', ApiRoutes);
app.use('/', HtmlRoutes);
app.use('*', HtmlRoutes);





// app listener - starts the server
app.listen(PORT, () => {
  console.log(`Server is running at localhost${PORT}`);
});