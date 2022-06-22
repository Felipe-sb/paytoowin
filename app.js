require('./database/connection');
const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
	secret:'paytoowin',
	resave:false,
	saveUninitialized:true
}))
app.use('/auth', require('./routes/authRoutes'));
app.listen(process.env.PORT || 3000, () => {
	console.log('Server listening');
});
