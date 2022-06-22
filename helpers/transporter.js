const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'paytoowin.noreply@gmail.com',
		pass: 'kpxigrsiarzrqpwo',
	},
	tls: {
		rejectUnauthorized: false,
	},
});
module.exports = transporter;
