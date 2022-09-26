require('./database/connection');
const path = require('path');
const express = require('express');
const session = require('express-session');
const app = express();
app.set('view engine', 'ejs');
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
app.use('/admin',require('./routes/adminRoutes'))
app.use((req, res, next) => {
	res.render('./baseViews/404')
})
app.listen(process.env.PORT || 4000, () => {
	console.log('Server listening');
});