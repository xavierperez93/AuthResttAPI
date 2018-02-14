/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
 
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/
// Defining custom routes
    //Home page
    'GET /': {view: 'homepage'},

      // Get current session
      'GET /getSession'       :'SessionController.getSession',
      // Set a session
      'POST /setSession'      :'SessionController.setSession',
      // Create a User
      'POST /saveUser'        :'UserController.save',
      // Update a User
      'POST /updateUser'      :'UserController.update',
      // Delete a User
      'DELETE /deleteUser'    :'UserController.delete',
      // Login
        'PUT /login'          :'UserController.login',
      // Logout
        'GET /logout'         :'UserController.logout',

      // Create a profil
        'POST /saveStatut'    :'StatutController.saveStatut',
      // Delete a profil
        'DELETE /deleteStatut':'StatutController.deleteStatut',
      // Update a profil
        'POST /updateStatut'  :'StatutController.updateStatut',

      // Save a Right
      'POST /saveRight'       :'RightController.save',
      // Update a Right
      'POST /updateRight'     :'RightController.update',
      // Delete a Right
      'DELETE /deleteRight'   :'RightController.delete',

      // Save a Profil
      'POST /saveProfil'      :'ProfilController.save',
      // Update a Profil
      'POST /updateProfil'    :'ProfilController.update',
      // Delete a Profil
      'DELETE /deleteProfil'  :'ProfilController.delete',

};
