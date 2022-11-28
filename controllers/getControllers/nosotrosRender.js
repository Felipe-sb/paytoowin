const nosotrosRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email,rol } = req.session;
		res.render('./baseViews/nosotros', {
			login: { username, email,rol },
		});
		return;
	}
	res.render('./baseViews/nosotros',{login:null});
};
module.exports = nosotrosRender;