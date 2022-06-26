const mongoose = require('mongoose')
connectionString = ''
mongoose.connect(connectionString)
    .then(()=>{
        console.log('Connected to cluster');
    })
    .catch(console.log)