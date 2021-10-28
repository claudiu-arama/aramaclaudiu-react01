import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Search from '../legacy/Search';
import ProductTile from './ProductTile';

export const SearchResults = () => {
  const { state, dispatch } = useContext(AppContext);
  const { searchResults } = state;

  const renderResults = () => {
    if (searchResults.length <= 0) {
      return (
        <>
          <p>can't buy your way off-planet!</p>{' '}
          <Search className="d-inline-flex my-4 w-25 mx-auto" />
        </>
      );
    }
    return searchResults.map((result) => {
      return <ProductTile product={result} key={result.name} />;
    });
  };

  const navigate = () => {
    dispatch({
      type: 'setScreen',
      payload: 'home',
    });

    dispatch({
      type: 'setSearchResults',
      payload: [],
    });
  };

  return (
    <section className="row">
      <header className="col-12 mb-2">
        <h2>search results</h2>
      </header>
      {renderResults()}

      <div className="col-12 mt-2 text-center">
        <button
          className="btn btn-outline-warning"
          title="back"
          type="button"
          onClick={navigate}>
          Back!
        </button>
      </div>
    </section>
  );
};

export default SearchResults;
