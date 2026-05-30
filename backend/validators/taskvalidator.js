const{body}=require("express-validator");

exports.createTaskValidator=[
    body("title")
    .notEmpty()
    .withMessage("Title is required"),

    body("status")
    .optional()
    .isIn(["Pending","In progress","Completed"])
    .withMessage("Invalid status")
];