/**
 * Profil.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'MySqlServer',
  migrate: 'alter',
  attributes: {
    codeProfil: {
      type:'string',
      unique:true,
      required:true,
    },
    libelleProfil: {
      type: 'string',
      required: true,
    },
    //Here i define the relationShip
    //A profil may have many Rights
      profilID: {
        collection: 'Right',
        via: 'RightID',
        through: 'profilright',
      },
    //A profil may have many Rights
    user :{
        collection :'User',
        via :'profilID',
    },
  } 
};