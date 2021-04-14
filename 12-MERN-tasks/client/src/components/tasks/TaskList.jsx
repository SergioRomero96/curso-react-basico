import React, { Fragment, useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import TaskItem from './TaskItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TaskList = () => {
    // obtener el state de proyectos
    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;

    // obtener las tareas del context de tarea
    const tasksContext = useContext(TaskContext);
    const { projectTasks } = tasksContext;

    // si no hay proyecto seleccionado
    if (!project) return <h2>Selecciona un proyecto</h2>;

    // Elimina un proyecto
    const onDelete = () => {
        deleteProject(project._id);
    }

    return (
        <Fragment>
            <h2>Proyecto: {project.name}</h2>
            <ul className="listado-tareas">
                {projectTasks.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    :
                    <TransitionGroup>
                        {projectTasks.map(task => (
                            <CSSTransition
                                key={task._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <TaskItem
                                    task={task}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
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