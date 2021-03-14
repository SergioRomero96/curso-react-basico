import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const RecipesContext = createContext();

const RecipesProvider = (props) => {
    const [recipes, setRecipes] = useState([]);
    const [search, searchRecipes] = useState({
        name: '',
        category: ''
    });

    const [consult, setConsult] = useState(false);

    const {name, category} = search;

    useEffect(() => {
        if(consult) {
            const getRecipes = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`
                const result = await axios.get(url);
                // console.log(result.data.drinks);
                setRecipes(result.data.drinks);
            }

            getRecipes();
        }
        
    }, [search]);

    return (
        <RecipesContext.Provider value={{
            recipes,
            searchRecipes,
            setConsult
        }}>
            {props.children}
        </RecipesContext.Provider>
    );
}
 
export default RecipesProvider;