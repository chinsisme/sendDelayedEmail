const express = require("express");
const router = express.Router();
const multer = require('multer')
const Joi = require('@hapi/joi')
const upload = multer({ dest: 'uploads/' })
const formidable = require('formidable')
const nodemailer = require('nodemailer')
const EMAIL = process.env.GOOGLE_EMAIL_ID
const PASSWORD = process.env.GOOGLE_PASSWORD
const bodyParser = require('body-parser');

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

// router.use(upload.array());
// router.use(express.static('public'));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
    const schema = {
        a: Joi.number()
    };

    const result = Joi.validate(req.body, {
        Emailid: Joi.string().email().required(),
        Timeout: Joi.number().required(),
        Data: Joi.string().base64().required(),
        FileName: Joi.string().required()
    })

    // const result = Joi.validate(req.body, schema);

    res.send(req.body)
})

module.exports = router