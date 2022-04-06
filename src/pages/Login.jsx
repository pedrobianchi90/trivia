import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import '../App.css';
import { changeEmail, getToken } from '../redux/actions';

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
    const { emailDispatch, getToken: getTokenFunc } = this.props;
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
            <Link to="/gamepage">
              <button
                type="button"
                disabled={ disabled }
                data-testid="btn-play"
                onClick={ () => {
                  emailDispatch({ player, email });
                  getTokenFunc();
                } }
              >
                Play
              </button>
            </Link>
          </form>
          <Link to="/settings">
            <button type="button" data-testid="btn-settings">Configurações</button>
          </Link>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (state) => dispatch(changeEmail(state)),
  getToken: () => dispacth(getToken()),
});

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
  getToken: Proptypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
