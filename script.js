var riddleArray = [
    {
        question:"What is the first number in an array",
        choices:["zero","one"],
        answer:"zero",
    },
    {
        question:"Booleans only have two values.",
        choices: ['True','False'],
        answer: 'True',
    },{
        question:"Which of the following is not a JSON value?",
        choices: ['String','Number','Object','Function'],
        answer: 'Function',
    },{
        question:"How do I return the absolute value of x?",
        choices: ['log(x)','floor(x)','abs(x)','acos(x)'],
        answer: 'abs(x)',
    },
];

var riddleBtn = document.getElementById('riddle-button');
var riddleContainer = document.querySelector('#riddle-container');
var time = document.querySelector('#time')
var timerCountDown = riddleArray.length *15;
var timerInterval;
var selectedRiddleIndex = 0;
var containerTwo = document.getElementsByClassName('container-two');

var containerFour = document.getElementById('score-tracker');

/*to pull score?*/
var scoreBoard = document.querySelector('#score-tracker');





/*game end function to stop after the fourth question*/
function gameEnds(){
    riddleContainer.innerHTML ="End";
    scoreKeep();
    clearInterval(timerInterval);
    window.prompt(timerCountDown,"Save your initials");
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
/*This function is checking the answer and compairing it to the array to determin correct and incorrect answers*/
function auditAnswer(event){
    var answerChoice = event.target.textContent;
    var answeredCorrect = document.createElement("p");
    if (answerChoice === riddleArray[selectedRiddleIndex].answer){
        answeredCorrect.textContent = ("Correct!")
        time.append(answeredCorrect);
    } else {
        answeredCorrect.textContent = 'Incorrect!';
        timerCountDown -= 0;
        time.append(answeredCorrect);
    }
    


/*to clear the last question and setup the next.*/
    riddleContainer.innerHTML = "";
    selectedRiddleIndex++;
    questionGenerator();

}

/*starts the quiz on the click of the button*/
function quizStarter(){
riddleBtn.classList.add("hide");
questionGenerator();
timerInterval = setInterval(beginTime,1000);
}

function scoreKeep (){
localStorage.setItem("score",timerCountDown);
}














riddleBtn.addEventListener('click', quizStarter);
riddleContainer.addEventListener("click", auditAnswer);