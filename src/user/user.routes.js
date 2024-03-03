import { Router } from "express";
import { check } from "express-validator";
import { getUserById, userGet, userPost, userPut } from "./user.controller.js";
import { existEmail, existUserById } from "../helpers/db-validator.js"; 
import { validationFields } from "../middlewares/validation-fields.js";
import { validationJWT } from "../middlewares/validation-jwt.js";

const router = Router();

router.get("/", userGet);

router.get("/:id",
    [
        check("id", "ID is invalid").isMongoId(),
        validationFields
    ],
    getUserById
);

router.post(
    "/",
    [
        check("name", "Name is neccesary").not().isEmpty(),
        check("email", "This is an invalid email").isEmail(),
        check("email").custom(existEmail),
        check("password", "Password must be have 6 characters").isLength({min: 6,}),
        validationFields,
    ], 
    userPost
);

router.put(
    "/:id",
    [
        validationJWT,
        check("id", "ID is invalid").isMongoId(),
        check("id").custom(existUserById),
        validationFields
    ],
    userPut
);

export default router;
