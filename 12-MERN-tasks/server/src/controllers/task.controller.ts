import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Project from "../models/project";
import Task from "../models/task";

export const createTask = async (req: Request | any, res: Response) => {
    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // extraer el proyecto y comprobar si existe
    const { project } = req.body;
    try {
        const projectDB = await Project.findById(project);
        // si el proyecto existe o no
        if (!projectDB) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        // verificar el usuario del proyecto
        if (projectDB.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        // crear la tarea
        const task = new Task(req.body);
        await task.save();
        res.json({ task });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

export const getTasks = async (req: Request | any, res: Response) => {

    try {
        // extraer el proyecto y comprobar si existe
        const { project } = req.query;
        const projectDB = await Project.findById(project);
        // si el proyecto existe o no
        if (!projectDB) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        // verificar el usuario del proyecto
        if (projectDB.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // obtener las tareas por proyecto
        const tasks = await Task.find({ project }).sort({ createdAt: -1 });
        res.json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }

}

export const updateTask = async (req: Request | any, res: Response) => {
    try {
        // extraer el proyecto y comprobar si existe
        const { project, name, status } = req.body;
        // si la tarea existe o no
        let taskExists = await Task.findById(req.params.id);
        if (!taskExists) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }

        // extraer proyecto
        const projectDB = await Project.findById(project);

        // verificar el usuario del proyecto
        if (projectDB!.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        // crear un objeto con la nueva información
        const newTask: any = {};
        newTask.name = name;
        newTask.status = status;

        taskExists = await Task.findByIdAndUpdate(
            { _id: req.params.id }, newTask, { new: true }
        )
        res.json({ taskExists })
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

export const deleteTask = async (req: Request | any, res: Response) => {
    try {
        // extraer el proyecto y comprobar si existe
        const { project } = req.query;
        // si la tarea existe o no
        let taskExists = await Task.findById(req.params.id);
        if (!taskExists) {
            return res.status(404).json({ msg: 'No existe esa tarea' });
        }

        // extraer proyecto
        const projectDB = await Project.findById(project);

        // verificar el usuario del proyecto
        if (projectDB!.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        // eliminar
        await Task.findByIdAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea Eliminada' })
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}