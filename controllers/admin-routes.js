/**
 * @post    : Serves the login oage for admins
 * @route   : GET /admin/login
 * @access  : public
 */
const getLoginPage = (req, res) => {
    res.render('login')
}

const getAdminIndex = (req, res) => {
    res.render('admin-index')
}

module.exports = { getLoginPage, getAdminIndex }
