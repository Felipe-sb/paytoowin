const User = require('../../models/User');

const getUserById = async (req, res,next) => {
    if (req.session.rol === 'admin') {
        const { id } = req.params;
        const user = await User.findById(id);
        res.render('./adminViews/user', { user });
        return
    }
    next();
};
module.exports = {
    getUserById,
};
