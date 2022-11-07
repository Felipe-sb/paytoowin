const pagopendienteRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./baseViews/pagopendiente', {
			login: { username, email },
		});
		return;
	}
	res.render('./baseViews/pagopendiente',{login:null});
};
module.exports = pagopendienteRender;