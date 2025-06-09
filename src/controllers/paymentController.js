const service = require("../services/paymentService");
const { getDateTime } = require("../utils/dateTime");
const { sendPaymentReceiptEmail } = require("../utils/mailer");

exports.createPayment = async (req, res) => {
  try {
    const payment = await service.createPayment(req.body);
    res.status(201).json({ message: "Payment created", ...payment });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { payment_status, payment_info, amount, userEmail, userName, payment_method, requestId } = req.body;

    const payment = await service.updatePayment(req.params.id, {
      payment_status,
      payment_info,
      updatedAt: getDateTime,
    });

    // ✅ Send confirmation email after successful payment
    if (payment_status === "paid") {
      await sendPaymentReceiptEmail({
        to: userEmail,
        name: userName,
        amount,
        method: payment_method,
        requestId,
      });
    }

    res.json({ message: "Payment updated and email sent", ...payment });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await service.getPayment(req.params.id);
    res.json(payment);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

exports.getPaymentsByUser = async (req, res) => {
  try {
    const payments = await service.getPaymentsByUser(req.params.uid);
    res.json(payments);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
