import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ScoreBoard extends Component {
  render() {
    const { sectionPlayer } = this.props;
    const zero = 0;

    return (
      <div>
        {'Placar: '}
        <span data-testid="header-score">
          {!sectionPlayer.score ? zero : sectionPlayer.score}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sectionPlayer: state.sectionReducer,
});

export default connect(mapStateToProps)(ScoreBoard);

ScoreBoard.propTypes = {
  sectionPlayer: PropTypes.shape({
    score: PropTypes.number.isRequired,
  }).isRequired,
};
