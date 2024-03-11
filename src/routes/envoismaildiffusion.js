const {User}=require('../db/sequelize')
const {Email}=require('../db/sequelize')
const mail=require('../models/Email')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')
var mails= require("../fonctions/emailgrouper")

const cors= require("cors")



module.exports= (server) => {
server.post('/api/sendmail/:id',cors(), async (req,res) =>{

    mail.subject=req.body.subject;
    mail.message=req.body.message;
    mail.id_utilisateur=req.params.id;

    annee=req.body.annee;
   
    var utilisateurs= await  User.findAll({})
   
    Email.create(mail).then(mail=> {
     
     
      utilisateurs.forEach(element => {
         if(element.status===0 && element.date_creation.getFullYear()===annee ){
        
            setTimeout(() => {
               mails.send(element.email,element.pseudo,mail.subject,mail.message)
             }, 25000);

             
         }
        
      });
      
     
      return res.json({mail})

    }).catch(error => {
      if(error instanceof ValidationError ){
         console.log(error);
      return res.status(400).json({message: error.message,data: error})
     
     }
     if(error instanceof UniqueConstraintError){
      return res.status(400).json({message: error.message})
     }
     const message="le mail  n'a pas pue etre ajouter"
 
     console.log(error);
     res.status(500).json({message, data:error})
     
  })


  }   )
}