const nodemailer = require('nodemailer')

class Mail {

    constructor(res, self_email, self_password, sender_email, receiver_email, subject, text, file_name, file_path, timeout) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            type: 'OAuth2',
            auth: {
                user: self_email,
                pass: self_password
            }
        });

        const mailOptions = {
            from: sender_email,
            to: receiver_email,
            subject: subject,
            text: text,
            attachments: [
                {
                    filename: file_name,
                    path: file_path
                }
            ]
        };

        console.log(file_path);

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send(error)
            } else {
                console.log('Email sent: ' + info.response);
                res.send({
                    message: `A mail will be sent to you after ${timeout} seconds`
                })
            }
        });
    }
}

module.exports = Mail