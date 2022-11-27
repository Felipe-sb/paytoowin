const User = require("../../models/User");

const balanceRender = async(req, res, next) => {
	if (req.session.loggedIn) {
		const {email,username,userId, rol} = req.session;
		const user = await User.findOne({email})
		console.log(user);
		res.status(200).render('./accountViews/balance', {
			login: { username , email,userId, rol},
			alertConfig:{alert:false},
			balance:user.balance
		});
		return
	}
	next();
};
module.exports = balanceRender;