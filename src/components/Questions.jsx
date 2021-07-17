import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { questionsRequest, sectionUser } from '../actions';
import AlternativesContainer from './subComponents/AlternativesContainer';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionIndex: 0,
      questions: [],
      styleAlternative: false,
      countDown: 30,
      assertions: 0,
      score: 0,
    };

    this.handleState = this.handleState.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.answerClick = this.answerClick.bind(this);
    this.difficult = this.difficult.bind(this);
    this.throwToLocalStorage = this.throwToLocalStorage.bind(this);
  }

  async componentDidMount() {
    const state = {
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravatarEmail: '',
      },
    };
    localStorage.setItem('state', JSON.stringify(state));

    const { requestQuestions } = this.props;
    const token = localStorage.getItem('token');

    await requestQuestions(token);

    const { questions } = this.props;
    this.handleState(questions);

    const ThirtySeconds = 30;
    let i = ThirtySeconds;
    const oneSecond = 1000;
    this.interval = setInterval(() => {
      if (i === 0) {
        this.setState({
          styleAlternative: true,
        });
        clearInterval(this.interval);
      }

      this.setState({
        countDown: i,
      });
      i -= 1;
    }, oneSecond);
  }

  handleState(questions) {
    this.setState({
      questions: questions.results,
    });
  }

  throwToLocalStorage() {
    const { /* questions, */ email, username, section } = this.props;
    const { assertions, score } = this.state;
    const state = {
      player: {
        name: username,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
    section(state);
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

  difficult(difficultLevel) {
    const three = '3';
    switch (difficultLevel.difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return three; // 3
    default:
      return null;
    }
  }

  async answerClick({ target }) {
    const { questions, email, username } = this.props;
    const { questionIndex, assertions, countDown, score } = this.state;
    this.setState({
      styleAlternative: true,
    });

    if (questions.results[questionIndex].correct_answer === target.innerHTML) {
      const def = 10;
      const questionScore = (def + (countDown * this
        .difficult(questions.results[questionIndex])));
      console.log(questionScore);
      this.setState({
        assertions: assertions + 1,
        score: score + questionScore,
      }, () => clearInterval(this.interval));

      this.setState({}, () => this.throwToLocalStorage());
    }
  }

  render() {
    const { questions, questionIndex, styleAlternative, countDown } = this.state;
    return questions.length === 0 ? <div>Loading</div> : (
      <div>
        {questions.map(({ category, question,
          correct_answer: correctAnswer,
          incorrect_answers: incorrectAnswers }, index) => {
          if (questionIndex === index) {
            return (
              <div>
                <p>
                  Tempo restante:
                  <span>
                    {`${countDown}`}
                  </span>
                </p>
                <p data-testid="question-text">{category}</p>
                <p data-testid="question-category">{question}</p>
                <div>
                  <AlternativesContainer
                    alternatives={ [...incorrectAnswers, correctAnswer] }
                    styleAlternative={ styleAlternative }
                    countDown={ countDown }
                    answerClick={ this.answerClick }
                    index={ index }
                  />
                </div>
              </div>
            );
          } return null;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
  email: state.loginReducer.email,
  username: state.loginReducer.name,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => dispatch(questionsRequest(token)),
  section: (section) => dispatch(sectionUser(section)),
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
