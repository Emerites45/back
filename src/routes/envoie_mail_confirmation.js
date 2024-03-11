
const utilisateur= {pseudo:'',email:'',code_confirmation:''}
const cors=require("cors")
var mails= require("../fonctions/email_confirmation")

const {User}= require('../db/sequelize')
module.exports= (server) => {
   server.post('/api/envoie_mail_confirmation', cors(),async(req,res)=>{

try{
     var tab= await  User.findAll();
       tab.forEach(element => {
      if(element.email===req.body.email){
             res.json("Ce email est deja pris veuillez renseignez un autre")
      }
})
     
    utilisateur.pseudo=req.body.pseudo;
    utilisateur.email=req.body.email;
    utilisateur.code_confirmation= req.body.code_confirmation;
  

    mails.send(utilisateur.email,utilisateur.pseudo,utilisateur.code_confirmation);

    res.json("mail envoye")

  
 }  catch(error) {
   const message = `La User  n'a pas pu être récupérée. Réessayez dans quelques instants.`
   res.status(500).json({message, data:error})
   console.log(error)
 }

    
}

)}