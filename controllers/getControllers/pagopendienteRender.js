const pagopendienteRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.status(200).render('./commerceViews/pagopendiente', {
			login: { username, email },
		});
		return;
	}
	res.status(200).render('./commerceViews/pagopendiente',{login:null});
};
module.exports = pagopendienteRender;