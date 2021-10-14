import { Component } from 'react';
// import MetaImage from './MetaImage';

class Films extends Component {
  renderFilms() {
    if (this.props.films.length <= 0) {
      return <>No films found</>;
    }
    return this.props.films.map((film) => {
      const { title, episode_id: id } = film;

      return (
        <article
          key={id}
          className="col-6 col-md-3 p-4 mb-2 d-flex flex-column">
          <header>
            <h6 className="text-warning text-left">{title}</h6>
          </header>

          <section>
            {/* <MetaImage term={title}></MetaImage> */}
          </section>

          <section className="d-flex justify-content-between">
            <button
              className="btn btn-sm btn-light"
              type="button"
              title={`view details about ${title}`}
              onClick={() => this.props.selectFilm(film)}>
              Details
            </button>
            <button
              className="btn btn-sm btn-warning"
              type="button"
              title={`buy tickets to ${title}`}
              onClick={() => {
                this.props.purchaseFilm(film);
              }}>
              BuyTickets
            </button>
          </section>
        </article>
      );
    });
  }

  render() {
    return <section className="row">{this.renderFilms()}</section>;
  }
}

export default Films;
