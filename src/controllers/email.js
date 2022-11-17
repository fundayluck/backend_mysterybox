const mongoose = require("mongoose")
const nodemailer = require('nodemailer');
const PIC = mongoose.model('pic')
const Subs = mongoose.model('subs')


const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};




module.exports = {
    getSubs: async (req, res, next) => {
        try {
            const doc = await Subs.find({})
            res.send({
                status: 'success',
                data: doc
            })
        } catch (err) {
            res.send({
                status: 'failed',
                error: err.message
            })
        }
    },
    getEmail: async (req, res, next) => {
        try {
            const doc = await PIC.find({})
            res.send({
                status: 'success',
                data: doc
            })
        } catch (err) {
            res.send({
                status: 'failed',
                error: err.message
            })
        }
    },
    sendSubs: async (req, res, next) => {
        const { email } = req.body
        const findEmail = await Subs.findOne({ email })
        if (findEmail) {
            res.status(400).send({
                status: 'failed',
                message: 'email sudah terdaftar!'
            })
        } else if (email === '') {
            res.status(400).send({
                status: 'failed',
                message: 'email harus diisi!'
            })
        } else {

            const transporter = nodemailer.createTransport({
                host: "mail.mysteryboxindonesia.co.id",
                port: 587,
                secure: false, // use TLS
                auth: {
                    user: "contact@mysteryboxindonesia.co.id",
                    pass: "Honginterna$ional1010",
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            })

            transporter.use('compile', hbs(handlebarOptions))

            const mailOptions = {
                from: "contact@mysteryboxindonesia.co.id",
                to: email,
                subject: 'Thank You For Subscribing',
                template: 'index'

            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                    res.send('error')
                } else {
                    console.log('Email sent: ' + info.response)
                    res.send('success')
                }
            })


            try {
                const doc = new Subs({
                    email
                })
                await doc.save()
                res.status(200).send('email terkirim ke database')
            } catch (error) {
                res.status(422).send(error.message)
            }
        }
    },
    sendEmail: async (req, res, next) => {
        const {
            picName,
            mobile,
            brandName,
            email,
            address,
            detailProvinsi,
            detailKota,
            selectKecamatan,
            postalcode,
            category,
            description
        } = req.body

        const transporter = nodemailer.createTransport({
            host: "mail.mysteryboxindonesia.co.id",
            port: 587,
            secure: false, // use TLS
            auth: {
                user: "contact@mysteryboxindonesia.co.id",
                pass: "Honginterna$ional1010",
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
            },
        })

        const mailOptions = {
            from: "contact@mysteryboxindonesia.co.id",
            to: 'test@mysteryboxindonesia.co.id',
            subject: `message from ${picName} for ${category}`,
            text: ` 
            Pic Information 
            Pic Name: ${picName} 
            Mobile number: ${mobile} 
            Brand Name: ${brandName}
            email: ${email} 

            Pic Address
            address: ${address}
            Provinsi: ${detailProvinsi}
            Kota: ${detailKota}
            Kecamatan: ${selectKecamatan} 
            kode pos: ${postalcode}
            `,
            attachments: [

                {
                    path: req.file.path
                }
            ]
        }


        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.send('error')
            } else {
                console.log('Email sent: ' + info.response)
                res.send('success')
            }
        })

        try {
            const emailSend = new PIC({
                nama: picName,
                brand: brandName,
                category: category,
                email: email,
                no_telp: mobile,
                address: address,
                file: req.file.path,
                description: description,

            })
            await emailSend.save()
            res.status(200).send({
                data: emailSend,
                message: 'email terkirim ke database'
            })

        } catch (err) {
            res.status(422).send(err.message)
        }

    },
    sendEmailWithoutAttach: async (req, res, next) => {
        const {
            picName,
            mobile,
            brandName,
            email,
            address,
            detailProvinsi,
            detailKota,
            selectKecamatan,
            postalcode,
            category,
            description
        } = req.body
        const transporter = nodemailer.createTransport({
            host: "mail.mysteryboxindonesia.co.id",
            port: 587,
            secure: false, // use TLS
            auth: {
                user: "contact@mysteryboxindonesia.co.id",
                pass: "Honginterna$ional1010",
            },
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
            },
        })
        const mailOptions = {
            from: "contact@mysteryboxindonesia.co.id",
            to: 'test@mysteryboxindonesia.co.id',
            subject: `message from ${picName} for ${category}`,
            text: ` 
            Pic Information 
            Pic Name: ${picName} 
            Mobile number: ${mobile} 
            Brand Name: ${brandName}
            email: ${email} 

            Pic Address
            address: ${address}
            Provinsi: ${detailProvinsi}
            Kota: ${detailKota}
            Kecamatan: ${selectKecamatan} 
            kode pos: ${postalcode}
            `,
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
                res.send('error')
            } else {
                console.log('Email sent: ' + info.response)
                res.send('success')
            }
        })

        try {
            const emailSend = new PIC({
                nama: picName,
                brand: brandName,
                category: category,
                email: email,
                no_telp: mobile,
                address: address,
                description: description,

            })
            await emailSend.save()
            res.status(200).send({
                data: emailSend,
                message: 'email terkirim ke database'
            })

        } catch (err) {
            res.status(422).send(err.message)
        }

    }
}