import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoreBoard extends Component {
  constructor() {
    super();
    this.state = {
      isScored: false,
      score: 0,
    };
  }

  render() {
    const { sectionPlayer } = this.props;
    const zero = 0;
    // console.log(sectionPlayer.score, 'a');
    // if (sectionPlayer.player.section) {
    //   console.log(sectionPlayer.player.section);
    // }
    // const { isScored, score } = this.state;
    // console.log(sectionPlayer.player);
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
