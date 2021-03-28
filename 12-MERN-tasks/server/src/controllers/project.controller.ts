import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Project from "../models/project";

export const createProject = async (req: Request | any, res: Response) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Crear nuevo proyecto
        const project = new Project(req.body);
        // setear el usuario via JWT
        project.user = req.user.id;
        // guardar proyecto
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

export const getProjects = async (req: Request | any, res: Response) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

export const updateProject = async (req: Request | any, res: Response) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // extraer la información del proyecto
    const { name } = req.body;
    const newProject: any = {};
    if (name) {
        newProject.name = name;
    }
    try {
        // revisar el ID
        console.log(req.params.id);
        let project = await Project.findById(req.params.id);
        // si el proyecto existe o no
        if (!project) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        // verificar el usuario del proyecto
        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        // actualizar
        project = await Project.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: newProject },
            { new: true }
        );
        res.json({ project });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

export const deleteProject = async (req: Request | any, res: Response) => {
    try {
        // revisar el ID
        console.log(req.params.id);
        let project = await Project.findById(req.params.id);
        // si el proyecto existe o no
        if (!project) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        // verificar el usuario del proyecto
        if (project.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        // eliminar
        await Project.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Proyecto eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}