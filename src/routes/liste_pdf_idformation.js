const {Pdf_formation}= require('../db/sequelize')

const cors= require('cors')
module.exports= (server) => {

   server.get('/api/liste/Pdf_formation/:id',cors(),  async(req,res)=>{
     
       Pdf_formation.findAll({
        where: {
            id_formation: req.params.id}
         
  })
       .then(Pdf =>{
          
      

       res.json(Pdf)

       })
       .catch (error =>{

        console.log(error)
           const message="la liste des Pdf n'a pas ete recupere,reesayer dans quelques instant"
           res.status(500).json({message,data: error}) 
       })
     
   }) 
}