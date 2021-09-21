class NewsletterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      processingRequest: false,
      closeSignUp: false,
      extraLongSignUp: false,
    };
  }

  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  onSubmit = (event) => {
    event.preventDefault();
    let { email } = this.state;
    if (!this.validateEmail(email)) {
      alert(
        'alerts are horrible! please input a valid email address next time! Thank you!',
      );
      return;
    }

    this.setState({
      processingRequest: true,
    });

    setTimeout(() => {
      this.setState({
        extraLongSignUp: true,
      });
    }, 3000);

    setTimeout(() => {
      this.setState({
        processingRequest: false,
        closeSignUp: true,
        extraLongSignUp: false,
      });
    }, 5000);
  };

  render() {
    let { processingRequest, closeSignUp, extraLongSignUp } =
      this.state;
    return (
      <div>
        <section className="footer-sign-up-newsletter">
          {processingRequest ? (
            <div>
              {extraLongSignUp ? (
                <p>really close to getting it done!</p>
              ) : (
                <p>working on signing you up!</p>
              )}
              <div className="footer-sign-up-loader">
                <i className="fas fa-spinner icon"></i>
              </div>
            </div>
          ) : closeSignUp ? (
            <div>
              <p>You are signed up! Great!</p>
            </div>
          ) : (
            <form method="post" onSubmit={this.onSubmit}>
              <label htmlFor="email-newsletter">
                sign up for our newsletter
              </label>
              <input
                onChange={this.onInputChange}
                type="email"
                name="email"
                id="email-newsletter"></input>
              <button type="submit">SUMBIT</button>
            </form>
          )}
        </section>
      </div>
    );
  }
}

class AddToCartBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      added: false,
      busy: false,
    };
  }

  onClick = () => {
    if (this.state.busy == true) {
      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      dispatchEvent(
        new CustomEvent('cart:add', {
          detail: this.props.productId,
        }),
      );

      this.setState({
        busy: false,
        added: !this.state.added,
      });
    }, 500);
  };

  render() {
    let { added, busy } = this.state;
    let btnClass = `btn btn-${
      added ? 'added' : busy ? 'busy' : 'active'
    }`;
    return (
      <button
        onClick={this.onClick}
        className={btnClass}
        type="button"
        title={
          added ? `${this.props.productId} in cart` : 'Add to Cart'
        }>
        <span>
          <i
            className={
              added ? 'fas fa-plus-square' : 'far fa-plus-square'
            }></i>
        </span>
      </button>
    );
  }
}

class AddToWishListBtn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      added: false,
      busy: false,
    };
  }

  onClick = () => {
    this.setState({
      busy: true,
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        added: !this.state.added,
      });
    }, 500);
  };

  render() {
    let { added, busy } = this.state;
    let btnClass = `btn btn-${
      added ? 'added' : busy ? 'busy' : 'active'
    }`;
    return (
      <button
        onClick={this.onClick}
        title={added ? 'Remove from Wishlist' : 'Add to Wishlist'}
        className={btnClass}>
        <span>
          <i className={added ? 'fas fa-heart' : 'far fa-heart'}></i>
        </span>
      </button>
    );
  }
}

class ProductControls extends React.Component {
  render() {
    const productId = this.props.productId;
    return [
      <AddToWishListBtn
        key={Math.random()}
        productId={productId}></AddToWishListBtn>,
      <AddToCartBtn
        key={Math.random()}
        productId={productId}></AddToCartBtn>,
    ];
  }
}

const NewsletterContainer = document.querySelector(
  '.footer-newsletter-and-social',
);
const HeaderControls = document.querySelector('.header-controls');

const ProductTileControls = document.querySelectorAll(
  '.product-tile-controls',
);

ReactDOM.render(<NewsletterForm />, NewsletterContainer);

// ReactDOM.render(<ItemTracker></ItemTracker>, HeaderControls);

ProductTileControls.forEach((productTileControl, index) => {
  ReactDOM.render(
    <ProductControls key={index} productId={index}></ProductControls>,
    productTileControl,
  );
});
