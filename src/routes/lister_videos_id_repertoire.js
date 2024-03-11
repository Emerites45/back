const {Videos_upload}= require('../db/sequelize')

const cors= require('cors')
module.exports= (server) => {

   server.get('/api/video_uploads/:id',cors(),  async(req,res)=>{
     
       Videos_upload.findAll({
        where: {
            id_repertoire: req.params.id}
         
  })
       .then(Video =>{
       res.json(Video)

       })
       .catch (error =>{

        console.log(error)
           const message="la liste des Video n'a pas ete recupere,reesayer dans quelques instant"
           res.status(500).json({message,data: error}) 
       })
     
   }) 
}