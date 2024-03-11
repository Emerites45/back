const {Repertoire}= require('../db/sequelize')
const cors= require('cors')


var tabs=[]
module.exports= (server) => {
   server.get('/api/liste/titre_repertoire',cors(),async(req,res)=>{

    try {

    Repertoire.findAll({})
       .then(repertoire => {
        
         repertoire.forEach(element => {
            tabs.push(element.titre)
            tabs.sort();

         });

         res.json(tabs)

         tabs=[];
       })}catch(error) {

         console.log(error)
         const message = `La Repertoire  n'a pas pu être récupérée. Réessayez dans quelques instants.`
         res.status(500).json({message, data:error})
         console.log(error)
       }})
   }
