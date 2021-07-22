import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ScoreBoard extends Component {
  render() {
    const { sectionPlayer: { score } } = this.props;
    const zero = 0;
    return (
      <div>
        {'Placar: '}
        <span data-testid="header-score">
          {score || zero}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sectionPlayer: state.sectionReducer.player,
});

export default connect(mapStateToProps)(ScoreBoard);

ScoreBoard.propTypes = {
  sectionPlayer: PropTypes.shape({
    score: PropTypes.number.isRequired,
  }).isRequired,
};
