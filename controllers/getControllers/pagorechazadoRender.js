const pagorechazadoRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./commerceViews/pagorechazado', {
			login: { username, email },
		});
		return;
	}
	res.render('./commerceViews/pagorechazado',{login:null});
};
module.exports = pagorechazadoRender;