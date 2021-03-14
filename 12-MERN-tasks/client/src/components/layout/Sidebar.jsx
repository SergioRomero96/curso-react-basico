import React from 'react';
import ProjectList from '../projects/ProjectList';
import ProjectNew from '../projects/ProjectNew';

const Sidebar = () => {
    return (
        <aside>
            <h1>MERN <span>Tasks</span></h1>
            <ProjectNew/>

            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <ProjectList/>
            </div>
        </aside>
    );
}
 
export default Sidebar;