import { useCallback, useEffect, useRef, useState } from 'react';
import ProductTile from './ProductTile';

const baseUrl = `https://swapi.dev/api/vehicles`;

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [busy, setBusy] = useState(true);
  const [urlToFetch, setUrlToFetch] = useState(baseUrl);

  const nextUrl = useRef('');
  const loadMoreRef = useRef(null);

  // recipe - reddit post from guy from react dev team
  const fetchProducts = useCallback(() => {
    setBusy(true);

    return fetch(urlToFetch)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const newProducts = data.results;

        // nextUrl.current = data.next !== null;
        // use nullish coalescing operator - google it
        nextUrl.current = data?.next ?? '';
        // params are auto extracted from component state => used as a functional update
        // do not pass array, pass func
        // catch up on closure func
        setProducts((products) => {
          return [...products, ...newProducts];
        });
        setBusy(false);
      });
  }, [urlToFetch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  // end recipe

  // empty array runs 1st time..if no array(param))(dependancy) it runs at every repaint
  useEffect(() => {
    // defining option
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    // instantiating observer
    const observer = new IntersectionObserver((entries) => {
      const intersectionObserverEntry = entries[0];
      if (
        intersectionObserverEntry.isIntersecting &&
        nextUrl.current.length > 0
      ) {
        setUrlToFetch(nextUrl.current);
      }
    }, options);
    // listening to the intersection events (observing)
    const targetElement = loadMoreRef.current;
    observer.observe(loadMoreRef.current);
    // provide cleanup func

    return () => {
      observer.unobserve(targetElement);
    };
  }, []);

  return (
    <section className="row">
      <div className="col-12 mb-6">
        <h2>available listings</h2>
      </div>

      {products.map((product) => {
        const { name } = product;
        return <ProductTile product={product} key={name} />;
      })}
      {/* ref to pe put on a DOM element..button is not rendered at first */}
      <div className="col-12 text-center" ref={loadMoreRef}>
        {nextUrl.current.length > 0 ? (
          <button
            className="btn btn-xl btn-warning"
            type="button"
            title="load more"
            disabled={busy}
            onClick={() => {
              setUrlToFetch(nextUrl.current);
            }}>
            {busy ? '...loading' : 'load more'}
          </button>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Products;
