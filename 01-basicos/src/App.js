import React, { Fragment, useState } from 'react';
import Carrito from './components/Carrito';
import Footer from './components/Footer';
import Header from './components/Header';
import Product from './components/Product';

function App() {

  // Create product list
  const [products, saveProducts] = useState([
    { id: 1, name: 'Camisa ReactJS', price: 50 },
    { id: 2, name: 'Camisa VueJS', price: 40 },
    { id: 3, name: 'Camisa NodeJS', price: 30 },
    { id: 4, name: 'Camisa Angular', price: 20 },
  ]);

  // State for a shopping cart
  const [carrito, addProduct] = useState([]);

  // Get date
  const date = new Date().getFullYear();
  return (
    <Fragment>
      <Header
        titulo='Tienda Virtual' />

      <h1>Lista de Productos</h1>
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
          products={products}
          carrito={carrito}
          addProduct={addProduct} />
      ))}

      <Carrito
        carrito={carrito}
        addProduct={addProduct} />
      <Footer date={date} />
    </Fragment>
  );
}

export default App;
