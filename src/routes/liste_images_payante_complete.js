const {ImagePayante}= require('../db/sequelize')

const cors= require('cors')
module.exports= (server) => {

  
   
   server.get('/api/liste/imagepayantescomplet',cors(),  async(req,res)=>{
     
       ImagePayante.findAll({})
       .then(Image_uploadss =>{

       res.json(Image_uploadss)

       })
       .catch (error =>{
           const message="la liste des Image_uploads n'a pas ete recupere,reesayer dans quelques instant"
           res.status(500).json({message,data: error}) 
       })

      
      

     
   }) 
}