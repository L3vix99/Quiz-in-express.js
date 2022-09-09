const question  = document.querySelector('#question');
const gameBoard = document.querySelector('#game-board');
const h2 = document.querySelector('h2');


function fillQuestionElements(data) {
if(data.winner === true ){

gameBoard.style.display = 'none';
h2.innerText = 'WYGRALES !!!';
return;
}

if(data.loser === true) {
    gameBoard.style.display = 'none';
    h2.innerText = 'nie poszło tym razem, spróbuj ponownie';
    return;
}


question.innerText = data.question;

for(const i in data.answers) {

const answerEl = document
.querySelector(`#answer${Number(i)+1}`);
answerEl.innerText = data.answers[i];
}
}

function showNextQuestion() {

fetch('/question', {
     method: 'GET',   
})
.then(res => res.json())
.then(data => {
     fillQuestionElements(data);
});
}

showNextQuestion();

const goodAnswersSpan = document.querySelector('#good-answers');

function handleAnswerFeedback(data) {
goodAnswersSpan.innerText = data.goodAnswers;
showNextQuestion();
}

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',

    })
    .then(res=>res.json())
    .then(data => {
        handleAnswerFeedback(data);
    })
}

const buttons = document.querySelectorAll('.answer-btn');

for(const button of buttons) {

    button.addEventListener('click', (e) => {

        const answerIndex = e.target.dataset.answer;
        sendAnswer(answerIndex);

    })
}
const tipdiv = document.querySelector('#tip');

function handleFriendsAnswer(data) {

    tipdiv.innerText = data.text;
}

function callToAFriend() {
    
    fetch('/help/friend', {
        method: 'GET',

    })
    .then(res => res.json())
    .then(data => {
        handleFriendsAnswer(data);
    });
}
    document.querySelector('#callToFriend')
    .addEventListener('click',callToAFriend);

     
    function handleHalfOnHalfAnswer(data) {
        if(typeof data.text === 'string') {
           tipdiv.innerText = data.text; 
        } else {
            for(const button of buttons) {

            //jeżeli przycisk ma innertext ustawiony na jeden z tych co mamy usunąć to wtedy bedziemy mu chcieli wyzerowac tekst 

            if(data.answersToRemove.indexOf(button.innerText) > - 1) {
                button.innerText = '';
            }
           }
        }
    }

    function halfOnHalf() {
        fetch('/help/half', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            handleHalfOnHalfAnswer(data);
        })
    }

    document.querySelector('#halfOnHalf')
    .addEventListener('click', halfOnHalf)

    

    function handleAnswerCrowd(data) {
        if(typeof data.text === 'string') {
            tipdiv.innerText = data.text;
        } else {
          data.chart.forEach((percent, index) => {
         
            buttons[index].innerText = 
            `${buttons[index].innerText}  : ${percent}%`;
          })         
        }
    }

    function questionToTheCrowd() {
        fetch('/help/crowd', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            handleAnswerCrowd(data);
        })
    }

    document.querySelector('#questionToTheCrowd')
    .addEventListener('click', questionToTheCrowd)
