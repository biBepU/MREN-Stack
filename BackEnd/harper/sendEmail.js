const nodemailer = require("nodemailer");

const ejs = require('ejs')

let sendEmail =async({view,data,from,to,subject})=>{
    try {
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "251ca9733f119d",
              pass: "4ba4c8773e31a9"
            }
          });
          
    let dataString = await ejs.renderFile('./views/'+view+'.ejs',data)
    const info =  transport.sendMail({
        from, // sender address
        to, // list of receivers
        subject, // Subject line
        html: dataString, // html body
    });
    
        console.log("Message sent: %s", info.messageId);
       

    } catch (error) {
      throw new Error(error);
     
    }
}

module.exports= sendEmail;