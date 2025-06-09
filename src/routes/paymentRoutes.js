const router = require("express").Router();
const ctrl = require("../controllers/paymentController");

router.post("/", ctrl.createPayment);
router.put("/:id", ctrl.updatePayment);
router.get("/:id", ctrl.getPayment);
router.get("/user/:uid", ctrl.getPaymentsByUser);

module.exports = router;
