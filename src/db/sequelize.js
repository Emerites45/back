const Usermodel= require("../models/Users")
const Emailmodel= require("../models/Email")
const Formadtionmodel=require("../models/Formations")
const Videomodel= require("../models/Videos")
const Imagesmodels=require("../models/Images")
const Pdfmodel=require("../models/Pdf")
const Pdf_formationmodel=require("../models/Pdf_formation")
const Imagepayantemodels=require("../models/image_payant")
const Repertoiremodels=require("../models/Repertoire")
const Video_uploadsmodels= require("../models/Videos_upload")
const Abonnementmodels=require("../models/Abonnement")

const { Sequelize, DataTypes } = require('sequelize')
let sequelize
/*
sequelize = new Sequelize('ma_base_de_donnees', 'mon_utilisateur', 'mon_mot_de_passe', {
  host: 'srv491492localhost',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging:true
})


else{*/
  
 sequelize = new Sequelize('bd', 'root', '', {
  host: 'bd.sqlite',
  dialect: 'sqlite',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging:true
})

const Pdf=Pdfmodel(sequelize,DataTypes);
const Pdf_formation=Pdf_formationmodel(sequelize,DataTypes);
const Video=Videomodel(sequelize,DataTypes);
const Image=Imagesmodels(sequelize,DataTypes);
const User=Usermodel(sequelize,DataTypes);
const Email=Emailmodel(sequelize,DataTypes);
const Formation=Formadtionmodel(sequelize,DataTypes);
const ImagePayante=Imagepayantemodels(sequelize,DataTypes);
const Repertoire=Repertoiremodels(sequelize,DataTypes);
const Videos_upload= Video_uploadsmodels(sequelize,DataTypes);
const Abonnement= Abonnementmodels(sequelize,DataTypes);




Repertoire.hasMany(Videos_upload,{
  foreignKey: "id_repertoire",
  as: 'video_uploads',
  onDelete: 'CASCADE'
})

Videos_upload.belongsTo(Repertoire,{
  foreignKey: 'id_repertoire',
  as: "video_upload",
 
})

User.hasMany(Email,{
  foreignKey:'id_utilisateur',
  as: 'mail_utilisateur',
hooks: true
 
})
Email.belongsTo(User,{
  foreignKey: 'id_utilisateur',
  as: 'mail_utilisateur',
  onDelete: 'CASCADE',
  hooks:true
})


Formation.hasMany(Video,{
  foreignKey:'id_formation',
  as: 'video_formation',
  onDelete:'CASCADE'
})

Video.belongsTo(Formation,{
  foreignKey: 'id_formation',
  as: 'video_formation',
  
  hooks:true
})



Formation.hasMany(Pdf_formation,{
  foreignKey:'id_formation',
  as: 'pdf_formation',
  onDelete:'CASCADE'
})

Pdf_formation.belongsTo(Formation,{
  foreignKey: 'id_formation',
  as: 'pdf_formation',
  hooks:true
})



Formation.hasMany(Image,{
  foreignKey:'id_formation',
  as: 'image_formation',
  onDelete:'CASCADE'
})

Image.belongsTo(Formation,{
  foreignKey: 'id_formation',
  as: 'image_formation',
 
  hooks:true
})


Repertoire.hasMany(ImagePayante,{
  foreignKey:'id_repertoire',
  as: 'image_repertoire',
  onDelete:'CASCADE'
})

ImagePayante.belongsTo(Repertoire,{
  foreignKey: 'id_repertoire',
  as: 'image_formation',
 
  hooks:true
})




Repertoire.hasMany(Pdf,{
  foreignKey:'id_repertoire',
  as: 'pdf_formation',
  onDelete:'CASCADE'
})

Pdf.belongsTo(Repertoire,{
  foreignKey: 'titre_repertoire',
  as: 'pdf_formation',
 
  hooks:true
})


Repertoire.hasMany(Abonnement,{
  foreignKey:'id_repertoire',
  as: 'abonnement_formation',
  onDelete:'CASCADE'
})

Abonnement.belongsTo(Repertoire,{
  foreignKey: 'id_repertoire',
  as: 'abonnement_formation',
 
  hooks:true
})




const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
      console.log('La base de donnée a bien été initialisée !')
    })
  }
    
  
  module.exports = { 
   sequelize,User,Email,Formation,Video,Image,Pdf,Pdf_formation,ImagePayante,Repertoire,Videos_upload,Abonnement
  }