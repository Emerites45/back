const express = require('express') 
const cookiesParser = require('cookie-parser')
const session = require('express-session')
const http=  require('http');
const favicon=require('serve-favicon')
const bodyParser=require('body-parser')
const {sequelize} = require('./src/db/sequelize')
const ejs = require("ejs")
const path= require("path")
const expressJwt = require('express-jwt');
const privatekey=require('./src/db/auth/private_key');
const sequelizeSession = require('connect-session-sequelize')(session.Store)
require("dotenv").config();

const cors =require('cors')

const app =express()
const port =  process.env.PORT || 3000
const oneDay = 1000 * 60 * 60 * 24

const fs= require('fs')
//synchronisation a la base de donnee embarque
sequelize.sync().then( ()=>console.log('base de donnée pret'));

const options = {
  key:fs.readFileSync('/certificates/key.pem'),
  cert: fs.readFileSync('/certificates/cert.pem')
}

// http://193.203.190.101:3000
//session middleware
global.isConnected = false;
const corsOptions = {
    origin: 'https://franceetude-ba444.web.app', // Remplacez par votre/vos origine(s) autorisée(s)
   
    credentials: true, // Autoriser les cookies pour les requêtes authentifiées (si applicable)
    optionsSuccessStatus: 200, // Code de statut personnalisé pour les requêtes de pré-vol (optionnel)
  };

app.use("/public/data/uploads",express.static(path.join(__dirname,"/public/data/uploads")))
app.use(cookiesParser())
.use(session({
    name: process.env.SESSION_NAME,
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: false,
    cookie :{
        maxAge :  1000 * 60 * 60 * 24 * 7,
        secure: false,
    } ,
    store:new sequelizeSession({
        db:sequelize
    })
}))
.use(express.static(__dirname))


//.use(expressJwt({ secret: privatekey }).unless({ path: ['/api/login'] }))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended:true}))
.use(cors(corsOptions));

//ici, nous placerons nos futurs points de terminaison. 


//point de terminaison des repertoires
require('./src/routes/creation_repertoire')(app);                     //http://localhost:3000/api/creation/repertoire

require("./src/routes/liste_repertoire_id")(app)                      //http://localhost:3000/api/liste/repertoire/id
require("./src/routes/lister_videos_id_repertoire")(app)                     //http://localhost:3000/api/video_uploads/:id     id c'est celui du repertoire

require("./src/routes/liste_des_repertoires")(app)                     //http://localhost:3000/api/liste/repertoire

require("./src/routes/lister_images_id_repertoire")(app)              //http://localhost:3000/api/imagepayante/:id

require("./src/routes/liste_images_payante_complete")(app)            // http://localhost:3000//api/liste/imagepayantescomplet

require("./src/routes/supprimer_repertoire")(app)                         // http://localhost:3000/api/repertoire/supprimer/:id

require("./src/routes/modifier_repertoire")(app)                          //http://localhost:3000/api/repertoire/modifier/:id

 
//point de terminaison d' abonnement
 require('./src/routes/creation_abonnement')(app);                     //http://localhost:3000/api/creation/abonnement

 require("./src/routes/listeabonnement")(app)                            //http://localhost:3000/api/liste/abonnement

 require("./src/routes/modifier_abonnement")(app)                        //http://localhost:3000/api/abonnement/modifier/id
   
 require("./src/routes/supprimer_abonnement")(app)                      //http://localhost:3000/api/abonnement/supprimer/id


// point de terminaison des utilisateurs

require('./src/routes/envoie_mail_confirmation')(app)                                // http://localhost:3000/api/envoie_mail_confirmation 
require('./src/routes/connexion')(app)                                // http://localhost:3000/api/login  

                                                                         // http://localhost:3000/api/admin/logout  

                                                                        // http://localhost:3000/api/logout


require('./src/routes/creation_utilisateur')(app)                    //  http://localhost:3000/api/register

require("./src/routes/modifier_speudo")(app)                         // http://localhost:3000/api/utilisateur/modifier/speudo
 

require("./src/routes/supprimer_utilisateur")(app)             // http://localhost:3000/api/utilisateur/supprimer/:id

  // point de terminaison des formations
