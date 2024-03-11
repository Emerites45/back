const {Repertoire}= require('../db/sequelize')

const cors= require('cors')



module.exports= (server) => {
   server.get('/api/liste/repertoire/:id',cors(),async(req,res)=>{
   

try {

   Repertoire.findAll({  

    where:{ id_repertoire: req.params.id

    }
   }).then(repertoires=>{ res.json(repertoires)}   ) }
      
       catch (error ){
        
           res.status(500).json({data: error}) 
           console.log(error)}
       
   }) 
}