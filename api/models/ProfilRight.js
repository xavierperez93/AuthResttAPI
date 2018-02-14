/**
 * ProfilRight.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'MySqlServer',
  migrate: 'alter',
  attributes: {
    profilID: {
      model : 'profil',
    },
    rightID: {
      model : 'right',
      },

  }
};

