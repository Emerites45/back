const { ImagePayante } = require('../db/sequelize')



module.exports.image = async function (file,id) {

  try {

if(file!==null){

  let hote="https://mighty-basin-23915-3716ff42a384.herokuapp.com/"
  let files = file.map(file => ({ path: hote+file.path.replace(/\\/g, "/"), chemin:file.path.replace(/\\/g, "/"),nom: file.filename, id_repertoire:id}));
  await ImagePayante.bulkCreate(files)
}

}
 catch(error){
  const message = "La l'image n'a pas pu être ajoutée";
  console.log(error);
  res.status(500).json({ message, data: error });
}
}

