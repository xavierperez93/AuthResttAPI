/**
 * RightController
 *
 * @description :: Server-side logic for managing rights
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// Lets create a Right
        save : function(req,res){
                query           = req.query;
                
                codeRight     = query.codeRight,
                libelleRight   = query.libelleRight,
                options = {
                    codeRight : codeRight,
                    libelleRight : libelleRight,
                        };

            Right.findOne({codeRight : codeRight}).exec({
                error: function(err){
                    return res.serverError(err);
                },
                success: function(){
                    //Let's save our newly created Statut
                    Right.create(options).exec({
                        error: function(err) {
                            return res.serverError(err);
                        },
                        success: function(createdRight){
                            return res.json(createdRight);
                        },
                    });
                }
                        
            },
        );
    },

    //Let's update a statut (To be refactor)
        update: function(req,res){
            query           = req.query;

            codeRight     = query.codeRight,
            libelleRight   = query.libelleRight,
            options = {
                codeRight : codeRight,
                libelleRight : libelleRight,
                    };
                Right.update({codeRight:codeRight},{libelleRight:libelleRight,libelleRight:libelleRight}).exec({
                    error: function(err) {
                        return res.serverError(err);
                    },
                    success: function(updatedRight){
                        if(updatedRight==0){
                            return res.send(400,'Entry not found, couldn\'t update a non existant Statut');   
                        }
                        return res.json(updatedRight);
                    },
                });
    },

    //Let's delete a statut (To be refactor)
    delete : function(req,res){
        //Let's verify if parameters are corrects
        query           = req.query;        
        if(query.codeRight!="undefined" && query.codeRight!="" ){
            codeRight      = query.codeRight,
            options         = {codeRight : codeRight};
            console.log(options);
            Right.destroy({codeRight:codeRight}).exec(
                {
                    error: function(err) {
                        return res.serverError(err);
                        },
                    success: function(){
                        return res.send(200);
                        },
                }
            );
        }else{
            return res.json('Incorrect codeRight !');                
        }
    },

};

