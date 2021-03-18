import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const ProjectItem = ({ project }) => {
    // obtener el state de proyectos
    const projectsContext = useContext(projectContext);
    const { actualProject } = projectsContext;


    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => actualProject(project.id)}
            > {project.name}
            </button>
        </li>
    );
}

export default ProjectItem;