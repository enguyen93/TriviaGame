var questionHolder = $(".questionHolder");
var answerLoc1 = $("#answerLoc1");
var answerLoc2 = $("#answerLoc2");
var answerLoc3 = $("#answerLoc3");
var answerLoc4 = $("#answerLoc4");


var obj = {
    questions: [{
        question: "what halo",
        answer1: "1",
        answer2: "2",
        answer3: "3",
        answer4: "4"
    }, {
        question: "what cod",
        answer1: "1",
        answer2: "2",
        answer3: "3",
        answer4: "4"
    }, {
        question: "what pokemon",
        answer1: "yellow",
        answer2: "blue",
        answer3: "red",
        answer4: "sapphire"
    }]
};

function startTimer(duration, timeRemaining) {
    var timer = duration, seconds;
    setInterval(function(){
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeRemaining.text("Time Remaining: " + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

jQuery(function ($) {
    var oneMinute = 60 * 1;
        timeRemaining = $("#timeRemaining");
    startTimer(oneMinute,timeRemaining); 
});

function question() {
    for(var i=0; i<obj.questions[0]; i++) {
        console.log(i);
    }
}
question();


// function question() {
//     questionHolder.text(obj.questions[0].question);
//     answerLoc1.text(obj.questions[0].answer1);
//     answerLoc2.text(obj.questions[0].answer2);
//     answerLoc3.text(obj.questions[0].answer3);
//     answerLoc4.text(obj.questions[0].answer4);
// }
// question();
