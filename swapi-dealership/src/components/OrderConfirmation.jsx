import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Address from './Address';
import CartTotals from './CartTotals';

export const OrderConfirmation = () => {
  const { state } = useContext(AppContext);
  // destructure on 2 levels - order from state and address and items from orders
  const {
    order: { address, items },
  } = state;
  return (
    <section className="row">
      <header className="col-12 my-4">
        <h2>thanks</h2>
      </header>

      <section className="col-12 col-md-6">
        <h3>Products:</h3>
        {/* controls used to render delete or not :) */}
        <CartTotals cart={items} controls={false} />
      </section>

      <section className="col-12 col-md-6">
        <h3>Address</h3>
        <Address address={address} />
      </section>
    </section>
  );
};

export default OrderConfirmation;
