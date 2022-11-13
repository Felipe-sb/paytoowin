const pagoexitosoRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./baseViews/pagoexitoso', {
			login: { username, email },
		});
		return;
	}
	res.render('./baseViews/pagoexitoso',{login:null});
};
module.exports = pagoexitosoRender;