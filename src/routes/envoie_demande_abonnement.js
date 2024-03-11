
const cors=require("cors")
var mails= require("../fonctions/envoie_mail_demande_d'abonnement.js")

module.exports= (server) => {
   server.post('/api/mail_demande_abonnement', cors(),async(req,res)=>{

try{

   var objet = { pseudo:"",titre_formation:"",prix:""}
 
     
    objet.pseudo=req.body.pseudo;
    objet.titre_formation=req.body.titre_formation;
    objet.prix= req.body.prix;
  

    mails.send(objet.pseudo,objet.titre_formation,objet.prix);

    res.json("mail envoye")

  
 }  catch(error) {
   const message = `La User  n'a pas pu être récupérée. Réessayez dans quelques instants.`
   res.status(500).json({message, data:error})
   console.log(error)
 }

    
}

)}