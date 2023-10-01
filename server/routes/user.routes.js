const UserController = require('../controllers/user.controller');

module.exports = (app) => {

    app.post('/api/user/register', UserController.registerUser);
    app.post('/api/user/login', UserController.loginUser);


}
