/**
 * StatutController
 *
 * @description :: Server-side logic for managing statuts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    // Lets create a Statut
        saveStatut : function(req,res){
                query           = req.query;
                
                codeStatut      = query.codeStatut,
                libelleStatut   = query.libelleStatut,
                options = {
                        codeStatut : codeStatut,
                        libelleStatut : libelleStatut,
                        };

            Statut.findOne({codeStatut:codeStatut}).exec({
                error: function(err){
                    return res.serverError(err);
                },
                success: function(){
                    //Let's save our newly created Statut
                    Statut.create(options).exec({
                        error: function(err) {
                            return res.send(200,'Duplicate entry');
                        },
                        success: function(createdStatut){
                            return res.json(createdStatut);
                        },
                    });
                }
                        
            },
        );
    },

    //Let's update a statut (To be refactor)
        updateStatut: function(req,res){

                query           = req.query;
                codeStatut      = query.codeStatut,
                libelleStatut   = query.libelleStatut,

            options = {
                        codeStatut : codeStatut,
                        libelleStatut : libelleStatut,
                    };
                /*
                Statut.update({codeStatut:codeStatut},{codeStatut:codeStatut,libelleStatut:libelleStatut},function(err,updatedStatut){
                    if(!err){
                        return res.json(updatedStatut);
                    }                  
                });*/
                Statut.update({codeStatut:codeStatut},{codeStatut:codeStatut,libelleStatut:libelleStatut}).exec({
                    error: function(err) {
                        return res.serverError(err);
                    },
                    success: function(updatedStatut){
                        if(updatedStatut==0){
                            return res.send(400,'Entry not found, couldn\'t update a non existant Statut');   
                        }
                        return res.json(updatedStatut);
                    },
                });
    },

    //Let's delete a statut (To be refactor)
    deleteStatut : function(req,res){
        //Let's verify if parameters are corrects
        query           = req.query;
        if(query.codeStatut!="undefined" && query.codeStatut!="" ){
            codeStatut      = query.codeStatut,
            options         = {codeStatut : codeStatut};
            Statut.destroy({codeStatut:codeStatut}).exec(
                {
                    error: function(err) {
                        return res.serverError(err);
                        },
                    success: function(){
                        return res.send(ok);
                        },
                }
            );
        }else{
            return res.json('Incorrect codeStatut !');                
        }
    },

}