const nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

const sendEmail = async (message, email, subject, text) => {
  try {
    const transport = nodemailer.createTransport(sgTransport({
      auth: {
        api_key: process.env.SEND_GRID_API
      }
    }))

    await transport.sendMail({
      from: 'shreandride@gmail.com',
      to: email || message?.toUser?.email,
      subject: subject || 'בקשת השכרה',
      text: text || '',
      html: text || '<div><h1>יש לך בקשה חדשה באתר</h1> <a src="#">לחץ כאן כדי להיכנס לאתר</a></div>'
  });
  } catch (error) {
  }
    // const transport = nodemaile.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //         user: process.env.EMAIL_USERNAME,
    //         pass: process.env.EMAIL_PASSWORD
              // duyzdplovulzypyr
    //     }
    // });


    // var transport = nodemailer.createTransport({
    //     host: "smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "f1f1613a3a65a4",
    //       pass: "308981257599de"
    //     }
    //   });

    // const mailOptions = {
    //     from: 'Haim Ishta <haim12@gmail.com>',
    //     // from: 'Haim Ishta <hello@haim.io>',
    //     to: options.email,
    //     subject: options.subject,
    //     text: options.text
    //     //html
    // }

    // await transport.sendMail(mailOptions)
}

module.exports = sendEmail