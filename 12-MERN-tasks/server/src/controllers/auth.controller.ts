import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // extraer el email y password
    const { email, password } = req.body;
    try {
        // Revisar que sea usuario registrado
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        // revisar el password
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return res.status(400).json({ msg: 'Password Incorrecto' });
        }

        // si todo es correcto craer y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        };
        // firmar el JWT
        jwt.sign(payload, process.env.SECRET!, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });
    } catch (error) {
        console.log(error);
    }
}

// obtiene el usuario autenticado
export const getAuthenticatedUser = async (req: Request | any, res: Response) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password');
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}