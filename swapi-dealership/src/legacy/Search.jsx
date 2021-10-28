import { Component } from 'react';
import { AppContext } from '../contexts/AppContext';

const baseUrl = 'https://swapi.dev/api/vehicles';

class Search extends Component {
  static contextType = AppContext;
  state = {
    requesting: false,
    searchTerm: '',
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ requesting: true });
    fetch(`${baseUrl}?search=${this.state.searchTerm}`)
      .then((response) => {
        return response.json();
      })
      .then(({ results }) => {
        this.setState({ requesting: false, searchTerm: '' });

        this.context.dispatch({
          type: 'setSearchResults',
          payload: results,
        });

        this.context.dispatch({
          type: 'setScreen',
          payload: 'searchResults',
        });
      });
  };

  onInputChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  render() {
    const className = this.props.className || '';

    return (
      <form className={className} onSubmit={this.onSubmit}>
        <input
          className="form-control me-2 align-self-center"
          type="text"
          name="q"
          placeholder={this.props.placeholder || 'Search'}
          onChange={this.onInputChange}
          value={this.state.searchTerm}
          disabled={this.state.requesting}
          required
        />

        <button
          className="btn btn-warning"
          type="submit"
          disabled={this.state.requesting}
          title="Search">
          Search
        </button>
      </form>
    );
  }
}

export default Search;
