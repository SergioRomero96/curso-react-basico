import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default (req: Request | any, res: Response, next: NextFunction) => {
    // leer el token del header
    const token = req.header('x-auth-token');
    // revisar si no hay token
    if(!token) {
        return res.status(401).json({msg: 'No hay Token, permiso no válido'});
    }
    // validar el token
    try {
        const cifrado: any = jwt.verify(token, process.env.SECRET!);
        req.user = cifrado.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: 'Token no válido'});
    }
}