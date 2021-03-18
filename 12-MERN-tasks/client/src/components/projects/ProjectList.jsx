import React, { useContext, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import ProjectItem from './ProjectItem';

const ProjectList = () => {
    // extraer proyectos de state inicial
    const projectsContext = useContext(projectContext);
    const {projects, getProjects} = projectsContext;

    // obtener proyectos cuando carga el componente
    useEffect(() => {
        getProjects();
    }, []);

    // revisar si proyectos tiene contenido
    if(projects.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">
            {projects.map(project => (
                <ProjectItem
                    key={project.id}
                    project={project}
                />
            ))}
        </ul>
    );
}
 
export default ProjectList;