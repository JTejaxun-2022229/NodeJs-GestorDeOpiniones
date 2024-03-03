import { Router } from "express";
import { check } from "express-validator";
import { postPublication } from "./publication.controller.js";
import { validationFields } from "../middlewares/validation-fields.js";
import { validationJWT } from "../middlewares/validation-jwt.js";


const router = Router();

router.post('/',
    [
        validationJWT,
        validationFields
    ], postPublication
);

//router.get('/', publicationGet);

router.get(
    '/:id',
    [
        validationJWT,
        validationFields
    ], //getPublicationById
);

router.delete('/:id', [validationJWT, validationFields], //deletePublication
);


export default router;