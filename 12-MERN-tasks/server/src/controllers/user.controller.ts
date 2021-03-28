import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // extraer email y password
    const { email, password } = req.body;
    try {
        // revisar que el usuario sea unico
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                msg: 'El usuario ya existe'
            });
        }
        // crea el nuevo usuario
        user = new User(req.body);
        // hashear el password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        // guardar usuario
        await user.save();
        // craer y firmar el JWT
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
        res.status(400).send('Hubo un error');
    }
}

export const getUserById = (req: Request, res: Response) => {

}

export const getAllUser = (req: Request, res: Response) => {

}