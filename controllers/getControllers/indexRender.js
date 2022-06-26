const indexRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./baseViews/index', {
			login: { username, email },
		});
		return;
	}
	res.render('./baseViews/index',{login:null});
};
module.exports = indexRender;
