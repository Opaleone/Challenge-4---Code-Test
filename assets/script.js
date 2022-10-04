var question = document.getElementById('question');
var answer = document.querySelector('#question-answers');
var intro = document.querySelector('#introduction');
var answer1 = document.querySelector('#answer1');
var answer2 = document.querySelector('#answer2');
var answer3 = document.querySelector('#answer3');
var answer4 = document.querySelector('#answer4');
var timer = document.querySelector('#timer');
var highscores = document.querySelector('#highscore');
var leaderBoard = document.querySelector('#leaderboard');

var count = 0;

const start = document.querySelector('#start-button');


const questions = {
  question1: 'Which is NOT a primitive data type?',
  question2: 'What does CSS stand for?',
  question3: 'Which one is a semantic HTML element?',
  question4: 'How do you select an ID in CSS?',
  question5: 'Which is used to link a Javascript file?'
}


const answers = {
  question1W: ['string', 'number', 'boolean', 'object'],
  question2W: ['Crevice Sand Storm', 'Computer Secret Sauce', 'Computer Science Sheets', 'Cascading Style Sheets'],
  question3W: ['<div>', '<head>', '<h1>', '<section>'],
  question4W: ['.selector', 'selector', '#selector', '/selector'],
  question5W: ['<connect>','<join>', '<append>','<link>']
}

const correctAnswerIndex = [3, 3, 3, 2, 3];

var secondsLeft = 60;

var timerInterval;

var scoreHistory = localStorage.getItem('highScores');

var scores = JSON.parse(scoreHistory);

// Timer

function timerCounter() {
  secondsLeft--;
  timer.textContent = secondsLeft;
  
  if (secondsLeft === 0) {
    clearInterval(timerInterval);
    // All steps required to end game
  }
}


// Questions

function startQuiz() {

  intro.style.display = 'none';
  question.style.display = 'flex';

  timerInterval = setInterval(timerCounter, 1000);
  displayQuestion();
}

function nextQuestion(evt) {
  // Set new questions and answers
  // let wtf = question.childElementCount;

  // console.log(question.children[wtf]);


  if (question.childElementCount === 3) {
    question.lastChild.remove();
  } 


  let userInput = evt.target.getAttribute('id');
  let pEl = document.createElement('p');

  pEl.setAttribute('id', 'status');

  userInput = parseInt(userInput[userInput.length-1]) - 1;

  // console.log(userInput);


  if (userInput === correctAnswerIndex[count]) {
    pEl.textContent = 'Correct!';
    question.appendChild(pEl);
    secondsLeft += 6;
  } else {
    pEl.textContent = 'WRONG!';
    question.appendChild(pEl);
    secondsLeft -= 12;
  }
  
  
  // console.log(`User Input ${userInput}`);
  // console.log(`Correct Answer Array: ${correctAnswerIndex[count]}`);

  count++;
  // console.log(`Count: ${count}`);
  displayQuestion();

}

function displayQuestion() {

  if (count < 5) {
    question.children[0].textContent = questions[Object.keys(questions)[count]];
    let myArr = answers[Object.keys(answers)[count]];

    for (let i = 0; i < 4; i++) {
      answer.children[i].textContent = myArr[i];
    }
  } else {
    question.style.display = 'none';
    clearInterval(timerInterval);
    timer.textContent = secondsLeft;
    var leaderBoard = prompt(`Here is your score: ${secondsLeft}.\nPlease enter you name:`)
    scores = Object.assign({leaderBoard: secondsLeft});
    console.log(scores)
    localStorage.setItem('highScores', JSON.stringify(scores));

    displayLeaderboard();
  }

  // count++
  // console.log(`Count: ${count}`);
}


// Leaderboard

function displayLeaderboard() {
  


}

start.addEventListener('click', startQuiz);

answer1.addEventListener('click', nextQuestion);
answer2.addEventListener('click', nextQuestion);
answer3.addEventListener('click', nextQuestion);
answer4.addEventListener('click', nextQuestion);

// highscores.addEventListner('click', displayLeaderboard);