import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from '../../context/authentication/authContext';

const NewAccount = (props) => {
  // extraer los valores del context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, authenticated, registerUser } = authContext;

  // en caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
  useEffect(() => {
    if (authenticated) {
      props.history.push('/projects');
    }
    if (message) {
      showAlert(message.msg, message.category);
    }
    // eslint-disable-next-line
  }, [message, authenticated, props.history]);

  // state para iniciar sesión
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  // extraer de usuario
  const { name, email, password, confirm } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // cuando el usuario quiere iniciar sesión
  const onSubmit = (e) => {
    e.preventDefault();
    // validar que no haya campos vacios
    if (name.trim() === '' || email.trim() === ''
      || password.trim() === '' || confirm.trim() === '') {
      showAlert('Todos los campos son obligatorios', 'alerta-error');
      return;
    }
    // password minimo de 6 caracteres
    if (password.length < 6) {
      showAlert('El password debe ser de al menos 6 caracteres', 'alerta-error');
      return;
    }
    // los 2 passwords son iguales
    if (password !== confirm) {
      showAlert('Los password no son iguales', 'alerta-error');
      return;
    }
    // pasarlo al action
    registerUser({ name, email, password });
  };

  return (
    <div className="form-usuario">
      { alert ?
        (<div className={`alerta ${alert.category}`}>{alert.msg}</div>)
        : null
      }
      <div className="contenedor-form sombra-dark">
        <h1>Crear una cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu Nombre"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="confirm">Confirmar Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="Repite tu Password"
              value={confirm}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default NewAccount;
