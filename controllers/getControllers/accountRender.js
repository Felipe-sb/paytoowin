const cuentaRender = (req, res, next) => {
	if (req.session.loggedIn) {
		const {username, email, userId } = req.session;
		
		res.status(200).render('./baseViews/cuenta', {
			login: { username, email, userId },
		});
		return;
	}
	next();
};
module.exports = cuentaRender;