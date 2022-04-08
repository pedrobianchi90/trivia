import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { changePicture } from '../redux/actions';

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
      <img
        src={ this.getImgSrc() }
        alt="Imagem do Usuário"
        data-testid="header-profile-picture"
      />
      <p data-testid="header-player-name">{ name }</p>
      <p data-testid="header-score">{ score }</p>
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
