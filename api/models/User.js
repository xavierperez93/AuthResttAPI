/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'MySqlServer',
  migrate: 'alter',
  attributes: {    
      username: {
        type: 'string',
        unique : true,
        required: true,
      },
      nom: {
        type: 'string',
        },
      prenoms: {
        type: 'string',
        },
      civilite: {
        type: 'string',
      },
      sexe: {
        type: 'string',
      },
      fonction : {
        type : 'string',
      },
      datedenaissance: {
        type: 'string',
        },
      paysderesidence: {
        type: 'string',
        },
      email: {
        type: 'string',
        email : true,
        unique : true,
        required : true,
        },
      indicatifpays: {
        type: 'string',
        },
      telephone: {
        type: 'string',
        },
      encryptedPassword: {
        type: 'string'
      },
      statut : {
        type: 'string'
      },
      lastConnectionDate: {
        type : 'datetime',
      },
      //Here i define the relationShip
        // A User belongs to a single profil
          profilID: {
            model: 'Profil',
          },
        //A User belongs to a single statut
          statutID: {
            model: 'Statut',
          }
  },
};

