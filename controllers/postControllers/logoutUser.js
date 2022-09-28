const logoutUser = (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.redirect('/auth//login');
        });
        return
    }
    res.redirect('/')
};
module.exports = logoutUser;
