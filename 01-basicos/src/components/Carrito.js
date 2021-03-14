import './carrito.css'
import Product from './Product';

const Carrito = ({ carrito, addProduct }) => {
    return (
        <div className="carrito">
            <h2>Tu carrito de compras</h2>

            {carrito.length === 0
                ?
                <p>No hay elementos en el carrito</p>
                :
                carrito.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                        carrito={carrito}
                        addProduct={addProduct} />
                ))
            }
        </div>
    );
}

export default Carrito;