let questNum = 0;
let totScore = 0;

//change to the question after clicking start
function makeQuest() {
  if (questNum < STORE.length) {
    return `<div class ="question-${questNum}">
    <h3>${STORE[questNum].question}</h3>
    <form><fieldset>
     ${makeAnswerChoices()}
    <button class="subButton" type="submit">Submit</button>
    </fieldset></form></div>`;
  } else {
    finalResults();
    // gameOver();
    $('.questNum').text(10)
  }
}

function makeAnswerChoices() {
  var answerChoices = '';
  var question = STORE[questNum];

  for (var i = 0; i < question.answers.length; i++) {
    answerChoices += makeAnswerChoice(question.answers[i]);
  }

  return answerChoices;
}

function makeAnswerChoice(answer) {
  return `<label class="choice">
    <input type="radio" value="${answer}" name="answer" required>
    <span>${answer}</span>
    </label>`;
}

//change the question number with incrementation
function nextQuestion() {
  questNum++;
  $('.questNum').text(questNum + 1);
}

//increment the score
function addScore() {
  totScore ++;
}

//this will beging the Quiz
function startGame() {
  $(".startQuest").on('click', '.startButton', function (event) {
    $('.startQuest').remove();
    generateQuest();
    $('.answerForm').css('display', 'block');
    $('.questNum').text(1);
  });
}

//generate the question
function generateQuest() {
  $('.answerForm').html(makeQuest());
}

//check for correct/incorrect answer
function correctChoice() {
  userResultCorrect();
  scoreTotal();
}

function incorrectChoice() {
  userResultIncorrect();
}

//when an answer is choosen this fuction will check if it's right or wrong.
function answerChoice() {
  $('.answerForm').on('submit', 'form', function (event) {
    event.preventDefault();
    let choice = $('input:checked');
    let answer = choice.val();
    let correctAnswer = STORE[questNum].correctAnswer;
    if (answer === correctAnswer) {
      choice.parent().addClass('correct');
      correctChoice();
    } else {
      choice.parent().addClass('incorrect');
      incorrectChoice();
    }
  });
}

//render correct answer box
function userResultCorrect() {
  let correctAnswer = `${STORE[questNum].correctAnswer}`;
  $('.answerForm').html(`<div class="correctBox"><div class="icon"><img src="${STORE[questNum].icon}" alt="${STORE[questNum].alt}"/></div><p>Congratulations!</p><button type=button class="nextQuest">Next</button></div>`);
}

function userResultIncorrect() {
  let correctAnswer = `${STORE[questNum].correctAnswer}`;
  $('.answerForm').html(`<div class="correctBox"><div class="icon"><img src="${STORE[questNum].icon}" alt="${STORE[questNum].alt}"/></div><p>Sorry Maybe Next Time...<br>the right answer was <span>${correctAnswer}</span></p><button type=button class="nextQuest">Next</button></div>`);
}

//Next button
function nextButton() {
  $('.answerForm').on('click', '.nextQuest', function (event) {
    nextQuestion();
    generateQuest();
    //answerChoice();
  });
}

//score total 
function scoreTotal() {
  addScore();
  $('.score').text(totScore);
}

//generate the final score box at the end of the quiz
function finalResults() {
  if (totScore >= 9) {
    $('.answerForm').html(`<div class="correctBox results"><h2>Great Job! Thank you so much for playing my game.</h2><p>Your Final Score ${totScore} / 10</p><button class="restartButton">Play Again?</button></div>`);
  } else if (totScore < 9 && totScore >= 6) {
    $('.answerForm').html(`<div class="correctBox results"><h2>You know quite a bit about Nintendo.</h2><p>Your Final Score ${totScore} / 10</p><button class="restartButton">Play Again?</button></div>`);
  } else {
    $('.answerForm').html(`<div class="correctBox results"><h2>You had a tough time but this isn't Game over.</h2><p>Your Final Score ${totScore} / 10</p><button class="restartButton">Play Again?</button></div>`);
  }
  // gameOver();
}

//restart the quiz
function gameOver() {
  $('.answerForm').on('click', '.restartButton', function (event) {
    questNum = 0;
    totScore = 0;
    generateQuest();
    $('.answerForm').css('display', 'block');
    $('.correctBox').remove();
  });
}

//Run the quiz
function playQuiz() {
  startGame();
  answerChoice();
  nextButton();
  gameOver();
}

$(playQuiz);

