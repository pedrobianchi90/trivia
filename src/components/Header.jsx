import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { changePicture } from '../redux/actions';
import logo from '../trivia.png';
import '../GamePage.css';

class Header extends React.Component {
  componentDidMount() {
    this.dispatchPicture();
  }

  getImgSrc = () => {
    const { rootState: { player: { gravatarEmail } } } = this.props;
    const hash = md5(gravatarEmail).toString();
    const img = `https://www.gravatar.com/avatar/${hash}`;

    return img;
  }

dispatchPicture = () => {
  const { pictureDispatch } = this.props;
  const Url = this.getImgSrc();
  pictureDispatch(Url);
}

render() {
  const { rootState: { player: { name, score } } } = this.props;
  return (
    <header>
      <div id="player-container">
        <img
          src={ this.getImgSrc() }
          alt="Imagem do Usuário"
          data-testid="header-profile-picture"
          id="img-avatar"
        />
        <h2 data-testid="header-player-name">{ name }</h2>
      </div>
      <img src={ logo } className="logo" alt="logo" />
      <h2>
        Pontuação:
        {' '}
        <span data-testid="header-score">{ score }</span>
      </h2>
    </header>
  );
}
}

const mapStateToProps = (state) => ({
  rootState: state,
});

const mapDispatchToProps = (dispatch) => ({
  pictureDispatch: (state) => dispatch(changePicture(state)),
});

Header.propTypes = {
  rootState: PropTypes.objectOf(PropTypes.any).isRequired,
  pictureDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
