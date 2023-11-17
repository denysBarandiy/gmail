const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const opn = require('opn');
require('dotenv').config();
const port = 3000;




app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/saveEmail', (req, res) => {
    const email = req.body.email;
  
    fs.appendFile('emails.txt', `${email}\n`, (err) => {
      if (err) throw err;
      console.log('Email saved to file.');
    });
  
    sendConfirmationEmail(email);
  
    res.send('Електронну пошту збережено та надіслано електронний лист із підтвердженням');
  });
  
function sendConfirmationEmail(email) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.LOGIN,
      pass: process.env.PASSWORD 
    }
  });

  const mailOptions = {
    from: 'google', 
    to: email,
    subject: 'Повідомлення від Google',
    text: 'Дякуємо за підписку!'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending confirmation email:', error);
    } else {
      console.log('Confirmation email sent:', info.response);
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  opn(`http://localhost:${port}`);
});


