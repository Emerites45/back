const express = require('express');
const multer = require('multer');

const {Pdf}= require('../db/sequelize')


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
  
// Route pour télécharger le fichier
app.post('/api/uploads/pdf/:id',upload,cors(),async (req,res)=> {

  try {
    let hote = "https://mighty-basin-23915-3716ff42a384.herokuapp.com";
    let pdfs = req.files.map(file => ({
        nom: file.originalname,
        path: hote + file.path.replace(/\\/g, "/"),
        chemin: file.path.replace(/\\/g, "/"),
        id_repertoire: req.params.id
    }));

    await Pdf.bulkCreate(pdfs);

    res.json({ pdfs }); // Réponse JSON une fois l'enregistrement terminé
} catch (error) {
    const message = "La formation n'a pas pu être ajoutée";
    console.log(error);
    res.status(500).json({ message, data: error });
}
});
}
  