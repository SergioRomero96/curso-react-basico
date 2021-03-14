import React, {Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta = ({savePresupuesto, saveRestante, updatePregunta}) => {
    // definir el state
    const [cantidad, saveCantidad] = useState(0);
    const [error, saveError] = useState(false);

    // Funcion que lee el presupuesto
    const definirPresupuesto = (e) => {
        saveCantidad(parseInt(e.target.value, 10));
    }

    // Submit para definir el presupuesto
    const addPresupuesto = (e) => {
        e.preventDefault();
        // Validar
        if(cantidad < 1 || isNaN(cantidad)) {
            saveError(true);
            return;
        }

        // si se pasa la validación
        saveError(false);
        savePresupuesto(cantidad);
        saveRestante(cantidad);
        updatePregunta(false);
    }

    return (
        <Fragment>
            <h2>Coloca tu presupuesto</h2>
            {error ? <Error mensaje="El presupuesto es incorrecto"/> : null}
            <form
                onSubmit={addPresupuesto}
            >
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                />
                <input
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir Presupuesto"
                />
            </form>
        </Fragment>
    );
}

Pregunta.propTypes = {
    savePresupuesto: PropTypes.func.isRequired,
    saveRestante: PropTypes.func.isRequired,
    updatePregunta: PropTypes.func.isRequired
}
 
export default Pregunta;