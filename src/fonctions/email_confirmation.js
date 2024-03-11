
const nodemailer=require('nodemailer');
module.exports.send = async function(mail,pseudo,code_confirmation) {


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.email',
    service:"gmail",
    secure:false,
     auth: {
       user: 'france.etudes237@gmail.com',
       pass: 'qnod fruy upri jjqa'
     }
  });
const mailOptions = {
  from: '  "FranceÉtudes"   <france.etudes237@gmail.com>',
  to:` ${pseudo}  < ${mail}>  `,
  subject: "Confirmation votre inscription",
  text:  `Salut ${pseudo} `,

  html: ` <p style="margin-left: 20px; font-size: 16px; color: black;">Votre inscription est en cours. Saisissez le code : <span style="font-size: 24px; font-weight: bold;">${code_confirmation}</span> suivant pour la terminer.</p> `
  //   
};

         transporter.sendMail(mailOptions,function (error,info){
          if(error){
          console.log(error);
          }
          else{
            console.log("mail envoye"+ info.response);
          }})


  /*
   
    /*

 */
} 
