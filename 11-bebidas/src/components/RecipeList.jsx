import React, { useContext } from 'react';
import { RecipesContext } from '../context/RecipesContext';
import RecipeItem from './RecipeItem';

const RecipeList = () => {
    // extraer las recetas
    const {recipes} = useContext(RecipesContext);

    return (
        <div className="row mt-5">
            {recipes.map(recipe => (
                <RecipeItem key={recipe.idDrink} recipe={recipe}/>
            ))}
        </div>
    );
}
 
export default RecipeList;