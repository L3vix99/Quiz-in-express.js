function gamesRoutes(app) {
   
let = goodAnswers = 0;

let callToAFriendUsed = false;

let isGameOver = false;

let questionToTheCrowdUsed = false;

let halfOnHalfUsed = false;

const questions = [
    {
        question: 'Jaki jest najlepszy język programowania na świecie ?',

        answers: ['C++', 'Fortran', 'JavaScript', 'Java'],

        correctAnswer: 2,
    },
    {
        question: 'W jakim języku programowania wystepuje React?',

        answers: ['C++', 'Fortran', 'JavaScript', 'Java'],

        correctAnswer: 2,
    },
    {
        question: ' nieużyteczny język programowania to?',

        answers: ['nie ma takiego ;D', 'C++', 'JavaScript', 'Java'],

        correctAnswer: 0
    }
];

app.get('/question' , (req, res) => {

if(goodAnswers === questions.length) {
    res.json({
        winner: true,
    });


} else if (isGameOver) {

    res.json({
        loser: true,
    });

} else {
    const nextQuestion = 
    questions[goodAnswers];
    
    const { question, answers } = nextQuestion;

    res.json({

     question, answers
    })

}

});

app.post('/answer/:index', (req, res) => {

if(isGameOver) res.json({
    
        loser: true,
    });


// ODCZYTUJE INDEX PODANY PRZEZ UŻYTKOWNIKA 

const { index } = req.params;

//POBIERAM AKTUALNE PYTANIE

const question = questions[goodAnswers];


// SPRAWDZAM CZY ODPOWIEDZ JEST PRAWIDŁOWA
isGoodAnswer = question.correctAnswer === Number(index); 

//JEŻELI TAK TO WYKONUJE A JEZELI NIE TO W else 
if(isGoodAnswer) {

    goodAnswers++;

} else {

    isGameOver = true;

}

res.json({
    correct: isGoodAnswer,
    goodAnswers, 
});
});

app.get('/help/half', (req,res) => {

    if(halfOnHalfUsed) {
        return res.json({
            text: 'To kOŁO ratunkowe było już wykorzystane'
        });
    }

    //USTAWIAMY FLAGE NA TRUE (JUZ NIE MOZEMY WIECEJ RAZY DO NIE GO ZADZOWNIC)
    halfOnHalfUsed = true;
    
    const question = questions[goodAnswers];
    //do tabeli umieszcze wszysytkie odp oprócz tej prawidłowej 
    const answersCopy = question.answers.filter((s, index) => (
        index !== question.correctAnswer
    ));

    // Mnożymy nasza liczbe razy ilosc elementów, która znajduje sie w tablicy, 
    // obcinamy czesci dziesietne(~~) i powinien sie wygenerowac 
    // jakis losowy index z tablicy i go usnąć  
    
    answersCopy.splice(~~(Math.random() * answersCopy.length), 1);


    res.json({
        answersToRemove: answersCopy,
        });
})

app.get('/help/friend', (req,res) => {

    if(callToAFriendUsed) {
        return res.json({
            text: 'To kOŁO ratunkowe było już wykorzystane'
        });
    }

    //USTAWIAMY FLAGE NA TRUE (JUZ NIE MOZEMY WIECEJ RAZY DO NIE GO ZADZOWNIC)
    callToAFriendUsed = true;

    const doesFriendKnowAnswer = Math.random() < 0.5;
 
    const question = questions[goodAnswers];


    res.json({
        text: doesFriendKnowAnswer ?
         `wydaje mi sie ze odpowiedz to ${question.answers[question.correctAnswer]}`
         : 'no nie wiem... sorry ziom...'
        });
})

app.get('/help/crowd', (req,res) => {

    if(questionToTheCrowdUsed) {
        return res.json({
            text: 'To kOŁO ratunkowe było już wykorzystane'
        });
    }

    questionToTheCrowdUsed = true;

    const chart = [ 10,20,30,40 ];

    for (let i = chart.length - 1; i > 0; i--) {
        const change = (~~(Math.random() * 20 - 10));

        chart[i] += change;
        chart[i - 1] -= change;
    }

    const question = questions[goodAnswers];
    const { correctAnswer} = question;
    
    [chart[3], chart[correctAnswer]] =
    [chart[correctAnswer], chart[3]]; 

    res.json({
        chart,
    })

});

}

module.exports = gamesRoutes;