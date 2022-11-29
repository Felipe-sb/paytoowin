const faqsRender = (req, res) => {
	if (req.session.loggedIn) {
		const {username, email,rol } = req.session;
		res.status(200).render('./baseViews/faqs', {
			login: { username, email,rol },
		});
		return;
	}
	res.status(200).render('./baseViews/faqs',{login:null});
};
module.exports = faqsRender;