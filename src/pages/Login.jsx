// create react component
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { requestToken } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };

    this.verifyRegexEmail = this.verifyRegexEmail.bind(this);
  }

  verifyRegexEmail() {
    /** Para realizar o uso de verificação do email, tive que usar o regex pattern
     * para verificação de email abaixo:
     * Source: https://forum.blip.ai/t/resolvido-regex-para-validacao-de-email/1635 */
    const { email, name } = this.state;
    const emailRegex = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;
    return (emailRegex.test(email) && name.length > 0);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async startGame() {
    const { triviaAPI, history } = this.props;
    await triviaAPI();
    const { token } = this.props;
    localStorage.setItem('token', token);
    history.push('/game');
  }

  render() {
    return (
      <div>
        <img src={ logo } className="App-logo" alt="logo" width="150" />
        <p>
          SUA VEZ
        </p>
        <h1>Login</h1>
        <label htmlFor="inputEmail">
          <input
            type="text"
            placeholder="Email"
            id="inputEmail"
            data-testid="input-gravatar-email"
            name="email"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>

        <label htmlFor="inputName">
          <input
            type="text"
            placeholder="Nome"
            id="inputName"
            data-testid="input-player-name"
            name="name"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !this.verifyRegexEmail() }
          onClick={ () => this.startGame() }
        >
          Jogar
        </button>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  token: state.triviaReducer.sectionTriviaToken,
});

const mapDispatchToProps = (dispatch) => ({
  triviaAPI: () => dispatch(requestToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  triviaAPI: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
