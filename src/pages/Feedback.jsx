import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.sendPlayerInfoToRanking = this.sendPlayerInfoToRanking.bind(this);
  }

  componentDidMount() {
    this.sendPlayerInfoToRanking();
  }

  scoreMessage(assertions) {
    const minimumAssertion = 3;
    if (assertions < minimumAssertion) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  sendPlayerInfoToRanking() {
    const { ranking } = localStorage;
    const { sectionPlayer: player } = this.props;
    const { name, score, gravatarEmail } = player;
    const gravatarHash = md5(gravatarEmail).toString();

    const avatarURL = `https://www.gravatar.com/avatar/${gravatarHash}`;
    if (ranking) {
      localStorage.getItem('ranking', []);
      const oldRanking = JSON.parse(ranking);
      const newRanking = oldRanking.concat({
        name,
        score,
        picture: avatarURL,
      });
      return localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
    const emptyRanking = {
      name,
      score,
      picture: avatarURL,
    };

    return localStorage.setItem('ranking', JSON.stringify([emptyRanking]));
  }

  render() {
    const { history, sectionPlayer: player } = this.props;
    const { name, score, gravatarEmail, assertions } = player;
    const gravatarHash = md5(gravatarEmail).toString();

    return (
      <div data-testid="feedback-text">
        <h1>{this.scoreMessage(assertions)}</h1>
        <h1>
          {'Jogador: '}
          <span data-testid="header-player-name">{ name }</span>
          {' acertou '}
          <span data-testid="feedback-total-question">{ assertions }</span>
          {' questões.'}
        </h1>
        <img
          alt="avatar"
          src={ `https://www.gravatar.com/avatar/${gravatarHash}` }
          data-testid="header-profile-picture"
        />
        <p>
          {/* Lembrar de criar o componente header
          para mostrar placar e o resto. Req 14, tá no figma */}
          Pontuação:
          <span data-testid="header-score">{score}</span>
          <span data-testid="feedback-total-score">{score}</span>
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sectionPlayer: state.sectionReducer.player,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  sectionPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
