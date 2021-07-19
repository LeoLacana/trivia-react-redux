import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NextAndFeedback extends Component {
  render() {
    const { index, length, nextQuestion, history } = this.props;
    return (
      <button
        onClick={ () => (index < length ? nextQuestion() : history.push('/feedback')) }
        type="button"
        data-testid="btn-next"
      >
        {index < length ? 'Próxima pergunta' : 'Feedback'}
      </button>
    );
  }
}

NextAndFeedback.propTypes = {
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
