//3 params, questions, score, currQuestIndex
function Quiz(questions) {
  this.score = 0;
  this.currQuestIndex = 0;
  this.questions = questions;
};

// Adding function to quiz prototype object
Quiz.prototype.getCurrentQuestionIndex = function () {
  return this.questions[this.currQuestIndex];
};
// Adding function to quiz prototype object
Quiz.prototype.isEnded = function () {
  return this.currQuestIndex === this.questions.length;
};

//Function will do 3 things
// 1. Validate the answer
// 2. Update the score
// 3. Increment the current index
Quiz.prototype.validateAnswerAndUpdateScore = function (choice) {
  let question = this.getCurrentQuestionIndex();
  if (question.answer === choice) {
    this.score++;
  }
  this.currQuestIndex++;
};

function Question(text, options, answer) {
  this.text = text;
  this.options = options;
  this.answer = answer;
}

let questions = [
  new Question(
    'JavaScript is ___________ language ?',
    ['Object-Oriented', 'Object-Based', 'Procedural', 'None of the Above'],
    'Object-Oriented'
  ),
  new Question(
    'How can a datatype be declared to be a constant type ?',
    ['var', 'let', 'constant', 'const'],
    'const'
  ),
  new Question(
    'What keyword is used to check whether a given property is valid or not ?',
    ['is in', 'in', 'exists', 'lies'],
    'in'
  ),
  new Question(
    'What is the use of the noscript tag in JavaScript ?',
    ['Clears all the cookies', 'Clears the cache', 'Use in Non JS browsers', 'None of the Above'],
    'Use in Non JS browsers'
  ),
  new Question(
    'When an operators value is NULL, the typeof returned by the unary operator is ? ',
    ['Boolean', 'Integer', 'Object', 'Undefined'],
    'Object'
  ),
];

function showScores() {
  console.log('Scores :-', quiz.score);
  let gameOverHTML = `<h1 id='result'>Result</h1>`;
  gameOverHTML += `<h2 id='score'> Your Score = ${quiz.score
    } out of ${quiz.questions.length} <br/> Your Percentage = 
    ${((quiz.score / questions.length) * 100).toFixed(0)}% </h1>`;
  document.getElementById('quiz').innerHTML = gameOverHTML;
};

function loadQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    //Show current question!
    let curQuest = quiz.getCurrentQuestionIndex();
    if (curQuest.text) {
      let questionEle = document.getElementById('question');
      questionEle.innerHTML = curQuest.text;

      //Show current question's options
      let options = curQuest.options;
      for (var i = 0; i < options.length; i++) {
        let currOption = options[i];
        let eachOptElement = document.getElementById('choice' + i);
        eachOptElement.innerHTML = currOption;
        handleOptionBtn('btn' + i, currOption);
      }
    }
    showProgress();
  }
};

function showProgress() {
  let curQuestNumber = quiz.currQuestIndex + 1;
  let progress = document.getElementById('progress');
  progress.innerHTML = `Question ${curQuestNumber} of ${quiz.questions.length}`;
};

function handleOptionBtn(btnId, choice) {
  let btn = document.getElementById(btnId);
  btn.onclick = () => {
    quiz.validateAnswerAndUpdateScore(choice);
    loadQuestions();
  };
};

let quiz = new Quiz(questions);

//Load questions
loadQuestions();