const{body}=require("express-validator");

exports.createTaskValidator=[
    body("title")
    .notEmpty()
    .withMessage("Title is required"),

    body("status")
    .optional()
    .isIn(["Pending","In Progress","Completed"])
    .withMessage("Invalid status")
];
