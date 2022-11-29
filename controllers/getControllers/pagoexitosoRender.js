const pagoexitosoRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.status(200).render('./commerceViews/pagoexitoso', {
			login: { username, email },
		});
		return;
	}
	res.status(200).render('./commerceViews/pagoexitoso',{login:null});
};
module.exports = pagoexitosoRender;