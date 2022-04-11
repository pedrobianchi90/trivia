import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import logo from '../trivia.png';
import '../App.css';
import { changeEmail, getToken, changeScore } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      player: '',
      email: '',
      disabled: true,
      ready: false,
    };
  }

  componentDidMount() {
    const { changePoints } = this.props;
    changePoints({ points: 0, correctAnswers: [] });
  }

  requestToken = async () => {
    const { dispatchToken } = this.props;
    await dispatchToken();
    this.setState({ ready: true });
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
    const { player, email, disabled, ready } = this.state;
    const { emailDispatch } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <div className="input-login">
            <form id="login-form">
              <input
                type="text"
                name="player"
                data-testid="input-player-name"
                placeholder="Digite seu nome"
                value={ player }
                onChange={ this.handleChange }
                id="input-player"
              />
              <input
                type="email"
                name="email"
                data-testid="input-gravatar-email"
                placeholder="Digite seu email"
                value={ email }
                onChange={ this.handleChange }
                id="input-email"
              />
            </form>
            <button
              className={ !disabled && 'background-button' }
              id="play-button"
              type="button"
              disabled={ disabled }
              data-testid="btn-play"
              onClick={ () => {
                emailDispatch({ player, email });
                this.requestToken();
              } }
            >
              Play
            </button>
            <Link to="/settings">
              <button
                id="config-button"
                type="button"
                data-testid="btn-settings"
                className="background-button"
              >
                Configurações
              </button>
            </Link>
            { ready && <Redirect to="/gamepage" /> }
          </div>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (state) => dispatch(changeEmail(state)),
  dispatchToken: () => dispatch(getToken()),
  changePoints: (state) => dispatch(changeScore(state)),
});

Login.propTypes = {
  emailDispatch: PropTypes.func.isRequired,
  dispatchToken: PropTypes.func.isRequired,
  changePoints: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
