import { Router } from "express";
const router = Router();

import { check } from "express-validator";
import { getAuthenticatedUser, login } from "../controllers/auth.controller";
import auth from "../middlewares/auth";

// iniciar sesión
router.post('/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    login
);

router.get('/',
    auth,
    getAuthenticatedUser
)

export default router;