const nosotrosRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email,rol } = req.session;
		res.status(200).render('./baseViews/nosotros', {
			login: { username, email,rol },
		});
		return;
	}
	res.status(200).render('./baseViews/nosotros',{login:null});
};
module.exports = nosotrosRender;