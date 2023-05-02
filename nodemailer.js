"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function SendmMain() {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure:true,
    port: 465,
    auth: {
        user: 'diegoprada005@gmail.com',
        pass: 'mospdpnsglnwipdy'
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from:  'diegoprada005@gmail.com', // sender address
    to:  'diegomedina04@outlook.com', // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

SendmMain()
