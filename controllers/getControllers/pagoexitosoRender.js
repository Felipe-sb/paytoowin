const pagoexitosoRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./commerceViews/pagoexitoso', {
			login: { username, email },
		});
		return;
	}
	res.render('./commerceViews/pagoexitoso',{login:null});
};
module.exports = pagoexitosoRender;