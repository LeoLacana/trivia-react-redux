import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  rankingSortPodium(ranking) {
    ranking.sort((a, b) => {
      const one = 1;
      const lessOne = -1;
      if (a.score > b.score) { return lessOne; } return one;
    });
    return ranking;
  }

  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { this.rankingSortPodium(ranking)
          .map(({ name, picture, score }, index) => (
            <div key={ name }>
              <img alt={ `Avatar de ${name}` } src={ picture } />
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <span data-testid={ `player-score-${index}` }>{score}</span>
            </div>))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Ir para o início
        </button>
      </div>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
