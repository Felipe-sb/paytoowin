if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}
require('./database/connection');
const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
app.set('view engine', 'ejs');
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
	secret:'paytoowin',
	resave:false,
	saveUninitialized:true
}))
app.use('/',require('./routes/baseRoutes'))
app.use('/auth', require('./routes/authRoutes'));
app.use('/products',require('./routes/productsRoutes'));
app.use('/admin',require('./routes/adminRoutes'));
app.use('/commerce',require('./routes/commerceRoutes'))
app.use('/account',require('./routes/accountRoutes'))
app.use((req, res) => {
	if (req.session.loggedIn) {
		res.status(404).render('./baseViews/404',{login:true,username:req.session.username})	
	}else{
		res.status(404).render('./baseViews/404',{login:null})
	}
})
app.listen(process.env.PORT || 4000, () => {
	console.log('Server listening');
});