import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    this.setLocal();
  }

  setLocal = () => {
    const { rootState: { player: { assertions, score } } } = this.props;
    const player = {
      assertions,
      score,
    };
    const local = JSON.parse(localStorage.getItem('player'));
    if (local) {
      const lista = [...local, player];
      const localString = JSON.stringify(lista);
      localStorage.setItem('player', localString);
    } else {
      const lista = [player];
      const localString = JSON.stringify(lista);
      localStorage.setItem('player', localString);
    }
  }

  handleResults = () => {
    const { rootState: { player: { assertions } } } = this.props;
    const average = 3;
    if (assertions < average) return 'Could be better...';
    return 'Well Done!';
  }

  render() {
    const { rootState: { player: { assertions, score } } } = this.props;
    return (
      <>
        <Header />
        <h1>Feedback</h1>
        <h2 data-testid="feedback-text">{ this.handleResults() }</h2>
        <p data-testid="feedback-total-question">
          { assertions }
        </p>
        { score > 0 ? (
          <p data-testid="feedback-total-score">
            { score }
          </p>
        ) : (
          <p data-testid="feedback-total-score">
            0
          </p>) }
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Play Again</button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ rootState: state });

Feedback.propTypes = {
  rootState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Feedback);
