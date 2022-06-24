const bcrypt = require('bcrypt');
const generateRandomPass = require('../../helpers/generateNewPassword');
const transporter = require('../../helpers/transporter');
const User = require('../../models/User');

const sendNewPasswordToMail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		res.redirect('/auth/register');
		return;
	}
	const newPassword = generateRandomPass();
    const hashNewPassword = await bcrypt.hash(newPassword,8)
	User.findByIdAndUpdate(
		user.id,
		{ password: hashNewPassword },
		{ new: true }
	).then(async (user) => {
		await transporter.sendMail({
			from: '"paytoowin"<paytoowin.noreply@gmail.com>',
			to: `${user.email}`,
			subject: 'Recuperacion de contraseña',
			text: `Hola ${user.username} tu nueva contraseña es ${newPassword}`,
		});
		res.render('./authViews/forgotPassword',{
			alertConfig:{
				alert:true,
				title:'Contraseña recuperada',
				text:'La contraseña fue enviada a tu correo',
				icon:'success',
				confirmButton:true,
				timer:false,
				route:'auth/login'
			}
		})
	});
};
module.exports = sendNewPasswordToMail;
