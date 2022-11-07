const pagorechazadoRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./baseViews/pagorechazado', {
			login: { username, email },
		});
		return;
	}
	res.render('./baseViews/pagorechazado',{login:null});
};
module.exports = pagorechazadoRender;