const express = require("express");
const router = express.Router();
const multer = require('multer')
const Joi = require('@hapi/joi')
const upload = multer({ dest: 'uploads/' })
const formidable = require('formidable')
const nodemailer = require('nodemailer')
const EMAIL = process.env.GOOGLE_EMAIL_ID
const PASSWORD = process.env.GOOGLE_PASSWORD

const Mail = require('./../functions/sendEmail')


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// const upload = multer({ storage: storage })


// router.post('/', upload.single(''), (request, response) => {
//     // Validate request format
// const { error, value } = Joi.validate(request.body, {
//     Emailid: Joi.string().email().required(),
//     Timeout: Joi.number().required(),
//     Data: Joi.string().base64().required(),
//     FileName: Joi.string().required()
// })

// if (error) {
//     response.send(error)
//     return
// }

//     // response.send(value)

//     const email = request.body.Emailid
//     const waitTime = request.body.waitTime
// })

router.post('/', (req, res) => {
    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error', err)
            throw err
        }

        if (!files.file) {
            res.send("Image not sent. Attach it with key 'file'.")
            return
        }
        const result = Joi.validate(fields, Joi.object().keys(({
            Emailid: Joi.string().email().required(),
            Timeout: Joi.number().required(),
            Data: Joi.string().base64().required(),
            FileName: Joi.string().required()
        })))

        if (result.error) {
            res.send(result.error)
            return
        }

        // console.log('Files', files)
        // files.file.name = fields.FileName.split('.')[0] + '-' + fields.Emailid.replace('@', '-') + '.' + fields.FileName.split('.')[1]
        // files.file.path = 'uploads/' + files.file.name
        if (['png', 'jpeg', 'jpg', 'bmp', 'ani'].indexOf(files.file.name.split('.')[1]) <= -1) {
            res.send('Incorrect format.')
            return
        }
        // Send email
        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     type: 'OAuth2',
        //     auth: {
        //         user: EMAIL,
        //         pass: PASSWORD
        //     }
        // });

        // const mailOptions = {
        //     from: 'chinsisme@gmail.com',
        //     to: fields.Emailid,
        //     subject: 'Sending Email using Node.js',
        //     text: 'That was easy!',
        //     attachments: [
        //         {
        //             filename: fields.FileName,
        //             path: files.file.path
        //         }
        //     ]
        // };

        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //         res.send({
        //             message: `A mail will be sent to you after ${fields.Timeout} seconds`
        //         })
        //     }
        // });

        // console.log(typeof (files.file.path));

        file_path = files.file.path

        // console.log(typeof (file_path));
        const input = []
        // self_email, self_password, sender_email, receiver_email, subject, text, file_name, file_path, timeout
        const mail_result = new Mail(res, EMAIL, PASSWORD, 'chinsisme@gmail.com', fields.Emailid, 'Sending Email using Node.js', 'That was easy!', fields.FileName, file_path, fields.Timeout)
        console.log(mail_result);
        // res.send(mail_result)
    })
})

module.exports = router