require('./src/routes/creation_formation')(app)                  // http://localhost:3000/api/creation/formation

require("./src/routes/liste_formation")(app)                   // http://localhost:3000/api/liste/formation

require("./src/routes/supprimer_formation")(app)                        //  http://localhost:3000/api/formation/supprimer/:id

require("./src/routes/modifier_formation")(app)                  // http://localhost:3000/api/formation/modifier/:id

require("./src/routes/liste_formation_payés")(app)                  // http://localhost:3000/api/liste/formation_paye/emails  pour avoir la liste des formation pour lesqu'elle un utilisateur s'est abonne 



require("./src/routes/liste_video_id_formation")(app)                 //http://localhost:3000/api/video/id     avec id l'identifiant de la formation 


require("./src/routes/listeformation_id")(app)                         //  http://localhost:3000/api/formation/:id


require('./src/routes/liste_abonnement_id_repertoire')(app)              //  http://localhost:3000/api/liste/abonnement/:titre_repertoire

//point de terminaison des emails 
require('./src/routes/envoismaildiffusion')(app)                // http://localhost:3000/api/sendmail/:id



//points de terminaison des videos 
require('./src/routes/supprimer_videos_upload')(app)                // http://localhost:3000/api/video/supprimer/:id  ici il faut donner l'identifiant de la video 

require('./src/routes/enregistrer_videos')(app)                 // http://localhost:3000/api/uploads/video/id


require("./src/routes/modifier_videos")(app)                     // http://localhost:3000/api/video/modifier/:id
 
require("./src/routes/lister_videos_id_repertoire")(app)        // http://localhost:3000/api/video/:id


// points de terminaison des pdfs
require('./src/routes/supprimer_pdf_uploader')(app)                // http://localhost:3000//api/pdf/supprimer/:id     ici il faut donner l'identifiant du pdf 

require("./src/routes/enregistrer_pdf")(app)                    // http://localhost:3000/api/uploads/pdf/:id

require("./src/routes/liste_pdf_id_repertoire")(app)     //http://localhost:3000/api/liste/Pdf/:id


// points de terminaison des pdf_formation gratuite
require('./src/routes/supprimer_pdf_formation')(app)                // http://localhost:3000//api/pdf_formation/supprimer/:id     ici il faut donner l'identifiant du pdf 

require("./src/routes/enregistrer_pdf_formation")(app)                    // http://localhost:3000/api/uploads/pdf_formation/:id      ici il faut renseigner l'identifiant de la formation

require("./src/routes/liste_pdf_idformation")(app)     //http://localhost:3000/api/liste/Pdf_formation/:id


//point de terminaisons des images 
require("./src/routes/lister_image_id_formation")(app)         // http://localhost:3000/api/image/:id


//require('./src/routes/enregistrer_image')(app)                 // http://localhost:3000/api/uploads/image/:id


require("./src/routes/lister_images_acceuil")(app)                      //   http://localhost:3000/api/liste/imageacceuil




//point de terminaison  front end 

require("./src/routes/liste_image_complet")(app)                // http://localhost:3000/api/liste/imagecomplet
require("./src/routes/idadminstrateur")(app)                    // http://localhost:3000/api/administrateur
require("./src/routes/verification_connexion")(app)            //http://localhost:3000/api/verifier  permet de verifier si l'utilisateur est connecter ou pas 
require("./src/routes/liste_adresse_mail")(app)                //http://localhost:3000/api/liste/adresse_mail  pour avoir la liste des adresse mail 
require("./src/routes/liste_titre_formation")(app)              //http://localhost:3000/api/liste/titre_repertoire  pour avoir la liste des titres des formations 
require("./src/routes/envoie_demande_abonnement")(app)            
//require('./src/routes/envoismaildiffusion')(app)

app.get('/', (req, res) => {

  res.json( "API deployer avec sucess...😁")
 })

//On ajoute la gestion des erreurs 404
app.use(({res})=>{
    const message ='Impossible de trouver la ressource demandée! vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})

http.createServer(options,(req,res)=>{
  
}).listen(port)