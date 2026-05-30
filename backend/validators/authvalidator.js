const {body}=require("express-validator");

exports.registerValidator=[
    body("email")
    .isEmail()
    .withMessage("Valid email required"),
    body("password")
    .isLength({min:8})
    .withMessage("Password must be atleast 8 characters")
];

exports.loginValidator=[
    body("email")
    .isEmail()
    .withMessage("Valid email required"),
    body("password")
    .notEmpty()
    .withMessage("Password required")
];