import { Component, Fragment } from 'react';

import Film from './components/Film';
import Films from './components/Films';
import PurchaseFilm from './components/PurchaseFilm';
import Search from './components/Search';

const baseUrl = 'https://swapi.dev/api/films';

class App extends Component {
  state = {
    films: [],
    requesting: true,
    errorMessage: '',
    hasSearchResults: false,
    selectedFilm: null,
    purchasing: false,
  };

  getFilms() {
    this.setState({ requesting: true });
    // promise chaining
    return (
      fetch(baseUrl)
        .then((response) => {
          // check if response status is good
          if (response.status === 404) {
            throw new Error('404');
          }

          // promise chaining - use return to have available for the next .then
          return response.json();
        })
        .then(({ results }) => {
          this.setState({ films: results, requesting: false });
        })
        // error handling is very important. read into it
        .catch(({ message }) => {
          this.setState({
            errorMessage: message,
            requesting: false,
          });
        })
    );
  }

  clearSearchResults = () => {
    this.getFilms().then(() => {
      this.setState({ hasSearchResults: false });
    });
  };

  renderFilms() {
    return (
      <>
        <h2>Available Films</h2>
        <Films
          films={this.state.films}
          selectFilm={(film) => {
            this.setState({
              selectedFilm: film,
            });
          }}
          purchaseFilm={(film) => {
            this.setState({
              selectFilm: film,
              purchasing: true,
            });
          }}></Films>
        {this.state.hasSearchResults ? (
          <button
            className="btn btn-warning text-white"
            title="See all movies"
            type="button"
            onClick={() => {
              // this.clearSearchResults
              this.clearSearchResults();
            }}>
            See all movies
          </button>
        ) : null}
      </>
    );
  }

  renderFilm() {
    return (
      <Film
        film={this.state.selectedFilm}
        deselectFilm={() => {
          this.setState({ selectedFilm: null });
        }}
        purchaseFilm={() => {
          this.setState({ purchasing: true });
        }}></Film>
    );
  }

  renderMainScreen() {
    if (this.state.requesting === true) {
      // this is a fragment
      return <>...loading</>;
    }

    if (
      this.state.requesting === false &&
      this.state.errorMessage.length > 0
    ) {
      return <>{this.state.errorMessage}</>;
    }

    if (this.state.purchasing === true) {
      return (
        <PurchaseFilm
          film={this.state.selectedFilm}
          cancelPurchase={() => {
            this.setState({
              purchasing: false,
              selectFilm: null,
            });
          }}></PurchaseFilm>
      );
    }

    return this.state.selectedFilm != null
      ? this.renderFilm()
      : this.renderFilms();
  }

  componentDidMount() {
    this.getFilms();
  }

  render() {
    return (
      <Fragment>
        <header className="navbar-expand-md navbar-dark fixed-top bg-dark">
          <nav className="container d-flex justify-content-between">
            <h1 className="display-5 text-warning">Swapi Cinema</h1>
            <Search
              onSearchResults={(films) => {
                this.setState({
                  films,
                  hasSearchResults: true,
                  selectedFilm: null,
                });
              }}
              placeholder="choose a sw movie"></Search>
          </nav>
        </header>

        <main className="container mt-5 pt-5">
          {this.renderMainScreen()}
        </main>
      </Fragment>
    );
  }
}

export default App;
