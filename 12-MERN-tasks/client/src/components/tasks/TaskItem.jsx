import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const TaskItem = ({ task }) => {
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    // obtener values del context
    const tasksContext = useContext(TaskContext);
    const { deleteTask, getTasks, updateTask, setActualTask } = tasksContext;

    // funcion que se ejecuta cuando se elimina la tarea
    const handleDelete = id => {
        deleteTask(id, project._id);
        getTasks(project._id);
    }

    // funcion que modifica el estado
    const changeStatus = task => {
        if (task.status) {
            task.status = false;
        } else {
            task.status = true;
        }
        updateTask(task);
    }

    // agrega una tarea actual cuando lo quiere editar
    const selectTask = task => {
        setActualTask(task);
    }

    return (
        <li className="tarea sombra">
            <p>{task.name}</p>
            <div className="estado">
                {task.status
                    ? (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => changeStatus(task)}>
                            Completo
                        </button>
                    )
                    : (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => changeStatus(task)}>
                            Incompleto
                        </button>
                    )
                }
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-primario"
                    onClick={() => selectTask(task)}>
                    Editar
                </button>
                <button type="button" className="btn btn-secundario"
                    onClick={() => handleDelete(task._id)}>
                    Eliminar
                </button>
            </div>
        </li>
    );
}

export default TaskItem;