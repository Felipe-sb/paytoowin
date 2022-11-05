const saldoRender = (req, res, next) => {
	if (req.session.loggedIn) {
		const {username, email, userId, balance } = req.session;
		
		res.status(200).render('./baseViews/saldo', {
			login: { username , email, userId, balance},
			alertConfig:{alert:false},
			balance: req.session.balance


		});
		return
	}
	next();
};
module.exports = saldoRender;