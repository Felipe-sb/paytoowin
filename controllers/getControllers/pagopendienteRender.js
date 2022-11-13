const pagopendienteRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./commerceViews/pagopendiente', {
			login: { username, email },
		});
		return;
	}
	res.render('./commerceViews/pagopendiente',{login:null});
};
module.exports = pagopendienteRender;