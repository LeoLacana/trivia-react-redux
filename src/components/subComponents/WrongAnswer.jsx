import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WrongAnswer extends Component {
  render() {
    const { text, alternativeIndex, answerClick, styleAlternative } = this.props;
    const styles = {
      border: '3px solid rgb(255, 0, 0)',
    };
    return (
      <button
        type="button"
        key={ text }
        data-testid={ `wrong-answer-${alternativeIndex}` }
        onClick={ () => answerClick() }
        style={ styleAlternative ? styles : null }
      >
        {text}
      </button>
    );
  }
}

export default WrongAnswer;

WrongAnswer.propTypes = {
  text: PropTypes.string.isRequired,
  alternativeIndex: PropTypes.number.isRequired,
  answerClick: PropTypes.func.isRequired,
  styleAlternative: PropTypes.bool.isRequired,
};
