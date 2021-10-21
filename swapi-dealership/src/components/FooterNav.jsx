import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export const FooterNav = () => {
  const { state, dispatch } = useContext(AppContext);
  const { cart } = state;

  const cleanUpState = () => {
    dispatch({
      type: 'setSelected',
      payload: null,
    });
    dispatch({
      type: 'setSearchResults',
      payload: [],
    });
  };

  const navigateHome = () => {
    dispatch({
      type: 'setScreen',
      payload: 'home',
    });
    cleanUpState();
  };

  const navigateToCart = () => {
    dispatch({
      type: 'setScreen',
      payload: 'cart',
    });
    cleanUpState();
  };

  return (
    <ul className="list-group col-md-3">
      <li className="list-group-item">
        <button
          className="bt btn-link p-0 border-0 bg-transparent"
          type="button"
          onClick={navigateHome}>
          home
        </button>
      </li>
      {cart.length > 0 ? (
        <li className="list-group-item">
          <button
            className="btn-link p-0 border-0 bg-transparent"
            title="cart"
            type="button"
            onClick={navigateToCart}>
            Cart
          </button>
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
};

export default FooterNav;
