const {Abonnement}= require('../db/sequelize')
const {User}= require('../db/sequelize')
const cors= require('cors')
var utilisateur=require("../models/Users")


module.exports= (server) => {
   server.get('/api/liste/abonnement/:id',cors(),async(req,res)=>{
   let tab= []
   let abonnements=[]
  let  liste=[]
try {

     abonnements= await  Abonnement.findAll({  

    where:{ id_repertoire : req.params.id

    }
   })

  
tab = await User.findAll({ } )

   abonnements.forEach(elements=>{

      tab.forEach(element => {
         
          if(elements.adresse_visiteur===element.pseudo){
                 liste.push(elements)
          }
  })
  
     } )
  
      res.json(liste) 
   
   liste=[]}
      
       catch (error ){
        
           res.status(500).json({data: error}) 
           console.log(error)}
       
   }) 
}