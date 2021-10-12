import { Component, Fragment } from 'react';
import Films from './components/Films';
import Search from './components/Search';

const baseUrl = 'https://swapi.dev/api/films';

class App extends Component {
  state = {
    films: [],
    requesting: true,
    errorMessage: '',
  };

  getFilms() {
    this.setState({ requesting: true });
    fetch(baseUrl)
      .then((response) => {
        // check if response status is good
        console.log(response);
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
      });
  }

  renderFilms() {
    return (
      <>
        <h2>Available Films</h2>
        <Films films={this.state.films}></Films>
      </>
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

    return this.renderFilms();
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
                });
              }}></Search>
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
