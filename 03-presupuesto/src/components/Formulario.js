import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import shortId from 'shortid';

const Formulario = ({saveGasto, saveCrearGasto}) => {
    const [nombre, saveNombre] = useState('');
    const [cantidad, saveCantidad] = useState(0);
    const [error, saveError] = useState(false);

    // cuando el usuario agrega un gasto
    const addGasto = e => {
        e.preventDefault();
        // validar
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
            saveError(true);
            return;
        }

        // construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortId.generate()
        }
        console.log(gasto);

        // pasar el gasto al componente principal
        saveGasto(gasto);
        saveCrearGasto(true);

        // resetear el form
        saveNombre('');
        saveCantidad(0);
    }

    return (
        <form
            onSubmit={addGasto}
        >
            <h2>Agrega tus gastos aquí</h2>

            {error ? 
                <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto"/> : null
            }

            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => saveNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => saveCantidad(parseInt(e.target.value, 10))}
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    );
}

Formulario.propTypes = {
    saveGasto: PropTypes.func.isRequired,
    saveCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;