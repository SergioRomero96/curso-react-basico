import axios from "axios";
import { createContext, useEffect, useState } from "react";

// crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {
    // state del provider
    const [idRecipe, setIdRecipe] = useState(null);
    const [data, setRecipe] = useState({});

    // una vez que tenemos una receta, llamar la api
    useEffect(() => {
        const getRecipe = async () => {
            if(!idRecipe) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;
        
            const result = await axios.get(url);
            setRecipe(result.data.drinks[0]);
        }

        getRecipe();
    }, [idRecipe])

    return (
        <ModalContext.Provider value={{
            data,
            setIdRecipe,
            setRecipe
        }}>
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;