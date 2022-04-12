import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../FeedBack.css';

class Feedback extends React.Component {
  componentDidMount() {
    this.setLocal();
  }

  setLocal = () => {
    const { rootState: { player: { assertions, score, picture, name } } } = this.props;
    const player = {
      assertions,
      score,
      picture,
      name,
    };
    const local = JSON.parse(localStorage.getItem('ranking'));
    if (local) {
      const lista = [...local, player];
      const localString = JSON.stringify(lista);
      localStorage.setItem('ranking', localString);
    } else {
      const lista = [player];
      const localString = JSON.stringify(lista);
      localStorage.setItem('ranking', localString);
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
        <div id="feedback-container">
          <h1>Feedback</h1>
          <h2 data-testid="feedback-text">{ this.handleResults() }</h2>
          <h3 data-testid="feedback-total-question">
            You have got
            { ' ' }
            <span>{ assertions }</span>
            { ' ' }
            questions right.
          </h3>
          { score > 0 ? (
            <h3 data-testid="feedback-total-score">
              Your score is:
              { ' ' }
              <span>{ score }</span>
              { ' ' }
              points.
            </h3>
          ) : (
            <p data-testid="feedback-total-score">
              0
            </p>) }
          <div>
            <Link to="/">
              <button type="button" data-testid="btn-play-again">Play Again</button>
            </Link>
            <Link to="/ranking">
              <button type="button" data-testid="btn-ranking">Ranking</button>
            </Link>
          </div>

        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ rootState: state });

Feedback.propTypes = {
  rootState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Feedback);
