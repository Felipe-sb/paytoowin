const User = require("../../models/User");

const saldoRender = async(req, res, next) => {
	if (req.session.loggedIn) {
		const {email,username,userId} = req.session;
		const user = await User.findOne({email})
		console.log(user);
		res.status(200).render('./baseViews/saldo', {
			login: { username , email,userId},
			alertConfig:{alert:false},
			balance:user.balance
		});
		return
	}
	next();

};
module.exports = saldoRender;