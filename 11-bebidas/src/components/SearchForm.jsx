import React, { useContext, useState } from 'react';
import { CategoriesContext } from '../context/CategoriesContext';
import { RecipesContext } from '../context/RecipesContext';

const SearchForm = () => {
    const [search, setSearch] = useState({
        name: '',
        category: ''
    });

    const {categories} = useContext(CategoriesContext);
    const {searchRecipes, setConsult} = useContext(RecipesContext);

    // funcion para leer los contenidos
    const getRecipeData = e => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    return (
        <form className="col-md-12" onSubmit={e => {
            e.preventDefault();
            if(!search.name && !search.category) return;
            searchRecipes(search);
            setConsult(true);
            }}>
            <fieldset className="text-center">
                <legend>Busca bebidas pr Categoría o Ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="form-group col-md-4">
                    <input name="name" className="form-control" type="text"
                        placeholder="Buscar por Ingrediente"
                        onChange={getRecipeData}/>
                </div>
                <div className="form-group col-md-4">
                    <select className="form-control" name="category"
                        onChange={getRecipeData}>
                        <option value="">-- Selecciona Categoría --</option>
                        {categories.map(category => (
                            <option
                                key={category.strCategory}
                                value={category.strCategory}
                            >
                                {category.strCategory}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4">
                    <input type="submit" className="btn btn-block btn-primary"
                        value="Buscar bebidas"
                    />
                </div>
            </div>
        </form>
    );
}
 
export default SearchForm;