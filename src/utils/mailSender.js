const nodemailer = require('nodemailer');
const { logger } = require("../logger/index");

const sendOtpEmail = async (email, otp) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      logger.error("Missing email credentials in environment variables.");
      throw new Error("Missing email credentials");
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS,   
      },
    });


    const mailOptions = {
      from: process.env.EMAIL_USER,     
      to: email,                        
      subject: 'Your OTP Code',         
      text: `Your OTP code is: ${otp}`, 
      html: `<b>Your OTP code is: ${otp}</b>`, 
    };


    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    logger.info(`📧 OTP email sent to ${email}`);

    return info; 

  } catch (error) {
    logger.error("Error sending OTP email:", error);
    console.error('Error sending email: ', error);
    throw new Error('Error sending OTP email'); 
  }
};

module.exports = sendOtpEmail;
