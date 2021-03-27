import { Router } from 'express';
const router = Router();

import { createUser, getUserById, getAllUser } from '../controllers/user.controller';
import { check } from "express-validator";

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    createUser
);
router.get('/', getUserById);
router.get('/:id', getAllUser);

export default router;