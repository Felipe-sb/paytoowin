const User = require('../../models/User');
const bcrypt = require('bcrypt');
const transporter = require('../../helpers/transporter');
const registerUser = async (req, res) => {
	const { username, email, password } = req.body;
	const hashPassword = await bcrypt.hash(password, 8);
	const newUser = new User({ username, email, password: hashPassword });
	newUser.save().then(async (user) => {
		await transporter.sendMail({
			from: '"paytoowin" <paytoowin.noreply@gmail.com>"',
			to: `${user.email}`,
			subject: 'Cuenta creada',
			text: `Bienvenido ${user.username} a paytoowin la mejor plataforma para la compra y venta de juegos de tus juegos favoritos`,
		});
        res.render('./authViews/register',{
			alertConfig:{
				alert:true,
				title:'Usuario registrado con exito',
				text:`Bienvenido a paytoowin`,
				icon:'success',
				confirmButton:true,
				timer:false,
				route:'auth/login'
			}
		})
	});
};
module.exports = registerUser;