const nodemailer = require("nodemailer");

// Use your Gmail or another SMTP provider
const transporter = nodemailer.createTransport({
  service: "gmail", // or 'Mailgun', 'SendGrid', etc.
  auth: {
    user: 'help.infinova@gmail.com', // your email
    pass: 'vuth tpfj cfyu ohtq', // app password or SMTP password
  },
});

/**
 * Send an email using the configured transporter
 */
async function sendEmail({ to, subject, html }) {
  const mailOptions = {
    from: `"Service Connect" <noreply@servicehub.lk`,
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
}

async function sendPaymentReceiptEmail({ to, name, amount, method, requestId }) {
  const mailOptions = {
    from: `"YourApp Payments" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Payment Confirmation",
    html: `
      <h2>Payment Successful</h2>
      <p>Hi ${name},</p>
      <p>Thank you for your payment.</p>
      <ul>
        <li><strong>Request ID:</strong> ${requestId}</li>
        <li><strong>Amount Paid:</strong> LKR ${amount}</li>
        <li><strong>Payment Method:</strong> ${method}</li>
      </ul>
      <p>We appreciate your business!</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendEmail , sendPaymentReceiptEmail};
