import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import timeToAnswer from '../helpers/timers';
import addPoints from '../helpers/addPoints';
import { changeScore } from '../redux/actions';

class GamePage extends React.Component {
  constructor() {
    super();

    this.state = {
      results: '',
      index: 0,
      newIndex: 0,
      respostas: [],
      showClass: false,
      feedback: false,
      disabled: false,
      timer: 30,
      correctAnswers: [],
      timerOn: true,
      answerTime: [],
      points: 0,
    };
  }

  componentDidMount() {
    this.getResults();
    timeToAnswer(this.handleTimeOut, this.decrementTime);
  }

  getResults = async () => {
    const { tokenValue } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${tokenValue}`;
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;

    this.setState({
      results,
    }, () => {
      const { results: result, index } = this.state;
      const respostas = [
        result[index].correct_answer,
        ...result[index].incorrect_answers,
      ];
      const random = 0.5;
      respostas.sort(() => Math.random() - random);
      this.setState({
        respostas,
      });
    });
  }

  changeIndex = () => {
    const { results: result, newIndex } = this.state;
    const four = 4;
    if (newIndex < four) {
      this.setState((prevState) => ({
        index: prevState.index + 1,
        newIndex: prevState.newIndex + 1,
      }), () => {
        const { index } = this.state;
        const respostas = [
          result[index].correct_answer,
          ...result[index].incorrect_answers,
        ];
        const random = 0.5;
        respostas.sort(() => Math.random() - random);
        this.setState({
          respostas,
          showClass: false,
          disabled: false,
          timer: 30,
          timerOn: true,
        });
        const timeoutId = 99999;
        for (let i = 0; i < timeoutId; i += 1) {
          clearTimeout(i);
        }
        timeToAnswer(this.handleTimeOut, this.decrementTime);
      });
    } else {
      this.setState({ feedback: true });
    }
    // função vista no site DelfStack https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/#:~:text=Baralhar%20um%20array%20dependendo%20do%20motor%20JavaScript,-Comecemos%20por%20implementar&text=sort()%20mas%20utilizando%20alguma,pode%20ser%20positivo%20ou%20negativo.
  }

  handleAnswer = () => {
    this.setState(({ showClass: true, disabled: true, timerOn: false }));
  }

  handlePoints = (question) => {
    this.setState((prevState) => ({
      correctAnswers: [...prevState.correctAnswers, question],
      answerTime: [...prevState.answerTime, prevState.timer],
    }), () => {
      const { correctAnswers, answerTime } = this.state;
      this.setState((prevState) => ({ points: prevState.points
        + addPoints(correctAnswers, answerTime) }), () => {
        const { points } = this.state;
        const { changePoints } = this.props;
        changePoints({ points, correctAnswers });
      });
    });
  }

  renderBoolean = () => {
    const { respostas, results, index, showClass, disabled } = this.state;
    return (
      respostas.map((answer) => (
        answer === results[index].correct_answer ? (
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ () => {
              this.handleAnswer();
              this.handlePoints(results[index]);
            } }
            className={ showClass && 'correct-answer' }
            disabled={ disabled }
          >
            { answer }
          </button>
        ) : (
          <button
            type="button"
            data-testid="wrong-answer"
            onClick={ this.handleAnswer }
            className={ showClass && 'wrong-answer' }
            disabled={ disabled }
          >
            { answer }
          </button>
        )
      ))
    );
  }

  renderMultiples = () => {
    const { respostas, results, index, showClass, disabled } = this.state;
    return (
      respostas.map((answer, indexMap) => (
        answer === results[index].correct_answer ? (
          <button
            key={ results[index].correct_answer }
            type="button"
            data-testid="correct-answer"
            onClick={ () => {
              this.handleAnswer();
              this.handlePoints(results[index]);
            } }
            className={ showClass && 'correct-answer' }
            disabled={ disabled }
          >
            { results[index].correct_answer }
          </button>
        ) : (
          <button
            key={ answer }
            type="button"
            data-testid={ `wrong-answer-${indexMap}` }
            onClick={ this.handleAnswer }
            className={ showClass && 'wrong-answer' }
            disabled={ disabled }
          >
            { answer }
          </button>
        )
      ))
    );
  }

  renderNext = () => {
    const { showClass } = this.state;
    if (showClass) {
      return (
        <button type="button" data-testid="btn-next" onClick={ this.changeIndex }>
          Next
        </button>
      );
    }
  }

  handleTimeOut = () => this.setState({ disabled: true, showClass: true });

  decrementTime = () => {
    const { timer, timerOn } = this.state;
    if (timer > 0 && timerOn) {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    } else {
      clearInterval(0);
    }
  }

  render() {
    const { results, index, respostas, timer, feedback } = this.state;
    const question = results[index];
    return (
      <>
        <Header />
        <p>{ timer }</p>
        <div>
          { results && respostas ? (
            <div>
              <h3 data-testid="question-category">{ question.category }</h3>
              <p data-testid="question-text">{ question.question }</p>
              <div data-testid="answer-options">
                { results[index].type === 'boolean' ? (
                  this.renderBoolean()
                ) : (
                  this.renderMultiples()
                )}
              </div>
            </div>
          ) : undefined }
          { feedback && <Redirect to="/feedback" /> }
        </div>
        { this.renderNext() }
      </>
    );
  }
}
const mapStateToProps = (state) => ({ tokenValue: state.token });
const mapDispatchToProps = (dispatch) => ({
  changePoints: (state) => dispatch(changeScore(state)),
});
GamePage.propTypes = {
  tokenValue: propTypes.string.isRequired,
  changePoints: propTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
