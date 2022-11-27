const accountConfigRender = (req, res, next) => {
	if (req.session.loggedIn) {
		const {username, email, userId, rol } = req.session;
		
		res.status(200).render('./accountViews/accountSetting', {
			login: { username, email, userId, rol },
			alertConfig:{alert:false}
		});
		return
	}
	next();
};
module.exports = accountConfigRender;