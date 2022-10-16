const nosotrosRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./baseViews/nosotros', {
			login: { username, email },
		});
		return;
	}
	res.render('./baseViews/nosotros',{login:null});
};
module.exports = nosotrosRender;