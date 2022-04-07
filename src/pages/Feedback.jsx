import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  handleResults = () => {
    const { rootState: { player: { correctAnswers } } } = this.props;
    const average = 3;
    if (correctAnswers < average) return 'Could be better...';
    return 'Well Done!';
  }

  render() {
    return (
      <>
        <Header />
        <h1>Feedback</h1>
        <h2 data-testid="feedback-text">{ this.handleResults() }</h2>
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
