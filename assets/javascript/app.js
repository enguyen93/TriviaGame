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
}, {
    question: "what console"
}, {
    question: "what color"
}, {
    question: "what soda"
}, {
    question: "what show"
}, {
    question: "what lift"
}, {
    question: "quiz over"
}];



var answers = {
    array: [{
        answers: ["1", "H2", "3", "4"],
        correctAns: 1
    }, {
        answers: ["waw", "cod 4", "mw2", "mw3"],
        correctAns: 2
    }, {
        answers: ["yellow", "sapphire", "ruby", "blue"],
        correctAns: 1
    }, {
        answers: ["xbox", "playstation", "switch", "offbrand"],
        correctAns: 2
    }, {
        answers: ["yellow", "blue", "red", "green"],
        correctAns: 1
    }, {
        answers: ["root beer", "sprite", "coke", "pepsi"],
        correctAns: 0
    }, {
        answers: ["overlord", "boku no hero", "banana fish", "grand blue"],
        correctAns: 3
    }, {
        answers: ["deadlift", "bench", "curls", "squats"],
        correctAns: 3
    }, {
        answers: ["questions correct"],
        correctAns: 3 //should store the number of correct questions and push them into this 
    }
    ]
};

function startTimer(duration) {

    var timer = duration, seconds;
    something = setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeRemaining.text("Time Remaining: " + seconds);

        if (--timer <= -1) {
            let correctIndex = answers.array[currentA].correctAns
            let correctAnswer = answers.array[currentA].answers[correctIndex];
            timer = duration;
            //this line SHOULD make it wait 3 seconds, and THEN call the rest of the statements
            clearMyClock();
            answerHolder.empty();
            answerHolder.text("You ran out of Time! The correct answer was " + correctAnswer);


            setTimeout(function () {

                startTimer(10);
                currentQ++;
                currentA++;
                askQuestion();
                console.log("ran out of time");
            }, 3000);
        }
    }, 1000);
}


jQuery(function ($) {
    var oneMinute = 10 * 1;
    timeRemaining = $("#timeRemaining");
    startTimer(oneMinute);
    askQuestion();
});

//updates the html with the first question, and answer. every 60 seconds, the counter goes up by 1 and moves 
//along the array's index
function askQuestion() {
    // debugger;
    questionHolder.html(questions[currentQ].question);
    answerHolder.empty();
    //this for loop is to output every value inside the array, need to figure out how to push to separate lines though
    for (i = 0; i < 4; i++) {
        var button = $("<button>");
        button.text(answers.array[currentA].answers[i]);
        button.attr('data-id', i);
        answerHolder.append(button);
    }
}
//work on getting the choice to correspond to the actual click
$(document).on("click", "button", function () {
    var choice = $(this).data("id");
    //var for while loop true/false
    // var anotherTimer = false;
    //how to pass in the correctAns value as the index for the answers index?
    // var index = answers.array[currentA].correctAns;
    var correct = answers.array[currentA].correctAns;
    if (choice === correct) {
        answerHolder.empty();
        answerHolder.html("You got it correct! Good Job! Get ready for the next Question!");
        
        currentA++;
        currentQ++;
        clearMyClock();
        setTimeout(function () {
            askQuestion();
            startTimer(10);
        }, 3000);
        console.log("correct");
    }
    else {
        answerHolder.empty();
        answerHolder.html("You got it wrong! Maybe Next Time! Get ready for the next question!");
        currentA++;
        currentQ++;
        clearMyClock();
        setTimeout(function () {
            askQuestion();
            startTimer(10);
        }, 3000);
        console.log("incorrect");
    }
})

function clearMyClock() {
    clearInterval(something);
}

//function to call to make a popup box to congratulate
function congratulationsPopup () {
    var newBox = $("<container>");
    newBox.attr("style", "width: 500px; height: 500px");
    newBox.attr("id", "congratzPopup");
    $(document).append(newBox);
}



