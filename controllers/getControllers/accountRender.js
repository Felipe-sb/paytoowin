const cuentaRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./baseViews/cuenta', {
			login: { username, email },
		});
		return;
	}
	res.render('./baseViews/cuenta',{login:null});
};
module.exports = cuentaRender;