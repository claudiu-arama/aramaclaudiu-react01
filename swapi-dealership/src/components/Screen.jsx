import Products from './Products';
import Product from './Product.jsx';
import SearchResults from './SearchResults';
import Cart from './Cart';
import Checkout from './Checkout';

const componentMap = {
  home: Products,
  productPage: Product,
  searchResults: SearchResults,
  cart: Cart,
  checkout: Checkout,
};
// <componentMap.home />
// set up a default by using {screen = 'home'}
export const Screen = ({ screen = 'home' }) => {
  // if default is not matched in componentMap -> check and provide failsafe
  if (!screen || typeof componentMap[screen] === 'undefined') {
    return <componentMap.home />;
  }
  const CurrentComponent = componentMap[screen];

  return <CurrentComponent></CurrentComponent>;
};

export default Screen;
