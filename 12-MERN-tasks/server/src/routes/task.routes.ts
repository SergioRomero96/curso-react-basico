import { Router } from "express";
import { check } from "express-validator";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/task.controller";
import auth from "../middlewares/auth";
const router = Router();

router.post('/',
    auth,
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('project', 'El proyecto es requerido').not().isEmpty()
    ],
    createTask
);

router.get('/',
    auth,
    getTasks
);

router.put('/:id',
    auth,
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('project', 'El proyecto es requerido').not().isEmpty()
    ],
    updateTask
);

router.delete('/:id',
    auth,
    deleteTask
)

export default router;