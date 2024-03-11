const { Image } = require('../db/sequelize')

const { Video } = require('../db/sequelize')
const fs = require('fs');
const image = require("../models/Images")
const video = require("../models/Videos")



module.exports.image = async function (file,id, url) {

  try {
 
    let hote="https://mighty-basin-23915-3716ff42a384.herokuapp.com/"
    let files = file.map(file => ({ path: hote+file.path.replace(/\\/g, "/"), chemin:file.path.replace(/\\/g, "/"),nom: file.filename, id_formation:id}));
   
   await Image.bulkCreate(files)
  if ((url!=="undefined") 
  ) {
     video.path = url
    video.id_formation = id
    Video.create(video)
  }


}

catch(error){
  const message = "La l'image n'a pas pu être ajoutée";
  console.log(error);
  res.status(500).json({ message, data: error });


}
}
