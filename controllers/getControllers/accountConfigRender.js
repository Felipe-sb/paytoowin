const accountConfigRender = (req, res, next) => {
	if (req.session.loggedIn) {
		const {username, email, userId } = req.session;
		
		res.status(200).render('./baseViews/accountSetting', {
			login: { username, email, userId },
			alertConfig:{alert:false}
		});
		return
	}
	next();
};
module.exports = accountConfigRender;