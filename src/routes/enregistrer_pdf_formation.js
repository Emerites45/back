const express = require('express');
const multer = require('multer');

const {Pdf_formation}= require('../db/sequelize')


// Configuration de Multer
const storage = multer.diskStorage({
    destination : (req,file,cb)=>
    {
       cb(null,"./public/data/uploads/pdf")
    },
  
  filename: (req, file, cb) => {
    const name=file.originalname.split(" ").join("_")
    const extention= "pdf"

    

     cb(null, name+ "_"+Date.now()+ "."+extention);
  }
});

const upload = multer({ storage }).any('file');
const cors= require("cors")


module.exports= (app) => {

  // Utilisation de fonctions asynchrones pour une meilleure gestion des opérations asynchrones
app.post('/api/uploads/pdf_formation/:id', upload, cors(), async (req, res) => {
  try {
      let hote = "https://mighty-basin-23915-3716ff42a384.herokuapp.com";
      let pdfs = req.files.map(file => ({
          nom: file.originalname,
          path: hote + file.path.replace(/\\/g, "/"),
          chemin: file.path.replace(/\\/g, "/"),
          id_formation: req.params.id
      }));

      await Pdf_formation.bulkCreate(pdfs);

      res.json({ pdfs }); // Réponse JSON une fois l'enregistrement terminé
  } catch (error) {
      const message = "La formation n'a pas pu être ajoutée";
      console.log(error);
      res.status(500).json({ message, data: error });
  }
});
}
  