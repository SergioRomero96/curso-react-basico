import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const ProjectItem = ({ project }) => {
    // obtener el state de proyectos
    const projectsContext = useContext(projectContext);
    const { actualProject } = projectsContext;

    // obtener la función del context de tarea
    const tasksContext = useContext(TaskContext);
    const {getTasks}  = tasksContext;

    const selectProject = projectId => {
        actualProject(projectId); // setea el proyecto actual
        getTasks(projectId); // filtrar las tareas cuando se de click
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project._id)}
            > {project.name}
            </button>
        </li>
    );
}

export default ProjectItem;