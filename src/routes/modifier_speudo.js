const {User }= require('../db/sequelize')
const {ValidationError}=require('sequelize')
const cors=require("cors")
var utilisateurs=require("../models/Users")
module.exports =(app) =>{
    app.put('/api/utilisateur/modifier/speudo', cors(),(req,res) =>
    { 
         User.findOne({
        where: {
            email: req.body.email}
         
  }) .then(utilisateur =>{
   utilisateurs=utilisateur

})
.catch (error =>{
    const message="la liste des utilisateur n'a pas ete recupere,reesayer dans quelques instant"
    res.status(500).json({message,data: error}) 
})


     User.update(req.body,{
            where: { email: req.body.email}

        })
        .then(_=>{
          return User.findOne({
            where:{email:utilisateurs.email}
          }).then(users => {
           // console.log(utilisateurs)
                if(users===null)
                {
                    
                    const message="le Users n'existe pas "
                        res.status(404).json({message}) 
                    
                }
               
                res.json({users})
            })
        
            }).catch(error =>{
                const message="le Users n'a pas pue etre modifier,reesayer dans quelques instant"
                res.status(500).json({message,data: error}) 
                console.log(error)
            }).catch(error => {
                if(error instanceof ValidationError ){
                return res.status(400).json({message: error.message,data: error})
               }

             
            
               
            })
        })
    }
