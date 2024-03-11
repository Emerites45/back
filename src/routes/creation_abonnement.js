
const {Repertoire}= require('../db/sequelize')
const {Abonnement}= require('../db/sequelize')
const {User}= require('../db/sequelize')
const {ValidationError}= require('sequelize')
const {UniqueConstraintError}=require('sequelize')



const cors= require("cors")
const mail=require("../fonctions/email_abonnements")
var utilisateur= require("../models/Users") 

var abonnement = require('../models/Abonnement')
var repertoire = require('../models/Repertoire')


module.exports= (server) => {
   server.post('/api/creation/abonnement',cors(),async(req,res)=> {
      
  try {
   
   abonnement.titre_repertoire=req.body.titre_repertoire;
    abonnement.adresse_visiteur=req.body.adresse_visiteur;

       await  Repertoire.findOne({where:{
            titre: req.body.titre_repertoire
        }}).then(repertoires=>{repertoire=repertoires})

        
       utilisateur= await  User.findOne({ where: {
         pseudo: req.body.adresse_visiteur}})
         abonnement.id_repertoire=repertoire.id_repertoire
    Abonnement.create(abonnement)
    mail.send(utilisateur.email,abonnement.adresse_visiteur,abonnement.titre_repertoire );
        res.json({abonnement})

}
    catch(error ) {
     if(error instanceof ValidationError ){
        console.log(error);
     return res.status(400).json({message: error.message,data: error})
    
    }
    if(error instanceof UniqueConstraintError){
     return res.status(400).json({message: error.message})
    }
    const message="la Abonnements n'a pas pue etre ajouter"

    console.log(error);
    res.status(500).json({message, data:error})
    
   }}
   )}