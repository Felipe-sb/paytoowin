const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const transporter = require('../../helpers/transporter');
const registerAdmin = async (req, res, next) => {
    if(req.session.rol !== "admin") {
        next();
        return
    }
	const { username, email, password, country, rol } = req.body;
	const hashPassword = await bcrypt.hash(password, 8);
	const newUser = new User({ username, email, password: hashPassword,country,rol,createDate: Date.now(),banned:false,balance:0,verified:false});
	newUser.save().then(async (user) => {
		await transporter.sendMail({
			from: '"paytoowin" <paytoowin.noreply@gmail.com>"',
			to: `${user.email}`,
			subject: 'Cuenta creada',
			text: `Bienvenido ${user.username} a paytoowin la mejor plataforma para la compra y venta de juegos de tus juegos favoritos`,
		});
        res.render('./adminViews/register',{
			alertConfig:{
				alert:true,
				title:'Usuario registrado con exito',
				text:`Bienvenido a paytoowin`,
				icon:'success',
				confirmButton:true,
				timer:false,
				route:'admin/users'
			}
		})
	});
};
module.exports = registerAdmin;