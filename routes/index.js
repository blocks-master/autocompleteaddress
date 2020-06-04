const express = require("express");
const { check, validationResult } = require("express-validator");
let creditcard = require("creditcard.js");

const router = express.Router();

router.get("/", async (req, res) => {
	res.render("auto-complete", { creditError: '' });
});

// router.post("/", [ check("credit").isCreditCard().withMessage("Must provide a valid credit card") ], (req, res) => {
// 	const errors = validationResult(req);
// 	if (!errors.isEmpty()) {
// 		return res.status(422).json({ errors: errors.array() });
// 	}
// 	const credit = req.body.credit;
// });

router.post("/", (req, res) => {
	const credit = req.body.credit;
	let obj = new creditcard();
	if (obj.isValid(credit)) {
		res.render("auto-complete", { creditError: '' });
	}
	else {
		res.render("auto-complete", { creditError: "Invalid credit card number" });
	}
});
module.exports = router;
