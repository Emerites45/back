const { Abonnement }= require('../db/sequelize')
const {ValidationError}=require('sequelize')
const cors=require("cors")
module.exports =(app) =>{
    app.put('/api/abonnement/modifier/:id', cors(),(req,res) =>
    {
       let id= req.params.id

      Abonnement.update(req.body,{
            where: {id_Abonnements: id}

        })
        .then(_=>{
          return Abonnement.findByPk(id).then(abonnements => {
                if(abonnements===null)
                {
                     let message="l' Abonnements n'existe pas "
                        res.status(404).json({message}) 
                    
                }
               
                res.json({abonnements})
            })
        
            }).catch(error =>{
               let message="le Abonnements n'a pas pue etre modifier,reesayer dans quelques instant"
                res.status(500).json({message,data: error}) 
                console.log(error)
            }).catch(error => {
                if(error instanceof ValidationError ){
                return res.status(400).json({message: error.message,data: error})
               }
               if(error instanceof UniqueConstraintError){
                return res.status(400).json({message: error.message})
               }

              let message="l'image n'a pas pue etre ajouter"
               res.status(500).json({message, data:error})
               
            })
        })
    }
