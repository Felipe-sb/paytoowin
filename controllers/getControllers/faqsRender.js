const faqsRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email,rol } = req.session;
		res.render('./baseViews/faqs', {
			login: { username, email,rol },
		});
		return;
	}
	res.render('./baseViews/faqs',{login:null});
};
module.exports = faqsRender;