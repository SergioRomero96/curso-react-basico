import { Router } from "express";
const router = Router();

import { check } from "express-validator";
import { login } from "../controllers/auth.controller";

router.post('/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    login
);

export default router;