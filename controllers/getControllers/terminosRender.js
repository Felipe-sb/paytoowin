const terminosRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email,rol} = req.session;
		res.render('./baseViews/terminos', {
			login: { username, email,rol },
		});
		return;
	}
	res.render('./baseViews/terminos',{login:null});
};
module.exports = terminosRender;