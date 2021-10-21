import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import CartTotals from './CartTotals';

const Cart = () => {
  // nested destructuring - destructure cart from state
  const {
    state: { cart },
    dispatch,
  } = useContext(AppContext);

  const navigateToCheckout = () => {
    dispatch({
      type: 'setScreen',
      payload: 'checkout',
    });
  };

  return (
    <section className="row">
      <header className="col-12">
        <h2>cart</h2>
      </header>
      <div className="col-12 mb-4">
        <CartTotals cart={cart} />
      </div>
      <div className="col-12 text-center">
        <button
          className="btn btn-warning"
          type="button"
          title="goto checkout"
          onClick={navigateToCheckout}>
          goto checkout
        </button>
      </div>
    </section>
  );
};

export default Cart;
