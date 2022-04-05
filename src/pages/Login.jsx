import React from 'react';
import logo from '../trivia.png';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      player: '',
      email: '',
      disabled: true,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { player, email } = this.state;
      if (player && email) {
        this.setState({
          disabled: false,
        });
      }
    });
  }

  render() {
    const { player, email, disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <form>
            <input
              type="text"
              name="player"
              data-testid="input-player-name"
              placeholder="Digite seu nome"
              value={ player }
              onChange={ this.handleChange }
            />
            <input
              type="email"
              name="email"
              data-testid="input-gravatar-email"
              placeholder="Digite seu email"
              value={ email }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              disabled={ disabled }
              data-testid="btn-play"
            >
              Play
            </button>
          </form>
        </header>
      </div>
    );
  }
}

export default Login;
