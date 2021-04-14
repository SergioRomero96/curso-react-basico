import React, { useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import projectContext from '../../context/projects/projectContext';
import ProjectItem from './ProjectItem';
import AlertContext from '../../context/alerts/alertContext';

const ProjectList = () => {
    // extraer proyectos de state inicial
    const projectsContext = useContext(projectContext);
    const { projects, message, getProjects } = projectsContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    // obtener proyectos cuando carga el componente
    useEffect(() => {
        // si hay un error
        if (message) {
            showAlert(message.msg, message.category);
        }

        getProjects();
        // eslint-disable-next-line
    }, [message]);

    // revisar si proyectos tiene contenido
    if (projects.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">
            {alert ? (
                <div className={`alerta ${alert.category}`}>{alert.msg}</div>
            ) : null}

            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
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