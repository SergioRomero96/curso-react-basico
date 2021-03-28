import { Router } from "express";
import { check } from "express-validator";
import { createProject, deleteProject, getProjects, updateProject } from "../controllers/project.controller";
import auth from "../middlewares/auth";
const router = Router();

router.post('/',
    auth,
    [
        check('name', 'El nombre del proyecto es requerido').not().isEmpty()
    ],
    createProject
);

router.get('/',
    auth,
    getProjects
);

router.put('/:id',
    auth,
    [
        check('name', 'El nombre del proyecto es requerido').not().isEmpty()
    ],
    updateProject
);

router.delete('/:id',
    auth,
    deleteProject
);

export default router;