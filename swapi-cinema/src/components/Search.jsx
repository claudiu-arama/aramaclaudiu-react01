import { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <form className="d-inline-flex align-self-center">
        <input
          className="form-control me-2 align-self-center"
          type="text"
          name="q"
          placeholder="Search"
          required
        />

        <button
          className="btn btn-warning"
          type="submit"
          title="Search">
          Search
        </button>
      </form>
    );
  }
}

export default Search;
