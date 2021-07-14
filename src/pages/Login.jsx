// create react component
import React, { Component } from 'react';
import logo from '../trivia.png';

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
    // lembrar de referenciar regex
    const { email, name } = this.state;
    const emailRegex = /^([\w.-]+)@([\w-]+)((\.(\w){2,3})+)$/;
    return (emailRegex.test(email) && name.length > 0);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value },
      () => console.log(this.verifyRegexEmail()));
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
          // onClick={} Aqui ficará o metodo que irá chamar o jogo.
        >
          Jogar
        </button>
      </div>

    );
  }
}

export default Login;
