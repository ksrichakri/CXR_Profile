const functions = require("firebase-functions")
const nodemailer = require("nodemailer")

// Gmail SMTP transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "switchone06@gmail.com",
    pass: "hcgj qvyf frub ijjf"
  }
})

// Cloud function
exports.sendApprovalEmail = functions.https.onCall(async (data) => {

  const mailOptions = {
    from: "CXR Lab <switchone06@gmail.com>",
    to: data.email,
    subject: "CXR Equipment Request Approved",
    text: `
Hello ${data.name},

Your request for ${data.product} has been APPROVED.

Usage Time:
Start: ${data.start}
End: ${data.end}

Please collect the device from the CXR Lab.

Regards,
CXR Team
`
  }

  await transporter.sendMail(mailOptions)

  return { success: true }

})