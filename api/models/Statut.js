/**
 * Statut.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'MySqlServer',
    migrate: 'alter',
    attributes: {
      codeStatut : {
        type : 'string',
        unique : true,
        required : true
      },
      libelleStatut : {
        type : 'string',
        required : true,
      },
      //A statut may have many Users
      statut :{
        collection :'User',
        via :'statutID',
    },

  }
};

