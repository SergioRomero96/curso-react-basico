import React, {Fragment, useState, useEffect} from 'react';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

function App() {
  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // Citas
  const [citas, saveCitas] = useState(citasIniciales);

  // UseEffect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }

  }, [citas]);

  // Función que tome las citas actuales y agregue la nueva
  const createCita = (cita) => {
    saveCitas([...citas, cita]);
  }

  // Función que elimina una cita por su id
  const deleteCita = (id) => {
    console.log(id);
    const newCitas = citas.filter(cita => cita.id !== id);
    saveCitas(newCitas);
  }
  
  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              createCita={createCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                deleteCita={deleteCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
    
  );
}

export default App;
