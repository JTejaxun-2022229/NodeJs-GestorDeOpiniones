import { Router } from "express";
import { check } from "express-validator";
import { getUserById, userGet, userPost, userPut } from "./user.controller.js";
import { validationFields } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validation-jwt.js";

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
        check("email", "This email is invalid").isEmail(),
        validationFields
    ]
);

router.put(
    "/:id",
    [
        check("id", "ID is invalid").isMongoId(),
        validationFields
    ],
    userPut
);
