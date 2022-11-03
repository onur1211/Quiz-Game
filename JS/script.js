

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
var correct;
var wrong;
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

function initialize() {

    questionNumber = Math.floor(Math.random() * 20);
    progressBarValue = 10;
    correct = 0;
    wrong = 0;

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

function next() {

    questionNumber = Math.floor(Math.random() * 20);
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

function previous() {

    questionNumber = Math.floor(Math.random() * 20);
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

function check() {

   if (answerInput.value == answers[questionNumber])
   {
       correct = correct + 1;
       correctAnswerMessage.hidden = false;
       wrongAnswerMessage.hidden = true;
   }
   else
   {
       wrong = wrong + 1;
       correctAnswerMessage.hidden = true;
       wrongAnswerMessage.hidden = false;
   }

   save();
}

function showResult() {
    resultMessage.hidden = false;
    resultMessage.innerText = resultMessage.innerText + " " + "Correct Answers: " + correct + " Wrong Answers: " + wrong;
    previousButton.hidden = true;
    nextButton.hidden = true;
    questionTitle.innerText = "Return to home and restart the game!";
    questionText.innerText = null;
    answerInput.hidden = true;
    submitButton.hidden = true;
    progressBar.hidden = true;
}

function save() {

    var file = {
        questionNumber: questionNumber,
        progressBarValue: progressBarValue,
        correct: correct,
        wrong: wrong
    };

    localStorage.setItem("file", JSON.stringify(file));
}

function load() {
    var file = JSON.parse(localStorage.getItem("file"));
    questionNumber = file.questionNumber;
    progressBarValue = file.progressBarValue;
    correct = file.correct;
    wrong = file.wrong;
}