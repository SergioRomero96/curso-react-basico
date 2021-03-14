import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  scroll: { maxHeight: "500px", overflowY: "scroll", overflowX: "none" },
}));

const RecipeItem = ({ recipe }) => {
  // configuración del modal de material ui
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // extraer los valores del context
  const { data, setIdRecipe, setRecipe } = useContext(ModalContext);

  // Muestra y formatea los ingredientes
  const showIngredients = (data) => {
    let ingredients = [];
    for (let i = 1; i < 16; i++) {
      if (data[`strIngredient${i}`]) {
        ingredients.push(
          <li>
            {data[`strIngredient${i}`]} {data[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{recipe.strDrink}</h2>
        <img
          className="card-img-top"
          src={recipe.strDrinkThumb}
          alt={`Imagen de ${recipe.strDrink}`}
        />
        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              setIdRecipe(recipe.idDrink);
              handleOpen();
            }}
          >
            Ver receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              setIdRecipe(null);
              setRecipe({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <div className={classes.scroll}>
                <h2>{data.strDrink}</h2>
                <h3 className="mt-4">Instrucciones</h3>
                <p>{data.strInstructions}</p>
                <img className="img-fluid my-4" src={data.strDrinkThumb} />

                <h3>Ingredientes y cantidades</h3>
                <ul>{showIngredients(data)}</ul>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default RecipeItem;
