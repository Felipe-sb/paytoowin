const mongoose = require('mongoose')
connectionString = 'mongodb+srv://felipe_soublette:Felipe.2020@cluster0.bos6s.mongodb.net/paytoowin?retryWrites=true&w=majority'
mongoose.connect(connectionString)
    .then(()=>{
        console.log('Connected to cluster');
    })
    .catch(console.log('no conectado'))