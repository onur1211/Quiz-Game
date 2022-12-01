
const questions = [["What does JS stand for?"], ["What is Bootstrap?"], ["What does CSS stand for?"], ["What does HTML stand for?"], ["In which year was JavaScript invented?"],
["Who invented JavaScript?"], ["What is JSON?"], ["What is important in Webdesign?"], ["What does DOM stand for?"], ["How many sites (in %) are using JavaScript?"],
["Is JavaScript Case Sensitive (Yes/No)?"], ["What is TypeScript?"], ["Which company invented TypeScript?"], ["Which Framework (starting with A) is based on TypeScript?"], ["Which company invented Bootstrap?"],
["In which year was HTML invented?"], ["What was the first phone with internet access?"], ["Which is currently the leading/most used browser?"], ["What is React?"], ["In which year was React invented?"]];


const answers = [["JavaScript"], ["Frontend Framework"], ["Cascading Style Sheets"], ["Hypertext Markup Language"], ["1995"], 
["Brendan Eich"], ["Data format in text form"], ["Responsive Webdesign"], ["Document Object Model"], ["98%"],
["Yes"], ["JavaScript with syntax for types"], ["Microsoft"], ["Angular"], ["Twitter"],
["1990"], ["Nokia 9000 Communicator"], ["Google Chrome"], ["JavaScript library for building user interfaces"], ["2013"]];

var questionNumber;
var progressBarValue;
var correctAnswerCount;
var wrongAnswerCount;
var questionTitle;
var questionText;
var progressBar;
var previousButton;
var nextButton;
var submitButton;
var answerInput;
var resultMessage;
var correctAnswerMessage;
var wrongAnswerMessage;

// Used for starting the quiz.
function start() {

    initialize();

    if (questionNumber == 0)
    {
        previousButton.hidden = true;
    }

    progressBar.style.width = progressBarValue + "%";
    questionTitle.innerText = "Question " + questionNumber;
    questionText.innerText = questions[questionNumber];
}

// Used for initializing.
function initialize() {

    questionNumber = randomNumber(20);
    progressBarValue = 0;
    correctAnswerCount = 0;
    wrongAnswerCount = 0;

    questionTitle = document.getElementById("question-title");
    questionText = document.getElementById("question-text");
    progressBar = document.getElementById("progress-Bar");
    previousButton = document.getElementById("previous-button");
    nextButton = document.getElementById("next-button");
    submitButton = document.getElementById("submit-button");
    answerInput = document.getElementById("answer-input");
    resultMessage = document.getElementById("result-message");
    correctAnswerMessage = document.getElementById("correct-answer-message");
    wrongAnswerMessage = document.getElementById("wrong-answer-message");
}

// Used for going to the next question.
function next() {

    questionNumber = randomNumber(20);
    progressBarValue = progressBarValue + 10;
    answerInput.value = null;
    progressBar.style.width = progressBarValue + "%";
    correctAnswerMessage.hidden = true;
    wrongAnswerMessage.hidden = true;

    if (questionNumber > 0)
    {
        previousButton.hidden = false;
    }

    if (questionNumber >= questions.length || progressBarValue > 100)
    {
        showResult();
        return;
    }

    questionTitle.innerText = "Question " + questionNumber;
    questionText.innerText = questions[questionNumber];

    save();
}

// Used for going to the previous question.
function previous() {

    questionNumber = randomNumber(20);
    progressBarValue = progressBarValue - 10;
    answerInput.value = null;
    progressBar.style.width = progressBarValue + "%";
    correctAnswerMessage.hidden = true;
    wrongAnswerMessage.hidden = true;

    if (questionNumber == 0)
    {
        previousButton.hidden = true;
    }
    
    questionTitle.innerText = "Question " + questionNumber;
    questionText.innerText = questions[questionNumber];

    save();
}

// Used for checking the answer.
function check() {

   if (answerInput.value == answers[questionNumber])
   {
       correctAnswerCount = correctAnswerCount + 1;
       correctAnswerMessage.hidden = false;
       wrongAnswerMessage.hidden = true;
   }
   else
   {
       wrongAnswerCount = wrongAnswerCount + 1;
       correctAnswerMessage.hidden = true;
       wrongAnswerMessage.hidden = false;
   }

   save();
}

function randomNumber(value) {
    return Math.floor(Math.random() * value);
}

// Used for showing the results.
function showResult() {
    resultMessage.hidden = false;
    resultMessage.innerText = resultMessage.innerText + " " + "Correct Answers: " + correctAnswerCount + " Wrong Answers: " + wrongAnswerCount;
    previousButton.hidden = true;
    nextButton.hidden = true;
    questionTitle.innerText = "Return to home and restart the game!";
    questionText.innerText = null;
    answerInput.hidden = true;
    submitButton.hidden = true;
    progressBar.hidden = true;
}

// Used for saving the current progress.
function save() {

    var file = {
        questionNumber: questionNumber,
        progressBarValue: progressBarValue,
        correctAnswerCount: correctAnswerCount,
        wrongAnswerCount: wrongAnswerCount
    };

    localStorage.setItem("file", JSON.stringify(file));
}

// Used for loading the progress.
function load() {
    var file = JSON.parse(localStorage.getItem("file"));
    questionNumber = file.questionNumber;
    progressBarValue = file.progressBarValue;
    correctAnswerCount = file.correctAnswerCount;
    wrongAnswerCount = file.wrongAnswerCount;
}