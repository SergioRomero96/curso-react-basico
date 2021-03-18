import React, { Fragment, useContext, useState } from 'react';
import projectContext from '../../context/projects/projectContext';

const ProjectNew = () => {
    // Obtener el state del formulario
    const projectsContext = useContext(projectContext);
    const { form, formError, showForm, addProject, showError } = projectsContext;

    // state para proyecto
    const [project, setProject] = useState({
        name: ''
    });

    // extraer el nombre del proyecto
    const { name } = project;

    // lee los contenidos del input
    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    }

    // cuando el usuario envia un proyecto
    const onSubmitProject = e => {
        e.preventDefault();

        // validar el proyecto
        if(name === ''){
            showError();
            return;
        }

        // agregar al state
        addProject(project);

        // reiniciar el form
        setProject({
            name: ''
        })

    }

    // mostrar el formulario
    const onShowForm = () => {
        showForm();
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onShowForm}
            >
                Nuevo Proyecto
            </button>
            {form ? (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProject}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="name"
                        value={name}
                        onChange={onChangeProject}
                    />
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"
                    />
                </form>
            ) : null}

            {formError ? (
                <p className="mensaje error">El nombre del proyecto es obligatorio</p>
            ) : null }
        </Fragment>

    );
}

export default ProjectNew;