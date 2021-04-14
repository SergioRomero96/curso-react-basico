import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from '../../context/authentication/authContext';

const Login = (props) => {
  // extraer los valores del context
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { message, authenticated, login } = authContext;

  // en caso de que password o usuario no exista
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
    email: "",
    password: "",
  });

  // extraer de usuario
  const { email, password } = user;


  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  // cuando el usuario quiere iniciar sesión
  const onSubmit = e => {
    e.preventDefault();
    // validar que no haya campos vacios
    if (email.trim() === '' || password.trim() === '') {
      showAlert('Todos los campos son obligatorios', 'alerta-error');
    }
    // pasarlo al action
    login({ email, password });
  }

  return (
    <div className="form-usuario">
      { alert ?
        (<div className={`alerta ${alert.category}`}>{alert.msg}</div>)
        : null
      }
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar sesión</h1>
        <form onSubmit={onSubmit}>
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>

        <Link to={'/new-account'} className="enlace-cuenta">
          Crear Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
