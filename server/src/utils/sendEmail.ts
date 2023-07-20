import nodemailer from 'nodemailer'
import path from 'path'
import hbs from 'nodemailer-express-handlebars'

import { MailOptions } from "../types/auth";

const sendEmail=(mailOptions:MailOptions)=>{
    const transporter=nodemailer.createTransport({
        service:process.env.EMAIL_SERVICE_NAME,
        auth:{
            user:process.env.EMAIL_SERVICE_AUTH,
            pass:process.env.EMAIL_SERVICE_PASSWORD
        }
    });

    const hbsOptions = {
        viewEngine: {
          extName: '.handlebars',
          partialsDir: path.resolve('./templates'),
          defaultLayout: false,
        },
        viewPath: path.resolve('./templates'),
        extName: '.handlebars',
      };

    transporter.use('compile',hbs(hbsOptions as any))

    transporter.sendMail(mailOptions);
}

export default sendEmail;