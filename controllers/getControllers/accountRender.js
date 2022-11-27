const cuentaRender = (req, res, next) => {
	if (req.session.loggedIn) {
		const {username, email, userId, rol} = req.session;
		
		res.status(200).render('./accountViews/cuenta', {
			login: { username, email, userId, rol },
			alertConfig:{alert:false}
		});
		return
	}
	next();
};
module.exports = cuentaRender;