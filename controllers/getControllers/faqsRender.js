const faqsRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email } = req.session;
		res.render('./baseViews/faqs', {
			login: { username, email },
		});
		return;
	}
	res.render('./baseViews/faqs',{login:null});
};
module.exports = faqsRender;