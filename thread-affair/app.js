class NewsLetterForm extends React.Component {
  // v1
  state = {
    email: '',
    inputMessage: '',
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

    setTimeout(() => {
      alert(`Hello ${email}`);
    }, 3000);
  };

  render() {
    return (
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

          {this.state.inputMessage.length > 0 ? (
            <div className="message">{this.state.inputMessage}</div>
          ) : null}
        </div>
        <button type="submit" title="Subscribe">
          Subscribe
        </button>
      </form>
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
