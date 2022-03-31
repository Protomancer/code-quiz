var riddleArray = [
    {
        question:"placeholderquestion",
        choices:["one","two","three","four"],
        answer:"two",
    },
    {
        question:"placeholderquestiontwo",
        choices: ['one','two','three','four'],
        answer: 'placeholderanswer',
    },{
        question:"placeholderquestiontwo",
        choices: ['one','two','three','four'],
        answer: 'placeholderanswer',
    },{
        question:"placeholderquestiontwo",
        choices: ['one','two','three','four'],
        answer: 'placeholderanswer',
    },
];

var riddleBtn = document.getElementById('riddle-button');
var riddleContainer = document.querySelector('#riddle-container');
var time = document.querySelector('#time')
var timerCountDown = riddleArray.length *15;
var timerInterval;
var selectedRiddleIndex = 0;

function gameEnds(){
    riddleContainer.innerHTML ="End";
    clearInterval(timerInterval);
}

function beginTime (){
    timerCountDown--;
    time.textContent = timerCountDown;
}

function questionGenerator(){
    if (selectedRiddleIndex === riddleArray.length){
        gameEnds();
    }
    var riddle = document.createElement("p");
    riddle.textContent = riddleArray[selectedRiddleIndex].question;
    var answerLog = document.createElement("ol");
    for (let index = 0; index < riddleArray[selectedRiddleIndex].choices.length; index++) {
        var selectedAnswer = document.createElement("li");
        selectedAnswer.textContent = riddleArray[selectedRiddleIndex].choices[index];
        answerLog.append(selectedAnswer);
    }
riddleContainer.append(riddle);
riddleContainer.append(answerLog);
}

function auditAnswer(event){
    var answerChoice = event.target.textContent;
    var answeredCorrect = document.createElement("p");
    if (answerChoice === riddleArray[selectedRiddleIndex].answer){
        answeredCorrect.textContent = ("Correct!")
        time.append(answeredCorrect);
    } else {
        answeredCorrect.textContent = 'Incorrect!';
        timerCountDown -= 6;
        time.append(answeredCorrect);

    }
    riddleContainer.innerHTML = "";
    selectedRiddleIndex++;
    questionGenerator();

}


function quizStarter(){
questionGenerator();
timerInterval = setInterval(beginTime,1000);
}













riddleBtn.addEventListener('click', quizStarter);
riddleContainer.addEventListener("click", auditAnswer);