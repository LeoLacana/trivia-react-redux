import React, { Component } from 'react';
import PropTypes from 'prop-types';
import decodeHtml from '../../helpers/htmldecode';

class WrongAnswer extends Component {
  render() {
    const { text,
      alternativeIndex,
      answerClick,
      styleAlternative,
      countDown } = this.props;
    const styles = {
      border: '3px solid rgb(255, 0, 0)',
    };
    return (
      <button
        type="button"
        key={ text }
        data-testid={ `wrong-answer-${alternativeIndex}` }
        onClick={ (e) => answerClick(e) }
        style={ styleAlternative ? styles : null }
        disabled={ countDown === 0 }
      >
        {decodeHtml(text)}
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
  countDown: PropTypes.number.isRequired,
};
