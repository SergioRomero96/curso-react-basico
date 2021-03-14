import React, { Fragment } from 'react';
import TaskItem from './TaskItem';

const TaskList = () => {
    const tasks = [
        {name: 'Elegir Plataforma', status: true},
        {name: 'Elegir Colores', status: false},
        {name: 'Elegir Hosting', status: true},
    ]

    return (
        <Fragment>
            <h2>Proyecto: Tienda Virtual</h2>
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

            <button type="button" className="btn btn-eliminar">
                Eliminar Proyecto &times;
            </button>
        </Fragment>

    );
}

export default TaskList;