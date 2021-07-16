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
      answerClick,
      questions } = this.props;
    console.log(questions);
    const aaa = alternatives.map((text, alternativeIndex, array) => {
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
    return aaa;
  }

  render() {
    return (
      <>
        {this.renderAlternatives().sort((a, b) => {
          console.log(a);
          return b.key - a.key;
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
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  styleAlternative: PropTypes.bool.isRequired,
  countDown: PropTypes.number.isRequired,
  answerClick: PropTypes.func.isRequired,
  alternatives: PropTypes.arrayOf(PropTypes.string).isRequired,
};
