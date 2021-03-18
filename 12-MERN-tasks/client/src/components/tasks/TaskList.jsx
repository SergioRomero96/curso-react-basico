import React, { Fragment, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskItem from './TaskItem';

const TaskList = () => {
    // obtener el state de proyectos
    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;

    // si no hay proyecto seleccionado
    if(!project) return <h2>Selecciona un proyecto</h2>;

    const tasks = [
        {name: 'Elegir Plataforma', status: true},
        {name: 'Elegir Colores', status: false},
        {name: 'Elegir Hosting', status: true},
    ]

    // Elimina un proyecto
    const onDelete = () => {
        deleteProject(project.id);
    }

    return (
        <Fragment>
            <h2>Proyecto: {project.name}</h2>
            <ul className="listado-tareas">
                {tasks.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : tasks.map(task => (
                        <TaskItem
                            task={task}
                        />
                    ))
                }
            </ul>

            <button type="button" className="btn btn-eliminar"
                onClick={onDelete}>
                Eliminar Proyecto &times;
            </button>
        </Fragment>

    );
}

export default TaskList;