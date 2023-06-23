const nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");

const sendEmail = async (message, email, subject, text) => {
  try {
    const transport = nodemailer.createTransport(
      sgTransport({
        auth: {
          api_key: process.env.SEND_GRID_API,
        },
      })
      );
       
    const res = await transport.sendMail({
      from: "shreandride@gmail.com",
      to: email || message?.toUser?.email,
      subject: subject || "בקשת השכרה",
      text: text || "",
      html:
        text ||
        '<div><h1>יש לך בקשה חדשה באתר</h1> <a src="#">לחץ כאן כדי להיכנס לאתר</a></div>',
    });
  } catch (error) {
    
  }
};

module.exports = sendEmail;
