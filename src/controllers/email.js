const mongoose = require("mongoose")
const nodemailer = require('nodemailer');
const PIC = mongoose.model('pic')
const Subs = mongoose.model('subs')


module.exports = {
    sendSubs: async (req, res, next) => {
        const { email } = req.body
        try {
            const doc = new Subs.find({
                email
            })
            await doc.save()
            res.status(200).send('email terkirim ke database')
        } catch (error) {
            res.status(422).send(err.message)
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

        } = req.body
        console.log(picName,
            mobile,
            brandName,
            email,
            address,
            detailProvinsi,
            detailKota,
            selectKecamatan,
            postalcode,
        )
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
            subject: `message from ${picName}`,
            text: `
            Pic Information 
            Pic Name: ${picName} 
            Mobile number : ${mobile} 
            Brand Name: ${brandName} 
            email : ${email} 
            
            Pic Address 
            address : ${address} 
            Provinsi : ${detailProvinsi}
            Kota : ${detailKota} 
            Kecamatan : ${selectKecamatan} 
            kode pos : ${postalcode} 
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
                email: email,
                no_telp: mobile,
                address: address
            })
            await emailSend.save()
            res.status(200).send('email terkirim ke database')
        } catch (err) {
            res.status(422).send(err.message)
        }

    }
}