const express = require("express");
const router = express.Router();
const multer = require("multer");
const randomPass = require("../utils/password_generater");
const employee = require("../models/employee_model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "llamastone20@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

router.get("/", (req, res) => {
  res.send("Backend Working ");
});

router.post("/add", upload.single("image"), async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  try {
    const existingEmployee = await employee.findOne({ email: req.body.email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const saltRounds = 10;
    const myPlaintextPassword = randomPass();
    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);

    let employee_details = req.body;

    let employee_file = req.file ? req.file.path : null;

    const employee_data = new employee({
      ...employee_details,
      image: employee_file,
      passwordHash: hash,
    });
    await employee_data.save();

    //nodemailer --->>

    const htmlMessage = `
< div style="font-family: Arial, sans-serif; color:#333;">
  <h2 style="margin-top:0;">Welcome to the Company!</h2>
  
  <p>Hi <strong>${employee_data.name}</strong>,</p>
  <p>Your employee account has been successfully created.</p>

  <h3 style="margin-bottom:5px;">Login Details</h3>
  <p style="line-height:1.6;">
    <strong>Email:</strong> ${employee_data.email} <br>
    <strong>Temporary Password:</strong> ${myPlaintextPassword}
  </p>

  <p>Please log in and change your password immediately after your first login.</p>

  <p>Regards,<br><strong>HR Department</strong></p>
</div>
`;

    const plainTextMessage = `
Welcome to the Company!

Hi ${employee_data.name},

Your employee account has been successfully created.

Login Details:
Email: ${employee_data.email}
Temporary Password: ${myPlaintextPassword}

Please log in and change your password immediately after your first login.

Regards,
HR Department
`;

   

    // Wrap in an async IIFE so we can use await.
    (async () => {
      const info = await transporter.sendMail({
        from: '"HR-SYSTEMS" <llamastone20@gmail.com>',
        to: `${employee_data.email}`,
        subject: "Welcome to the Team and Your Account Details",
        text: plainTextMessage, // plain‑text body
        html: htmlMessage, // HTML body
      });

      console.log("Message sent:", info.messageId);
    })();

    //----->>>>>

    console.log(employee_data);

    res.status(200).send({ message: "Data received successfully" });
  } catch (error) {
    console.error("Error in /emp/add:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
