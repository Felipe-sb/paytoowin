const terminosRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email,rol} = req.session;
		res.status(200).render('./baseViews/terminos', {
			login: { username, email,rol },
		});
		return;
	}
	res.status(200).render('./baseViews/terminos',{login:null});
};
module.exports = terminosRender;