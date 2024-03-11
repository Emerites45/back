const {Pdf}= require('../db/sequelize')

const cors= require('cors')
module.exports= (server) => {

   server.get('/api/liste/Pdf/:id',cors(),  async(req,res)=>{
     
       Pdf.findAll({
        where: {
            id_repertoire: req.params.id}
         
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