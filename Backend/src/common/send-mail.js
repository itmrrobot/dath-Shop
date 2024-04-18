const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const sendEmail = async (content) => {
  const {email:to,newPassword} = content;
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MY_EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  //EMAIL OPTIONS
  const from = process.env.MY_EMAIL;
  const subject = "This Is Sent By Admin of shop";
  const html = `
    <p>Hey ${to},</p>
    <p>This is your new password: ${newPassword}</p>
    <p>Thank you</p>
    `;
  return new Promise((resolve, reject) => {
    transport.sendMail({ from, subject, to, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};

module.exports = sendEmail;