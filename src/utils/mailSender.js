// const nodemailer = require('nodemailer');
// const { logger } = require("../logger/index");

// const sendOtpEmail = async (email, otp) => {
//   try {
//     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//       logger.error("Missing email credentials in environment variables.");
//       throw new Error("Missing email credentials");
//     }

//     const transporter = nodemailer.createTransport({
//       service: 'gmail', 
//       // port:465,
//       //   secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,  
//         pass: process.env.EMAIL_PASS,   
//       },
//       logger: true,
//   debug: true
//     });


//     const mailOptions = {
//       from: process.env.EMAIL_USER,     
//       to: email,                        
//       subject: 'Your OTP Code',         
//       text: `Your OTP code is: ${otp}`, 
//       html: `<b>Your OTP code is: ${otp}</b>`, 
//     };


//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//     logger.info(`OTP email sent to ${email}`);

//     return info; 

//   } catch (error) {
//     logger.error("Error sending OTP email:", error);
//     console.error('Error sending email: ', error);
//     throw new Error('Error sending OTP email'); 
//   }
// };



// module.exports = sendOtpEmail;
// utils/mailSender.js

const nodemailer = require("nodemailer");
const { logger } = require("../logger/index");

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  logger.error("Missing email credentials in environment variables.");
  throw new Error("Missing email credentials");
}

// Reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: true,
  debug: true,
});

// ========== OTP Mail Function ==========
const sendOtpEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
      html: `<b>Your OTP code is: ${otp}</b>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    logger.info(`OTP email sent to ${email}`);
    return info;
  } catch (error) {
    logger.error("Error sending OTP email:", error);
    throw new Error("Error sending OTP email");
  }
};

// ========== Contact Form Mail Function ==========
/**
 * Sends contact form email.
 * @param {string} to       - recipient (your inbox)
 * @param {string} from     - user's email
 * @param {string} subj     - subject of the message
 * @param {string} bodyText - plain text
 * @param {string} bodyHtml - optional HTML version
 */
const sendContactEmail = async (to, from, subj, bodyText, bodyHtml) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      replyTo: from,
      subject: subj,
      text: bodyText,
      ...(bodyHtml && { html: bodyHtml }),
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Contact email sent to ${to}`);
    return info;
  } catch (error) {
    logger.error("Error sending contact email:", error);
    throw new Error("Error sending contact email");
  }
};

module.exports = {
  sendOtpEmail,
  sendContactEmail,
};


