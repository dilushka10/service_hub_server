const router = require("express").Router();
const ctrl = require("../controllers/requestController");

router.post("/", ctrl.createRequest);
router.get("/:id", ctrl.getRequest);
router.put("/:id", ctrl.updateRequest);
router.delete("/:id", ctrl.deleteRequest);

router.get("/customer/:uid", ctrl.getRequestsByCustomer);
router.get("/provider/:uid", ctrl.getRequestsByProvider);

module.exports = router;
