import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.handleRanking();
  }

  handleRanking =() => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const arraySort = ranking.sort((a, b) => (b.score - a.score));
    this.setState({ ranking: arraySort });
    console.log(arraySort);
  }

  render() {
    const { ranking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        {ranking.map((rank, index) => (
          <div key={ rank.picture }>
            <img src={ rank.picture } alt="foto de perfil" />
            <p data-testid={ `player-name-${index}` }>{rank.name}</p>
            <p data-testid={ `player-score-${index}` }>{rank.score}</p>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </>
    );
  }
}

export default Ranking;
