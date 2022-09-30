const mongoose = require('mongoose')
connectionString = process.env.CONNECTION_STRING_DB || 'mongodb+srv://felipe_soublette:Felipe.2020@cluster0.bos6s.mongodb.net/paytoowin?retryWrites=true'
mongoose.connect(connectionString)
    .then(()=>{
        console.log('Connected to cluster');
    })
    .catch(err=>console.log(err));