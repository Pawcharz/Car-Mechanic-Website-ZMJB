const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

 
const fixDirname = (dirname) => {
  let fixedDirname = dirname.split('\\')
  fixedDirname.pop();
  fixedDirname = fixedDirname.join('\\');
  return fixedDirname;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

let generateMailHtml = async (name, phoneNr, email, message) => {
  let htmlTemplate = await fs.readFileSync(path.join(fixDirname(__dirname) + '/views/partials/emailTemplate.ejs'), 'utf8');

  htmlTemplate = htmlTemplate.replace('|name|', name);
  htmlTemplate = htmlTemplate.replace('|phoneNr|', phoneNr);
  htmlTemplate = htmlTemplate.replace('|email|', email);
  htmlTemplate = htmlTemplate.replace('|message|', message);

  return htmlTemplate;
}
const sendContactMail = async (name, phoneNr, email, message) => {

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECIPENT,
    subject: 'Wiadomość kontaktowa (ZMJB)',
    text: await generateMailHtml(name, phoneNr, email, message),
    html: await generateMailHtml(name, phoneNr, email, message)
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}
module.exports = {
  sendContactMail
}