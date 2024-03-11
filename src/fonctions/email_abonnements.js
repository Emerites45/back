
const nodemailer=require('nodemailer');

module.exports.send = async function(mail,pseudo,titre_formation) {
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.email',
 service:"gmail",
 secure:false,
  auth: {
    user: 'france.etudes237@gmail.com',
    pass: 'qnod fruy upri jjqa'
  }
});
const mailOptions = { from: '  "FranceÉtudes"   <france.etudes237@gmail.com>',
to:` ${pseudo}  < ${mail}>  `,
subject:"Abonnement Reussie 😁" ,
text:  ` Salut  ${pseudo}!\n\n\n `,
html: ` <p style="margin-left: 20px; font-size: 16px; color: black;">Votre abonnement à la formation  : <span style="font-size: 24px; font-weight: bold;">${titre_formation}</span>  a été effectué.</p> `
};

try {
        await  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    else {
      console.log("mail envoye:" + pseudo + "       " + info.response);
    }
  })
} catch (error) {
console.error('Une erreur s\'est produite lors de l\'envoi du message :', error);
}
}



