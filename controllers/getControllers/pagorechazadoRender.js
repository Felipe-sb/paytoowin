const pagorechazadoRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.status(200).render('./commerceViews/pagorechazado', {
			login: { username, email },
		});
		return;
	}
	res.status(200).render('./commerceViews/pagorechazado',{login:null});
};
module.exports = pagorechazadoRender;