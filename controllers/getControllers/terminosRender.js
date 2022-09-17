const terminosRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./baseViews/terminos', {
			login: { username, email },
		});
		return;
	}
	res.render('./baseViews/terminos',{login:null});
};
module.exports = terminosRender;