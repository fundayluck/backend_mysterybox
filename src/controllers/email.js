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
            address1,
            detailProvinsi1,
            detailKota1,
            selectKecamatan1,
            postalcode1
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
            address1,
            detailProvinsi1,
            detailKota1,
            selectKecamatan1,
            postalcode1)
        const transporter = nodemailer.createTransport({
            host: "mail.mysteryboxindonesia.co.id",
            port: 465,
            secure: true, // use TLS
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
            to: 'afandayul@gmail.com',
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
            
            Vending Machine Location
            address : ${address1} 
            Provinsi : ${detailProvinsi1}
            Kota : ${detailKota1} 
            Kecamatan : ${selectKecamatan1} 
            kode pos : ${postalcode1} `,

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