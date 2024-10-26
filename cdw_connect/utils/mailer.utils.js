const nodeMailer = require("nodemailer");

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
  console.log("mail", mail.messageId);
  //   var transport = nodeMailer.createTransport("SMTP", {
  //     service: "Outlook365", // Use 'hotmail' for Hotmail accounts
  //     auth: {
  //       user: "your-email@outlook.com", // Your Outlook email
  //       pass: "your-password", // Your Outlook password or app password
  //     },
  //     port: 465,
  //     secure: true,
  //   });
  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log("eroor", error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
};

module.exports = { sendMail };
