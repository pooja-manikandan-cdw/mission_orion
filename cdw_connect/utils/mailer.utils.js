const nodeMailer = require("nodemailer");

/**
 * @description send mail based on received details
 * @param {String} subject
 * @param {String} recepient
 * @param {String} content
 */
const sendMail = async (subject, recepient, content) => {
  const transporter = nodeMailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    maxConnections: 11,
    maxMessages: Infinity,
    auth: {
      user: "pooja17122@gmail.com",
      pass: "hrga dqrz oins awtc",
    },
  });

  const mail = await transporter.sendMail({
    from: "pooja17122@gmail.com",
    to: recepient,
    subject: subject,
    html: content,
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log("eroor", error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
};

module.exports = { sendMail };
