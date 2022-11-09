const updateEmailClient = (req, res, next) => {
	if (req.session.loggedIn) {
		const {username, email, userId } = req.session;
		
		res.status(200).render('./accountViews/updateEmailClient', {
			login: { username, email, userId },
			alertConfig:{alert:false}
		});
		return
	}
	next();
};
module.exports = updateEmailClient;