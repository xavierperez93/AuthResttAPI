/**
 * Right.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'MySqlServer',
  migrate: 'alter',
  attributes: {
    codeRight : {
      type: 'string',
      unique : true,
      required: true,
      },
    libelleRight: {
      type: 'string',
      required: true,
    },
    //Here i define the relationShip
      //A right may have many Profils
      rightID: {
        collection: 'Profil',
        via: 'profilID',
        through: 'profilright',
      }
  }
};