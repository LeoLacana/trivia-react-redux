import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { sectionPlayer } = this.props;
    const { name, score, gravatarEmail } = sectionPlayer;
    const gravatarHash = md5(gravatarEmail).toString();

    return (
      <div data-testid="feedback-text">
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
  sectionPlayer: state.sectionReducer,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  sectionPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};
