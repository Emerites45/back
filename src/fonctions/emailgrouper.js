
const nodemailer=require('nodemailer');

module.exports.send = async function(mail,pseudo,suject,message) {
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
subject: suject,
text:  ` Salut  ${pseudo}!\n\n\n` + message 
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


/*
module.exports.send = async function(mail,pseudo,suject,message) {


  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    tls:{
         ciphers:"SSLv3"
    },
    auth: {
      user: 'franckemerites45@outlook.com',
      pass: 'franckemerites142002'
    }
  });
const mailOptions = {
  from: 'franckemerites45@outlook.com',
  to: mail,
  subject: suject,
  text:  ` Salut  ${pseudo}!\n\n\n` + message 
};

try {
  await  transporter.sendMail(mailOptions,function (error,info){
    if(error){
    console.log(error);
    }
    else{
      console.log("mail envoye:" +pseudo +"       " + info.response);
    }})
} catch (error) {
  console.error('Une erreur s\'est produite lors de l\'envoi du message :', error);
}
};
*/


