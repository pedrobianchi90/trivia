import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
// npm run cy:open

class GamePage extends React.Component {
  constructor() {
    super();

    this.state = {
      results: '',
      index: 0,
    };
  }

  componentDidMount() {
    this.getResults();
  }

  getResults = async () => {
    const { tokenValue } = this.props;
    const url = `https://opentdb.com/api.php?amount=5&token=${tokenValue}`;
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    // console.log(results);

    this.setState({
      results,
    }, () => {
      const { results: result, index } = this.state;
      // const question = result[index];
      // console.log(result[index]);
      const perguntas = [
        result[index].correct_answer,
        ...result[index].incorrect_answers,
      ];
      const random = 0.5;
      perguntas.sort(() => Math.random() - random);
      this.setState({
        perguntas,
      });
      // console.log(perguntas);
    });
  }

  changeIndex = () => {
    const { results: result } = this.state;
    // console.log(result[index]);
    this.setState((prevState) => ({
      index: prevState.index + 1,
    }), () => {
      const { index } = this.state;
      const perguntas = [
        result[index].correct_answer,
        ...result[index].incorrect_answers,
      ];
      const random = 0.5;
      perguntas.sort(() => Math.random() - random);
      this.setState({
        perguntas,
      });
    });
    // console.log(perguntas);
    // função vista no site DelfStack https://www.delftstack.com/pt/howto/javascript/shuffle-array-javascript/#:~:text=Baralhar%20um%20array%20dependendo%20do%20motor%20JavaScript,-Comecemos%20por%20implementar&text=sort()%20mas%20utilizando%20alguma,pode%20ser%20positivo%20ou%20negativo.
  }

  boolBtn = () => {
    const { results, index } = this.state;
    // console.log(index);
    // console.log(results[index].correct_answer);
    if (results[index].correct_answer) {
      return (
        <div>
          <button
            type="button"
            data-testid="correct-answer"
            onClick={ this.changeIndex }
          >
            True
          </button>

          <button
            type="button"
            data-testid="wrong-answer"
            onClick={ this.changeIndex }
          >
            False
          </button>
        </div>
      );
    }
    return (
      <div>
        <button
          type="button"
          data-testid="wrong-answer"
          onClick={ this.changeIndex }
        >
          True
        </button>

        <button
          type="button"
          data-testid="correct-answer"
          onClick={ this.changeIndex }
        >
          False
        </button>
      </div>
    );
  }

  render() {
    const { results, index, perguntas } = this.state;
    const question = results[index];
    // console.log(perguntas);
    return (
      <div>
        { results && perguntas ? (
          <div>
            <h3 data-testid="question-category">{ question.category }</h3>

            <p data-testid="question-text">{ question.question }</p>

            <div data-testid="answer-options">
              { results[index].type === 'boolean' ? (
                this.boolBtn()
              ) : (
                perguntas.map((answer, indexMap) => (
                  answer === results[index].correct_answer ? (
                    <button
                      key={ results[index].correct_answer }
                      type="button"
                      data-testid="correct-answer"
                      onClick={ this.changeIndex }
                    >
                      { results[index].correct_answer }
                    </button>
                  ) : (
                    <button
                      key={ answer }
                      type="button"
                      data-testid={ `wrong-answer-${indexMap}` }
                      onClick={ this.changeIndex }
                    >
                      { answer }
                    </button>
                  )
                ))
              )}
            </div>
          </div>
        ) : undefined }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenValue: state.token,
});

GamePage.propTypes = {
  tokenValue: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(GamePage);
