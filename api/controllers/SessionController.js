/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// Let's define the session methods        
    setSession: function(req, res) {
        bodyRecept  = req.query;
        userId      = bodyRecept.userId
            return res.json('Session set');
        },

    getSession: function(req, res) {
        return res.json(sessionStorage.getItem('userId'));
    },
};

