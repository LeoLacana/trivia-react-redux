import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import Questions from '../components/Questions';
import ScoreBoard from '../components/ScoreBoard';

class Game extends Component {
  md5Converter(email) {
    const md5Email = md5(email).toString();
    return `https://www.gravatar.com/avatar/${md5Email}/`;
  }

  render() {
    const { player, history } = this.props;
    const { email, name } = player;

    return (
      <div>
        <div>
          <img
            alt={ `Avatar de ${name}` }
            data-testid="header-profile-picture"
            src={ this.md5Converter(email) }
          />
          <p>
            {'Jogador: '}
            <span data-testid="header-player-name">
              {name}
            </span>
          </p>
          <ScoreBoard />
        </div>
        <Questions history={ history } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.loginReducer,
  token: state.triviaReducer.sectionTriviaToken,
});

export default connect(mapStateToProps, null)(Game);

Game.propTypes = {
  player: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
