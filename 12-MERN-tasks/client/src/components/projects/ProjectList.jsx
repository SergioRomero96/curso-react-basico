import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import projectContext from '../../context/projects/projectContext';
import ProjectItem from './ProjectItem';

const ProjectList = () => {
    // extraer proyectos de state inicial
    const projectsContext = useContext(projectContext);
    const { projects, getProjects } = projectsContext;

    // obtener proyectos cuando carga el componente
    useEffect(() => {
        getProjects();
        // eslint-disable-next-line
    }, []);

    // revisar si proyectos tiene contenido
    if (projects.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project.id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <ProjectItem

                            project={project}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ProjectList;