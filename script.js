var riddleArray = [
    {
        question:'What is the first number in an array',
        choices:['zero','one'],
        answer:'zero',
    },
    {
        question:'Booleans only have two values.',
        choices: ['True','False'],
        answer: 'True',
    },{
        question:'Which of the following is not a JSON value?',
        choices: ['String','Number','Object','Function'],
        answer: 'Function',
    },{
        question:'How do I return the absolute value of x?',
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







/*game end function to stop after the fourth question*/
function gameEnds(){
    riddleContainer.innerHTML ='End';
    clearInterval(timerInterval);
    var newIni = window.prompt(timerCountDown,'Save your initials');
    scoreKeep(timerCountDown,newIni);
    containerFour = document.getElementById('score-tracker');
    containerFour.textContent = scoreGet();
}
/*to start the countdown timer*/
function beginTime (){
    timerCountDown--;
    time.textContent = timerCountDown;
}
/*going through my riddle array and pulling each question to display on the page*/
function questionGenerator(){
    if (selectedRiddleIndex === riddleArray.length){
        gameEnds();
    }
    var riddle = document.createElement('p');
    riddle.textContent = riddleArray[selectedRiddleIndex].question;
    var answerLog = document.createElement('ol');
    for (let index = 0; index < riddleArray[selectedRiddleIndex].choices.length; index++) {
        var selectedAnswer = document.createElement('li');
        selectedAnswer.textContent = riddleArray[selectedRiddleIndex].choices[index];
        answerLog.append(selectedAnswer);
    }
riddleContainer.append(riddle);
riddleContainer.append(answerLog);
}
/*This function is checking the answer and compairing it to the array to determin correct and incorrect answers*/
function auditAnswer(event){
    var answerChoice = event.target.textContent;
    var answeredCorrect = document.createElement('p');
    if (answerChoice === riddleArray[selectedRiddleIndex].answer){
        answeredCorrect.textContent = ('Correct!')
        time.append(answeredCorrect);
    } else {
        answeredCorrect.textContent = ('Incorrect!');
        timerCountDown -= 15;
        time.append(answeredCorrect);
    }
    


/*to clear the last question and setup the next.*/
    riddleContainer.innerHTML = '';
    selectedRiddleIndex++;
    questionGenerator();

}

/*starts the quiz on the click of the button*/
function quizStarter(){
riddleBtn.classList.add('hide');
questionGenerator();
timerInterval = setInterval(beginTime,1000);
}

/*scoreKeep to store the score and scoreGet to pull the score*/
function scoreKeep (newScore,newInitials){
var oldScores = localStorage.getItem('score');
if(!oldScores || oldScores.length === 0){
    oldScores = '{}'
}
/*Trying to use JSON to hold the old scores and post them to the page.*/
var jsonScores = JSON.parse(oldScores);
jsonScores[newInitials] = newScore;
localStorage.setItem('score',JSON.stringify(jsonScores));

}
/*need to pull the score data saved to local storage*/
function scoreGet (){
    var getScore = localStorage.getItem('score');
    return getScore;
}




/*listening for the clicks to start the game and check answers.*/
riddleBtn.addEventListener('click', quizStarter);
riddleContainer.addEventListener('click', auditAnswer);
/*should I have an event listner to call the score function to display the score*/