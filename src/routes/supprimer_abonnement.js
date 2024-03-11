const {Abonnement}= require('../db/sequelize');
const cors=require("cors")

module.exports = (app)=>{
    app.delete('/api/abonnement/supprimer/:id', cors(),(req,res)=>{
        Abonnement.findOne({ where: {
            id_abonnement: req.params.id}}
         )
        .then(abonnement => {
            if(abonnement===null){
                
                const message="le Abonnements n'existe pas, essayer un autre identifiant "
                return res.status(404).json({message}) 
            }
            const abonnementsdelete=abonnement;
            abonnement.destroy({
                where : id=abonnement.id
            }).then()
            return  res.json( abonnementsdelete) 
        }).catch(error =>{
            const message="le Repertoires n'a pas pue etre modifier,reesayer dans quelques instant"
            console.log(error)
            res.status(500).json({message,data: error}) 
           
        })

    })
}