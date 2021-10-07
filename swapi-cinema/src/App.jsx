import { Component, Fragment } from 'react';
import Search from './components/Search';

const baseUrl = 'https://swapi.dev/api/filmss';

class App extends Component {
  state = {
    films: [],
    requesting: false,
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
    return this.state.films.map((film) => {
      return <p key={film.episode_id}>{film.title}</p>;
    });
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
            <Search></Search>
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
