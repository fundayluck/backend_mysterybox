const nodemailer = require('nodemailer');

module.exports = {
    sendEmail: (req, res, next) => {
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
    }
}