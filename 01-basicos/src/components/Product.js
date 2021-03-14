const Product = ({ product, carrito, addProduct, products }) => {
    const { name, price, id } = product;

    // add product to cart
    const selectProduct = (id) => {
        console.log('comprando...', id);
        const product = products.find(p => p.id === id);
        addProduct([
            ...carrito,
            product
        ])
    }

    // delete product to cart
    const deleteProduct = (id) => {
        const products = carrito.filter(product => product.id !== id);

        // modify the state of products
        addProduct(products);
    }
    return (
        <div>
            <h2>{name}</h2>
            <p>${price}</p>

            {products
                ?
                (
                    <button
                        type="button"
                        onClick={() => selectProduct(id)}>Comprar</button>
                )
                :
                (
                    <button
                        type="button"
                        onClick={() => deleteProduct(id)}>Eliminar</button>
                )
            }
        </div>
    );
}

export default Product;