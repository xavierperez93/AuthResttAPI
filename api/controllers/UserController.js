/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Emailaddresses  = require('machinepack-emailaddresses');
var Passwords       = require('machinepack-passwords');
var Email           = require('machinepack-email');


module.exports = {

        //Let's persist our newly created user
        save: function(req, res) {
            if (req.session.userId) {
                return res.redirect('/');
            }
            
            bodyRecept = req.body[0];

            // Matching des informations récues dans le body
                username        = bodyRecept.username;
                nom             = bodyRecept.nom;
                prenoms         = bodyRecept.prenoms;
                datenaiss       = bodyRecept.datedenaissance;
                civilite        = bodyRecept.civilite;
                sexe            = bodyRecept.sexe;
                fonction        = bodyRecept.fonction;
                paysresidence   = bodyRecept.paysderesidence;
                email           = bodyRecept.email;
                indicatifpays   = bodyRecept.indicatifpays;
                telephone       = bodyRecept.telephone;
                password        = bodyRecept.password;
                profilID        = bodyRecept.profilID;
                // Associated profilID
                    profilID    = bodyRecept.profilID;
                // Associated statutID
                    statutID    = bodyRecept.statutID;

                if (username.length < 6) {
                    return res.badRequest('Le nom d\'utilisateur doit avoir 6 caractères minimum !');
                }
                if (!_.isString(username) || username.match(/[^a-z0-9]/i))
                {
                    return res.badRequest('Le nom d\'utilisateur est invalide : il doit contenire= des nombres et des lettres uniquement.');
                }
                if (_.isUndefined(password)) {
                    return res.badRequest('LE mot de passe est obligatoire ');
                }
                if (password.length < 6) {
                    return res.badRequest('La longueur minimum d\'un mot de passe est de 6 caractères !');
                }
                if (_.isUndefined(username)) {
                    return res.badRequest('Le nom d\'utilisateur est obligatoire');
                }
                Emailaddresses.validate({
                        string: email
                    }).exec({
                        error: function(err) {
                            return res.serverError(err);
                            },
                        invalid: function() {
                            return res.badRequest('Cet email n\'est pas valide');
                            },
                        success: function() {
                            Passwords.encryptPassword({ 
                                    password: password,
                                }).exec({
                                    error: function(err) {
                                        return res.serverError(err);
                                    },
                                    success: function(result) {
                                        var options = {
                                            username: username,
                                            nom: nom,
                                            prenoms: prenoms,
                                            sexe:sexe,
                                            datedenaissance: datenaiss,
                                            civilite: civilite,
                                            fonction : fonction,
                                            paysderesidence: paysresidence,
                                            email: email,
                                            indicatifpays: indicatifpays,
                                            telephone: telephone,
                                            encryptedPassword: result,
                                            profilID : profilID, // We set the user profil here
                                            statutID : 1,// The default statut is 1 (Actif)
                                            };

                                        if(profilID!=0){

                                            //Let's find if listed right exists
                                            Profil.findOne({codeProfil : profilID}).exec(function(err,foundProfil){
                                                    if(foundProfil==undefined){
                                                        return res.json('Profil not ok');
                                                    }else {
                                                        var statutID = 1;
                                                        Statut.findOne({codeStatut : options.statutID}).exec(function(err,foundStatut){                                                           
                                                            if(foundStatut==undefined){
                                                                return res.json('Statut not ok');
                                                            }else{
                                                                //Let's create the User now                                                        
                                                                User.create(options).exec(function(err, createdUser) {
                                                                    if (err) {
                                                                        if (err.invalidAttributes && err.invalidAttributes.email &&
                                                                            err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
                                                                            return res.send(409, 'Cette addresse Email est déjà utiisé par un autre utilisateur, réessayer SVP !');
                                                                            }
                                                                            if (err.invalidAttributes && err.invalidAttributes.username &&
                                                                            err.invalidAttributes.username[0] && err.invalidAttributes.username[0].rule === 'unique')
                                                                            {
                                                                            return res.send(409, 'Ce nom d\'utilisateur est déjà utilisé par un autre utilisateur, réessayer SVP !');
                                                                            }
                                                                        return res.negotiate(err);
                                                                            }
                                                                        req.session.userId = createdUser.id;
                                                                        return res.ok();
                                                                    });
                                                            }
                                                        });
                                                    }
                                            });

                                        }else { return res.badRequest('Merci d\'associer cet utilisateur à un profil valide');}
                                        
                                }
                            });
                        }
                    });
                },

        //Let's update the user
        update : function(req,res){
                bodyRecept      = req.query;
                username        = bodyRecept.username;
                nom             = bodyRecept.nom;
                prenoms         = bodyRecept.prenoms;
                datenaiss       = bodyRecept.datedenaissance;
                civilite        = bodyRecept.civilite;
                sexe            = bodyRecept.sexe;
                fonction        = bodyRecept.fonction;
                paysresidence   = bodyRecept.paysderesidence;
                email           = bodyRecept.email;
                indicatifpays   = bodyRecept.indicatifpays;
                telephone       = bodyRecept.telephone;
                password        = bodyRecept.password;
                // Associated profilID
                    profilID    = bodyRecept.profilID;
                // Associated statutID
                    statutID    = bodyRecept.statutID;

            //Let's check User existance
            User.findOne({
                or:[
                    {username:username},
                    {email:email},
                ]
                }).exec(function(err,foundUser){
                    if(foundUser){
                        //Let's check if the associated profil already exist
                        Profil.findOne({codeProfil:profilID}).exec(function(err,foundProfil){
                            if(foundProfil){
                                //Let's check if the associated statut already exist
                                Statut.findOne({codeStatut:statutID}).exec(function(err,foundStatut){
                                    if(foundStatut){
                                        //Let's encrypt the password before saving it
                                        Passwords.encryptPassword({ password: password }).exec({
                                            error : function(err){
                                                return res.serverError(err);
                                            },
                                            success : function(result){
                                                var options = {
                                                    username: username,
                                                    nom: nom,
                                                    prenoms: prenoms,
                                                    sexe:sexe,
                                                    datedenaissance: datenaiss,
                                                    civilite: civilite,
                                                    fonction : fonction,
                                                    paysderesidence: paysresidence,
                                                    email: email,
                                                    indicatifpays: indicatifpays,
                                                    telephone: telephone,
                                                    encryptedPassword: result,
                                                    profilID : profilID,
                                                    statutID : statutID,
                                                };
                                                    //Let's update the User entry
                                                    User.update({id:foundUser.id},options).exec(function(err,updatedUser){
                                                        if(updatedUser){
                                                            res.json(updatedUser);
                                                        }else{
                                                            res.negotiate.err();
                                                        }
                                                    });
                                            }
                                        });
                                    }else{ res.json('The statut is not correct !');}
                                });
                                /*
                                */
                                
                            }else { res.json('The profil is not correct !');}
                        });
                    }else{ 
                        res.json('User not found !');
                    }
            });
        },

        //Let's persist our newly created user
        login: function (req, res) {
            bodyRecept = req.body[0];
            // Matching des informations récues dans le body
                email           = bodyRecept.email;
                password        = bodyRecept.password;
            User.findOne({email:email}).exec( 
                function foundUser(err, createdUser) {
                    if (err) 
                        return res.negotiate(err);
                    if (!createdUser) 
                        return res.notFound('Authentification échouée !');
                    Passwords.checkPassword({
                    passwordAttempt: password,
                    encryptedPassword: createdUser.encryptedPassword
                    }).exec({
                        error: function (err){
                            return res.negotiate(err);
                        },
                        incorrect: function (){
                            return res.notFound('Authentification échouée P!');
                        },
                        success: function (){
                                // The user is delete
                                if (createdUser.deleted) {
                                    return res.forbidden("'Votre compte a été supprimé.'");
                                }
                                // The user is banned
                                if (createdUser.banned) {
                                    return res.forbidden("'Votre compte a été banni. Merci de contacter le support.'");
                                }
                                // The user is already logged
                                if (req.session.userId) {
                                    return res.redirect('/');
                                }
                                    req.session.userId = createdUser.id;
                                    return res.json(req.session);
                    }
                });
            });
        },

        //Let's define the logout method
        logout : function(req,res){
            if (!req.session.userId) 
                return res.redirect('/');
                User.findOne(req.session.userId, function foundUser(err, createdUser) {
                    if (err) 
                        return res.negotiate(err);
                    if (!user) {
                        sails.log.verbose('Session refers to a user who no longer exists.');
                        return res.redirect('/');
                        }
                    req.session.userId = null;
                    return res.redirect('/');
                });
        },

        //Let's define the remove profil method (To be refactor)
        delete: function(req, res) {
            bodyRecept = req.query;
            //Let's use the current id of selected user to "Delete" User

            User.update({id: req.param('id')},
            {
                deleted: true
            }, function(err, removedUser) {
                if (err) 
                    return res.negotiate(err);
                if (removedUser.length === 0) {
                    return res.notFound();
                }
            req.session.userId = null;
                return res.ok();
                });
        },

        //Let's define the restore profil method
        restore: function(req, res) {
            if (req.session.userId) {
                return res.redirect('/');
            }
            User.update({id: user.id},
                {
                deleted: false
                }).exec(function(err, updatedUser) {
                    req.session.userId = user.id;
                    return res.json(updatedUser);
                });
            },

    };