import React, {useState, useEffect } from 'react';
import ControlPresupuesto from './components/ControlPresupuesto';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import Pregunta from './components/Pregunta';

function App() {
  // definir el state
  const [presupuesto, savePresupuesto] = useState(0);
  const [restante, saveRestante] = useState(0);
  const [mostrarPregunta, updatePregunta] = useState(true);
  const [gastos, saveGastos] = useState([]);
  const [gasto, saveGasto] = useState({});
  const [crearGasto, saveCrearGasto] = useState(false);

  // UseEffect que actualiza el restante

  useEffect(() => {
    if(crearGasto) {

      // agrega el nuevo presupuesto
      saveGastos([
        ...gastos,
        gasto
      ]);

      // resta del presupuesto actual
      const presupuestoRestante = restante - gasto.cantidad;
      saveRestante(presupuestoRestante);

      saveCrearGasto(false);
    }
  }, [gasto, crearGasto, gastos, restante])


  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
          {mostrarPregunta ? (
            <Pregunta
              savePresupuesto={savePresupuesto}
              saveRestante={saveRestante}
              updatePregunta={updatePregunta}
            />
          ) : (
            <div className="row">
              <div className="one-half column">
                <Formulario
                  saveGasto={saveGasto}
                  saveCrearGasto={saveCrearGasto}
                />
              </div>
              <div className="one-half column">
                <Listado
                  gastos={gastos}
                />

                <ControlPresupuesto
                  presupuesto={presupuesto}
                  restante={restante}
                />
              </div>
            </div>
          )}

          

          
        </div>
      </header>
    </div>
  );
}

export default App;
