import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext';
import NavBar from '../layout/NavBar';
import Sidebar from '../layout/Sidebar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';

const Projects = () => {
    const authContext = useContext(AuthContext);
    const { getAuthenticatedUser } = authContext;

    useEffect(() => {
        getAuthenticatedUser();
    }, []);

    return (
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <NavBar />
                <main>
                    <TaskForm />
                    <div className="contenedor-tareas">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Projects;