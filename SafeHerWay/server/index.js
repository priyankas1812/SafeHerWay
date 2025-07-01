import express from 'express';
import nodemailer from 'nodemailer'

let app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ "Hello": "World" })
})

const transporter = nodemailer.createTransport({
    service: 'gmail', // or another provider
    auth: {
        user: "patientptest@gmail.com",
        pass: "pgfw noar jhit skgv",
    },
});

// Send email
const sendOTPEmail = async (to, otp) => {
    const mailOptions = {
        from: `"OTP Service" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Your OTP Code',
        text: `Your  OTP code is: ${otp}. It will expire in 5 minutes.`,
    };

    return transporter.sendMail(mailOptions);
};

const otpStore = new Map();

app.post('/otpGenetate', (req, res) => {

    console.log(req.body)

    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = Date.now() + 1 * 60 * 1000; // 5 mins

    otpStore.set(email, { otp, expiresAt });

    console.log(`OTP for ${email}: ${otp}`); // Simulate sending OTP

    sendOTPEmail(email, otp);

    res.json({ message: 'OTP sent successfully' });
})

app.post('/otp/verify', (req, res) => {
    const { email, otp } = req.body;

    let record = otpStore.get(email);

    if(!record) {
        // res failed, no otp Generated
    }

    if(!otp || !email) {
        // res failed, otp and email required
    }

    if((email && otp) && (Date.now() > record.expiresAt)) {
        // res failed, otp Expired
        otpStore.delete(email)
    }

    if(otp !== record.otp) {
        // res failed, Invalid Otp
    }

    if(record && otp === record.otp) {
        return res.json({ "message": "success" })
    }

})

app.listen(PORT, () => {
    console.log("[STARTED] - Server start listening on port: ", PORT)
})