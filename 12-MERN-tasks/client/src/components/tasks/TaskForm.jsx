import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';

const TaskForm = () => {
    // obtener el state de proyectos
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    // si no hay proyecto seleccionado
    if(!project) return null;

    return (
        <div className="formulario">
            <form>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="name"
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar Tarea"
                    />
                </div>
            </form>
        </div>

    );
}

export default TaskForm;