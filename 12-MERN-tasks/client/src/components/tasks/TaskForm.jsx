import React, { useContext, useEffect, useState } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const TaskForm = () => {
    // obtener el state de proyectos
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    // obtener value del context
    const tasksContext = useContext(TaskContext);
    const { taskError, selectedTask, addTask, validateTask, getTasks, updateTask, cleanTask } = tasksContext;

    // Effect que detecta si hay na tarea seleccionada
    useEffect(() => {
        if (selectedTask !== null) {
            setTask(selectedTask);
        } else {
            setTask({
                name: ''
            })
        }
    }, [selectedTask]);

    // state del formulario
    const [task, setTask] = useState({
        name: ''
    })

    //extraer el nombre de la tarea;
    const { name } = task;

    // si no hay proyecto seleccionado
    if (!project) return null;

    // leer los valores del formulario
    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        // validar
        if (name.trim() === '') {
            validateTask();
            return;
        }

        // si es edicion o si es nueva tarea
        if(selectedTask === null) {
            // agregar la nueva tarea al state de tareas
            task.project = project._id;
            addTask(task);
        } else {
            // actualiza tarea existente
            updateTask(task);
            // elimina tarea seleccionada del state
            cleanTask();
        }


        // obtener las tareas del proyecto seleccionado
        getTasks(project._id);

        // reiniciar el form
        setTask({
            name: ''
        })
    }
    return (
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={selectedTask ? 'Editar tarea' : 'Agregar tarea'}
                    />
                </div>
            </form>
            {taskError ?
                <p className="mensaje error">El nombre de la tarea es obligatorio</p>
                : null
            }
        </div>

    );
}

export default TaskForm;