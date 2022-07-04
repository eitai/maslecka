import React from 'react';

const sgmail = require('@sendgrid/mail');
sgmail.setApiKey(
  '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'
);

const sendMail = (req, res) => {
  // const body = JSON.parse(req.body);

  const message = `Name :${req.fullName} \r\n Email:${req.email} \r\n  subject:${req.subject} \r\n Message:${req.message}\r\n`;

  const data = {
    to: 'eitaimeir@gmail.com',
    from: 'eitaimeir@gmail.com',
    text: message,
    html: message.replace(/\r\n/g, 'br'),
  };
  sgmail.send(data);
  // res.status(200).json({ status: 'ok' });
  return <div>mail</div>;
};

export default sendMail;
