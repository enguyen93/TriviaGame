var questionHolder = $(".questionHolder");
var answerHolder = $(".answerHolder");

var currentQ = 0;
var currentA = 0;

var questions = [{
    question: "what halo"
}, {
    question: "what cod"
}, {
    question: "what pokemon"
}];



var answers = {
    array: [{
        answers: ["1", "2", "3", "4"]
    }, {
        answers: ["waw", "cod 4", "mw2", "mw3"]
    }, {
        answers: ["yellow", "sapphire", "ruby", "blue"]
    }
    ]
};

function startTimer(duration, timeRemaining) {
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeRemaining.text("Time Remaining: " + seconds);

        if (--timer <= -1) {
            timer = duration;
            currentQ++;
            currentA++;
            askQuestion();

        }
    }, 1000);
}

jQuery(function ($) {
    var oneMinute = 10 * 1;
    timeRemaining = $("#timeRemaining");
    startTimer(oneMinute, timeRemaining);
});

function askQuestion() {
    questionHolder.html(questions[currentQ].question);
    for (i = 0; i < answers.array.length; i++) {
        answerHolder.html(answers.array[currentA].answers.join("   "));
    }
}
askQuestion();

