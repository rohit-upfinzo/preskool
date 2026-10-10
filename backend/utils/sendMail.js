const nodemailer = require("nodemailer");

module.exports.sendMail = async ({ to, subject, text }) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "783440675e1e74",
      pass: "3edd0549ff7094",
    },
  });

  transport.sendMail(
    {
      from: "Private Person <from@example.com>",
      to,
      subject,
      text,
    },
    (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    },
  );
};
