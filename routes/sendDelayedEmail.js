const express = require("express");
const router = express.Router();
const Joi = require('@hapi/joi')
const formidable = require('formidable')
const kue = require('kue')
    , queue = kue.createQueue();

const EMAIL = process.env.EMAIL_ID
const PASSWORD = process.env.PASSWORD

const Mail = require('./../functions/sendEmail')


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

        if (!EMAIL || !PASSWORD) {
            console.log(EMAIL);
            console.log(PASSWORD);
            res.send("Set email and password. Check README for details.")
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

        if (['png', 'jpeg', 'jpg', 'bmp', 'ani'].indexOf(files.file.name.split('.')[1]) <= -1) {
            res.send('Incorrect format.')
            return
        }

        const email_job = queue.create('email', {
            title: 'welcome email'
        })
            .delay(fields.Timeout)
            .priority('high')
            .save(function (err) {
                if (!err) console.log(email_job.id);
            });


        queue.process('email', (job, done) => {
            new Mail().eMail(EMAIL, PASSWORD, 'delayedemailapi@gmail.com', fields.Emailid, 'Sending Email using Node.js', 'That was easy!', fields.FileName, files.file.path, fields.Timeout)
            console.log("Success");
            send_response(done)
        })
        async function send_response(done) {
            res.send({
                message: `A mail will be sent to you after ${fields.Timeout / 1000} seconds`
            })
        }

    })
})

module.exports = router