import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import MetaImage from '../legacy/MetaImage';
import Dialog from './Dialog';
import ProductDetails from './ProductDetails.';

export const Product = () => {
  const { dispatch, state } = useContext(AppContext);
  const { selected: product, cart } = state;
  // check if product is in cart - Product ID should be used. otherwise see below
  // const productInCart = cart.find((cartItem) => {
  //   return cartItem.name === product.name;
  // })
  //   ? true
  //   : false;

  const productInCart = useMemo(() => {
    return cart.find((cartItem) => {
      return cartItem.name === product.name;
    })
      ? true
      : false;
  }, [cart, product.name]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigateHome = () => {
    dispatch({
      type: 'setScreen',
      payload: 'home',
    });

    dispatch({
      type: 'setSelected',
      payload: null,
    });
  };

  const navigateToCart = () => {
    dispatch({
      type: 'setScreen',
      payload: 'cart',
    });
  };

  const addToCart = () => {
    dispatch({
      type: 'addToCart',
      payload: product,
    });
    setIsDialogOpen(true);
  };

  const removeFromCart = () => {
    dispatch({
      type: 'removeFromCart',
      payload: product,
    });
  };
  return (
    <section className="row">
      <div className="col-12 mb-4 d-flex justify-content-between">
        <h2>{product.name}</h2>
        <button
          className="btn btn-outline-warning btn-sm me-2"
          title="Back to main listing"
          onClick={navigateHome}>
          Back!
        </button>
      </div>

      <div className="col-12 mb-4 text-center">
        <MetaImage term={product.name} />
      </div>
      <div className="col-12 mb-4">
        <h5 className="mb-2">Specs</h5>
        <ProductDetails product={product} />
      </div>
      <div className="col-12 col-md-6 offset-md-3 d-flex justify-content-between">
        <button
          className="btn btn-outline-warning flex-grow-1 me-2"
          title="Back to main listing"
          onClick={navigateHome}>
          Back!
        </button>
        <button
          className="btn btn-warning btn-xl flex-grow-1"
          title={`Add ${product.name} to cart`}
          type="button"
          onClick={() => {
            productInCart ? removeFromCart() : addToCart();
          }}>
          {productInCart
            ? 'remove from cart'
            : `add to cart (${product.cost_in_credits})`}
        </button>
      </div>
      <Dialog
        show={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}>
        <div className="alert alert-success">
          {product.name} ({product.cost_in_credits}) added to cart
        </div>

        <div className="d-flex justify-content-between mt-6">
          <button
            className="btn btn-secondary btn-sm"
            title="see cart"
            type="button"
            onClick={navigateToCart}>
            see cart
          </button>
          <button
            className="btn btn-secondary btn-sm"
            title="continue shopping"
            type="button"
            onClick={navigateHome}>
            continue shopping
          </button>
        </div>

        <div className="text-end mt-2">
          <button
            className="btn btn-danger btn-xl"
            type="button"
            title="close"
            onClick={() => {
              setIsDialogOpen(false);
            }}>
            Close
          </button>
        </div>
      </Dialog>
    </section>
  );
};
export default Product;
