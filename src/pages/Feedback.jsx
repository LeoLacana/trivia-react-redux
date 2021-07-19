import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends Component {
  scoreMessage(assertions) {
    const minimumAssertion = 3;
    if (assertions < minimumAssertion) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { sectionPlayer: player } = this.props;
    const { name, score, gravatarEmail, assertions } = player;
    const gravatarHash = md5(gravatarEmail).toString();

    return (
      <div data-testid="feedback-text">
        <h1>{this.scoreMessage(assertions)}</h1>
        <h1>
          {'Jogador: '}
          <span data-testid="header-player-name">{ name }</span>
        </h1>
        <img
          alt="avatar"
          src={ `https://www.gravatar.com/avatar/${gravatarHash}` }
          data-testid="header-profile-picture"
        />
        <p>
          Pontuação:
          <span
            data-testid="header-score"
          >
            {score}
          </span>
        </p>
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
};
