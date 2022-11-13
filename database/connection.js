const mongoose = require('mongoose')
connectionString = process.env.CONNECTION_STRING_DB
mongoose.connect(connectionString)
    .then(()=>{
        console.log('Connected to cluster');
    })
    .catch(err=>console.log(err));