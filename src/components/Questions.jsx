import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { questionsRequest } from '../actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      questions: [],
    };
    this.handleState = this.handleState.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  async componentDidMount() {
    const { requestQuestions } = this.props;
    const token = localStorage.getItem('token');

    await requestQuestions(token);

    const { questions } = this.props;
    this.handleState(questions);
  }

  handleState(questions) {
    this.setState({
      questions: questions.results,
    });
  }

  /* Para fazer uma espécie de embaralhamento, foi utilizada uma função retirada
  de um pequeno tópico em StackOverFlow
  Source: https://stackoverflow.com/questions/49555273/how-to-shuffle-an-array-of-objects-in-javascript */
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  render() {
    const { questions, questionIndex } = this.state;
    return questions.length === 0 ? <div>Loading</div> : (
      <div>
        {questions.map(({ category,
          question,
          correct_answer: correctAnswer,
          incorrect_answers: incorrectAnswers }, index) => {
          if (questionIndex === index) {
            return (
              <div>
                <p data-testid="question-text">{category}</p>
                <p data-testid="question-category">{question}</p>
                <div>
                  {
                    this.shuffle([...incorrectAnswers, correctAnswer]
                      .map((text, alternativeIndex) => {
                        if (text === correctAnswer) {
                          return (
                            <button
                              type="button"
                              key={ text }
                              data-testid="correct-answer"
                            >
                              {text}
                            </button>
                          );
                        }
                        return (
                          <button
                            type="button"
                            key={ text }
                            data-testid={ `wrong-answer-${alternativeIndex}` }
                          >
                            {text}
                          </button>
                        );
                      }))
                  }
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => dispatch(questionsRequest(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = {
  questions: PropTypes.shape({
    results: PropTypes.shape({
      category: PropTypes.string,
    }),
  }).isRequired,
  requestQuestions: PropTypes.func.isRequired,

};
