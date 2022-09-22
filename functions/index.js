const functions = require("firebase-functions");
const mysql = require("mysql");

exports.sendEmail = functions.https.onCall(async (payload, context) => {
  const nodemailer = require('nodemailer');
  const { google } = require('googleapis');
  const userName = payload.name;
  const userEmail = payload.email;
  const userSubject = payload.subject;
  const message = payload.message;
  // These id's and secrets should come from .env file.
  const CLIENT_ID = '185521445086-6beavbepsclnkjhesk50gnv5gdgabp96.apps.googleusercontent.com';
  const CLEINT_SECRET = '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';
  const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
  const REFRESH_TOKEN = '1//04-rNjxZXQIF4CgYIARAAGAQSNwF-L9IrNWUbttGvWhz8PikZQqzMa7tT-vzcexjaIKJg5YaVeP_VSXozMobm_SHGYMPzSNR-zrw';

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'prod.byrambo@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `${userName} <${userEmail}>`,
      to: 'prod.byrambo@gmail.com',
      subject: `${userSubject}`,
      text: `${message}`,
      html: `<h1>${message}</h1>`,
    };

    const result = await transport.sendMail(mailOptions);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }

  return { success: true };
});