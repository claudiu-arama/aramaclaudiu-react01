import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import CartTotals from './CartTotals';
import CheckoutForm from './CheckoutForm';

export const Checkout = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(AppContext);

  const placeOrder = (formData) => {
    dispatch({
      type: 'setOrder',
      payload: {
        address: formData,
        // clone cart to not copy pointer but get a copy of the array => new array
        items: [...cart],
      },
    });

    dispatch({
      type: 'setScreen',
      payload: 'OrderConfirmation',
    });

    dispatch({
      type: 'emptyCart',
      // payload is not always required - see here
    });
  };

  return (
    <section className="row">
      <header className="col-12 mb-4">
        <h2>checkout</h2>
      </header>
      <section className="col-12 col-md-8">
        <CheckoutForm
          onSubmit={(formData) => {
            placeOrder(formData);
          }}
        />
      </section>
      <footer className="col-12 col-md-4">
        <CartTotals cart={cart} />
      </footer>
    </section>
  );
};

export default Checkout;
