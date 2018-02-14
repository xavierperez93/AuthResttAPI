/**
 * ProfilController
 *
 * @description :: Server-side logic for managing profils
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    	// Lets create a Statut
        save : function(req,res){
            query           = req.query;
            
            codeProfil      = query.codeProfil,
            libelleProfil   = query.libelleProfil,
            codeRight       = query.codeRight,
            options = {
                codeProfil      : codeProfil,
                libelleProfil   : libelleProfil,
                codeRight       : codeRight,
                    };
            //Let's split our rightID to an array
            var rightList = options.codeRight.split(",");         

        //Let's check if the Profil do not exist
        Profil.findOne({codeProfil : codeProfil}).exec({
            error: function(err){
                return res.serverError(err);
            },
            success: function(){
                //Let's save our new created Profil
                Profil.create(options).exec({
                    error: function(err) {
                         return res.serverError(err);
                    },
                    success: function(createdProfil){
                        //Let's check if the ProfilRight do not already exist
                        ProfilRight.find({profilID: codeProfil, rightID: codeRight}).exec(function(err,found){
                            if(found==0){
                                //Let's add a record pointing on each listed right
                                rightList.forEach(right => {
                                    //Let's find if listed right exists
                                    Right.find({codeRight : right}).exec(
                                        function(err,foundRight){
                                            if(foundRight!=0){
                                                options2 = {profilID : codeProfil, rightID : right};
                                                //Let's create the ProfilRight
                                                ProfilRight.create(options2).exec({
                                                    error : function(err){
                                                        return res.serverError(err);
                                                    },
                                                    success : function(){
                                                        
                                                    }
                                                });
                                            }
                                        });
                                    
                                    });
                                
                            }else{ res.json(found);}
                        });
                            return res.json(createdProfil);                            
                    },
                });
            }
                    
        },
    );
},

//Let's update a statut (To be refactor)
    update: function(req,res){
        query           = req.query;
            
            codeProfil      = query.codeProfil,
            libelleProfil   = query.libelleProfil,
            codeRight       = query.codeRight,
            options = {
                codeProfil      : codeProfil,
                libelleProfil   : libelleProfil,
                codeRight       : codeRight,
                    };
            options2 = {
                profilID     : codeProfil,
                rightID      : codeRight,
                    };
            //Let's split our rightID to an array
            var rightList = options.codeRight.split(","); 

    //Let's update the current profil
    Profil.update({codeProfil: codeProfil},options).exec(function (err, updated){
        if (err) {
          return res.serverError(err);
        }
        if(updated!=0){            
            //Let's clear the unnecessary right
            ProfilRight.destroy({profilID: codeProfil}).exec({
                error: function(err) {
                    return res.serverError(err);
                    },
                success: function(){
                //Let's modify the right if necessary
                ProfilRight.find({profilID: codeProfil, rightID: codeRight}).exec(function(err,found){
                    if(found==0){
                        //Let's add a record pointing on each listed right
                        rightList.forEach(right => {
                            //Let's find if listed right exists
                            Right.find({codeRight : right}).exec(
                                function(err,foundRight){
                                    if(foundRight!=0){
                                        options2 = {profilID : codeProfil, rightID : right};
                                        //Let's create the ProfilRight
                                        ProfilRight.create(options2).exec({
                                            error : function(err){
                                                return res.serverError(err);
                                            },
                                            success : function(){
                                                return res.json(updated);
                                            }
                                        });
                                    }else{
                                        res.send(400,'The right do not exist yet !');
                                    }
                                });
                            });
                    }else{ res.json(found);}
                });
            },
        });   
        }else{
            return res.json('The profil do not exist yet, please create it first');
        }
      });
           
},

//Let's delete a statut (To be refactor)
delete : function(req,res){
    //Let's verify if parameters are corrects
    query           = req.query;        
    if(query.codeProfil!="undefined" && query.codeProfil!="" ){
        codeProfil      = query.codeProfil,
        options         = {codeProfil : codeProfil};
        console.log(options);
        Profil.destroy({codeProfil : codeProfil}).exec(
            function(err,deleted){
                if(err){
                    return res.negotiate(err);
                }
                if(deleted!=0){
                     //Let's clear the unnecessary right
                ProfilRight.destroy({profilID: codeProfil}).exec({
                    error: function(err) {
                        return res.serverError(err);
                        },
                    success: function(){
                        return res.ok();
                    },
                });
                }else{
                    return res.json('This profil do not exist, so no deletion happened !'); 
                }
                    
            }
        );
    }else{
        return res.json('Incorrect codeProfil !');                
        }
    },
};