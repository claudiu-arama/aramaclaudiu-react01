const ADD_TO_CART_EVENT = 'cart:add';
const REMOVE_FROM_CART_EVENT = 'cart:remove';
const ADD_TO_WISHLIST_EVENT = 'wishlist:add';
const REMOVE_FROM_WISHLIST_EVENT = 'wishlist:remove';

class NewsLetterForm extends React.Component {
  // v1 - define state in class-based react
  state = {
    email: '',
    inputMessage: '',
    busy: false,
    submitted: false,
    submittedValue: '',
  };

  // string -> boolean
  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    if (!this.validateEmail(email)) {
      this.setState({
        inputMessage: 'please use a valid email!',
      });
      return;
    }

    // request to server simulation
    this.setState({
      busy: true,
    });

    setTimeout(() => {
      alert(`Hello ${email}`);
      this.setState({
        busy: false,
        email: '',
        submitted: true,
        submittedValue: this.state.email,
      });
    }, 1000);
  };

  render() {
    return (
      <div>
        {this.state.submitted === true ? (
          <div className="container">
            Hello {this.state.submittedValue}
          </div>
        ) : (
          <form
            onSubmit={this.onSubmit}
            className="form-newsletter container">
            <label htmlFor="field-newsletter">
              Subscribe to our <span>newsletter</span>
            </label>
            <div>
              <input
                type="text"
                name="field-newsletter"
                id="field-newsletter"
                value={this.state.email}
                onChange={this.onInputChange}
                placeholder="enter your email address to receive the latest news!"></input>

              {this.state.inputMessage ? (
                <div className="message">
                  {this.state.inputMessage}
                </div>
              ) : (
                ''
              )}
            </div>

            {/* button disabled while req is "sent" to server */}
            <button
              className={`${this.state.busy === true ? 'busy' : ''}`}
              type="submit"
              title="Subscribe"
              disabled={this.state.busy}>
              {this.state.busy ? (
                <i className="fas fa-spinner icon"></i>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        )}
      </div>
    );
  }
}

const NewsLetterContainer = document.querySelector(
  '.home-newsletter',
);

ReactDOM.render(
  <NewsLetterForm></NewsLetterForm>,
  NewsLetterContainer,
);

class AddToCartButton extends React.Component {
  // v1

  state = {
    added: false,
    busy: false,
  };

  onClick = () => {
    if (this.state.busy === true) {
      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      dispatchEvent(
        new CustomEvent(
          this.state.added
            ? REMOVE_FROM_CART_EVENT
            : ADD_TO_CART_EVENT,
          {
            detail: {
              productId: this.props.productId,
            },
          },
        ),
      );

      this.setState({
        busy: false,
        added: !this.state.added,
      });
    }, 1000);
  };

  render() {
    return (
      <button
        onClick={this.onClick}
        title={
          this.state.added === true
            ? 'Remove from Cart'
            : 'Add to cart'
        }
        className={`product-control ${
          this.state.added === true ? 'active' : ''
        } ${this.state.busy ? 'busy' : ''}`}
        type="button">
        <span>
          {this.state.added === true
            ? `PID: ${this.props.productId} in cart`
            : 'Add to cart'}
        </span>
        <i className="fas fa-spinner icon"></i>
      </button>
    );
  }
}

class AddToWishlistButton extends React.Component {
  // v2

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
    }, 1000);
  };

  render() {
    let { added, busy } = this.state;
    let className =
      'product-control' +
      ' ' +
      (added ? 'active' : '') +
      ' ' +
      (busy ? 'busy' : '');
    return (
      <button
        className={className}
        type="button"
        disabled={busy}
        onClick={this.onClick}
        title={
          added === true ? 'Remove from Wishlist' : 'Add to Wishlist'
        }>
        <span>
          <i
            className={
              added === true ? 'fas fa-heart' : 'far fa-heart'
            }></i>
          <i className="fas fa-spinner icon"></i>
        </span>
      </button>
    );
  }
}

class ProductControls extends React.Component {
  render() {
    const productId = this.props.productId;

    return (
      // add multiple components in a single render by using an array of components
      [
        <AddToCartButton
          key={Math.random()}
          productId={productId}></AddToCartButton>,
        <AddToWishlistButton
          key={Math.random()}
          productId={productId}></AddToWishlistButton>,
      ]
    );
  }
}

const productTileControls = document.querySelectorAll(
  '.product-tile-controls',
);

productTileControls.forEach((productTileControl, index) => {
  ReactDOM.render(
    <ProductControls
      key={index}
      productId={index}
      s></ProductControls>,
    productTileControl,
  );
});

class HeaderCounters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItemsCount: 0,
      wishlistItemsCount: 0,
      cartItems: [],
      wishlistItems: [],
    };
  }

  showProducts(collectionName, displayName) {
    let msg = '';
    const bucket = displayName.toLowerCase();

    if (this.state[collectionName] < 1) {
      msg = `There are no products in your ${bucket}`;
    } else {
      // array to string interpolation
      msg = `These are the Pids in your ${bucket}: ${
        this.state[`${bucket}Items`]
      }`;
    }

    alert(msg);
  }

  productCartAction = (event) => {
    const { productId } = event.detail;
    // const {type: eventType} = event; - same
    const eventType = event.type;
    let { cartItemsCount, cartItems } = this.state;

    switch (eventType) {
      case ADD_TO_CART_EVENT:
        cartItemsCount++;
        cartItems.push(productId);
        break;
      case REMOVE_FROM_CART_EVENT:
        cartItemsCount--;
        cartItems = cartItems.filter((item) => {
          return item !== productId;
        });
        break;
    }

    this.setState({
      // cartItemsCount: cartItemsCount, - same as below
      cartItemsCount,
      cartItems,
    });
  };

  componentDidMount() {
    addEventListener(ADD_TO_CART_EVENT, this.productCartAction);
    addEventListener(REMOVE_FROM_CART_EVENT, this.productCartAction);
  }

  render() {
    let { cartItemsCount, wishlistItemsCount } = this.state;
    return (
      <React.Fragment>
        <div className="header-counter">
          <span className="qty">{wishlistItemsCount}</span>
          <i
            className="fas fa-heart icon"
            onClick={() => {
              this.showProducts('wishlistItemsCount', 'Wishlist');
            }}></i>
        </div>
        <div className="header-counter">
          <span className="qty">{cartItemsCount}</span>
          <i
            className="fas fa-shopping-cart icon"
            onClick={() => {
              this.showProducts('cartItemsCount', 'Cart');
            }}></i>
        </div>
      </React.Fragment>
    );
  }
}

const headerCounters = document.querySelector('.header-counters');
ReactDOM.render(<HeaderCounters></HeaderCounters>, headerCounters);
