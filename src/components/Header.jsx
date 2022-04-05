import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  getImgSrc = () => {
    const { rootState: { gravatarEmail } } = this.props;
    const hash = md5(gravatarEmail).toString();
    const img = `https://www.gravatar.com/avatar/${hash}`;
    return img;
  }

  render() {
    const { rootState: { name } } = this.props;
    return (
      <header>
        <img
          src={ this.getImgSrc() }
          alt="Imagem do Usuário"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  rootState: state,
});

Header.propTypes = {
  rootState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
