import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WrongAnswer from './WrongAnswer';
import CorrectAnswer from './CorrectAnswer';

class AlternativesContainer extends Component {
  constructor() {
    super();
    this.renderAlternatives = this.renderAlternatives.bind(this);
  }

  renderAlternatives() {
    const { alternatives,
      styleAlternative,
      countDown,
      answerClick } = this.props;

    const alternativesList = alternatives.map((text, alternativeIndex, array) => {
      if (text === array[array.length - 1]) {
        return (<CorrectAnswer
          key={ text }
          text={ text }
          styleAlternative={ styleAlternative }
          answerClick={ answerClick }
          countDown={ countDown }
        />);
      }
      return (<WrongAnswer
        key={ text }
        text={ text }
        alternativeIndex={ alternativeIndex }
        styleAlternative={ styleAlternative }
        answerClick={ answerClick }
        countDown={ countDown }
      />);
    });
    return alternativesList;
  }

  render() {
    return (
      <>
        {this.renderAlternatives().sort((a, b) => {
          const lessOne = -1;
          const one = 1;
          if (b.key > a.key) { return lessOne; } return one;
        })}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
});

export default connect(mapStateToProps)(AlternativesContainer);

AlternativesContainer.propTypes = {
  styleAlternative: PropTypes.bool.isRequired,
  countDown: PropTypes.number.isRequired,
  answerClick: PropTypes.func.isRequired,
  alternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
};
