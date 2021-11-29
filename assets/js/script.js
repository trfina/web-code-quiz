const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
let currentQuestionIndex, shuffledQuestions
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let sec = 90;
// start timer
(function() {

    function startTimer(){
        console.log('timer suppose to go')
        var timer = setInterval(function(){
            sec--;
            document.getElementById('timerDisplay').innerHTML='Time Left: 00:'+sec;
            if (sec < 0) {
                clearInterval(timer);
                alert("Time is up!")
            }
        }, 1000);
    }
       
        document.getElementById('timerDisplay').innerHTML='Time Left: 00:'+ sec;
    
    startTimer();
})();

// start button to begin quiz
startButton.addEventListener('click', startQuiz)

// index for next question
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// hides the start button and randomly picks from list of questions
function startQuiz() {
    startButton.classList.add('hide')
    shuffledQuestions= questions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
// show questions and show color of correct question
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer (e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    }
    else {
        startButton.innerText = 'Game Over!'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong') 
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [ {
    question: "What does HTML stand for?",
    answers: [
        {text: 'Hypertext Marker Language', correct: false},
        {text: 'Hyper Type Markup Language', correct: false},
        {text: 'Hypertext Markup Language', correct: true},
        {text: 'Hypotext Markup Language', correct: false}
        ]
    },
    {
    question: "What is the meaning of variable++ ?",
    answers: [
        {text: 'Add one to the variable', correct: false},
        {text: 'Add one to the variable before using its value', correct: false},
        {text: 'Double the value in the variable', correct: false},
        {text: 'Add one to the variable after its current value has been used', correct: true}
        ]
    },
    {
    question: "What do you call a group of statements contained with an opening bracket and a closing bracket?",
    answers: [
        {text: 'A block statement', correct: true},
        {text: 'Groupware', correct: false},
        {text: 'Bracketed statements', correct: false},
        {text: 'Elemental brackets', correct: false}
        ]
    },
    {
    question: "Which of the following property is used to inc rease or decrease how bold or light a font appears?",
    answers: [
        {text: 'font-family', correct: false},
        {text: 'font-style', correct: false},
        {text: 'font-variant', correct: false},
        {text: 'font-weight', correct: true}
        ]
    }
]