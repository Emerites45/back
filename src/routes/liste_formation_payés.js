const {Repertoire}= require('../db/sequelize')
const {Abonnement}= require('../db/sequelize')
const cors= require('cors')
var liste=require("../fonctions/liste_formation_paye")
var tabs=[]
var tab=[]
var rep=[]
module.exports= (server) => {
   server.get('/api/liste/formation_paye/:email',cors(),async(req,res)=>{
   
try {

   tabs= await  Abonnement.findAll({ where:{adresse_visiteur:req.params.email}})
   tab= await  Repertoire.findAll({})

   tab.forEach(elements=>{

    tabs.forEach(element => {
        if(element.titre_repertoire===elements.titre){
               rep.push(elements)
        }
}) })
    res.json(rep)
   rep=[] }
      
       catch (error ){
        
           res.status(500).json({data: error}) 
           console.log(error)}
       
   }) 
}