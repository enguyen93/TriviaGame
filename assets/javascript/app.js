var questionHolder = $(".questionHolder");
var answerHolder = $(".answerHolder");
var incorrectHolder = $(".incorrectHolder");
var noAnswerHolder = $(".noAnswerHolder");
var $newGameButton = $("#newGameButton");
var newGameButtonContainer = $(".newGameButtonContainer");
var anotherAnswerHolder = $(".anotherAnswerHolder");
var gameName = $(".gameName");
var howManyC = 0;
var howManyW = 0;
var unAnswered = 0;
var currentQ = 0;
var currentA = 0;

var questions = [{
    question: "This small cookie contains 5 grams of carbohydrates, 10 grams of fat, and 5 grams of protein. How many Calories does this food provide?"
}, {
    question: "Treatment protocols for protein-energy malnutrition begin with: "
}, {
    question: "Which of the following are essential amino acids for infants?"
}, {
    question: "Which one of the following fatty acids is considered essential from a nutritional point of view?"
}, {
    question: "Steatorrhea is associated with all of the following EXCEPT:"
}, {
    question: "Medium chain triglycerides"
}, {
    question: "The pancreas produces and secretes all of the following digestive enzymes (or their precursors) EXCEPT:"
}, {
    question: "Bulimia is characterized by"
}, {
    question: "All Done, Heres how you did!"
}];

var answers = {
    array: [{
        answers: ["100 Cal", "180 Cal", "130 Cal", "20 Cal"],
        correctAns: 2
    }, {
        answers: ["Replenishment of fluids followed by gradual increase in high quality protein and/or calories in the diet", "supplementation of the diet with a high protein/high calorie drink", "weight bearing exercise", "fruit drinks"],
        correctAns: 0
    }, {
        answers: ["Histidine and arginine", "leucine, isoleucine and valine", "tryptophan and methionine", "All of them"],
        correctAns: 3
    }, {
        answers: ["Arachidonic acid (20:4)", "docosahexaenoic acid (22:6)", "linoleic acid (18:2)", "	palmitoleic acid (16:1)"],
        correctAns: 2
    }, {
        answers: ["pancreatic exocrine insufficiency", "pancreatic beta-call insufficiency", "loss of the proximal small intestine", "intestinal villous malfunction"],
        correctAns: 1
    }, {
        answers: ["can be absorbed intact without hydrolysis", "can be absorbed via the portal vein", "The first 2 choices", "contain mainly myristic acid (C:14)"],
        correctAns: 0
    }, {
        answers: ["alpha-amylase", "chymotrypsin", "cholesteryl ester hydrolase", "lactase"],
        correctAns: 3
    }, {
        answers: ["avoidance of carbohydrate-containing foods", "vitamin deficiencies", "hyperthyroidism", "dental caries"],
        correctAns: 3
    }, {
        answers: ["Thanks for playing my game!"],
        correctAns: 0
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
            timer = duration;
            clearMyClock();
            answerHolder.empty();
            timeOutWrong();


            setTimeout(function () {

                startTimer(60);
                currentQ++;
                currentA++;
                askQuestion();
                unAnswered++;
                console.log("ran out of time");
            }, 5000);

        }
    }, 1000);
}

jQuery(function ($) {
    var oneMinute = 60 * 1;
    timeRemaining = $("#timeRemaining");
    timeRemaining.css({ "font-size": "250%", "position": "relative", "text-align": "center" });
    gameName.css({ "font-size": "500%", "position": "relative", "text-align": "center" });
    startTimer(oneMinute);
    askQuestion();
    newGameBtn();

});

//updates the html with the first question, and answer. every 60 seconds, the counter goes up by 1 and moves 
//along the array's index
function askQuestion() {
    questionHolder.html(questions[currentQ].question);
    questionHolder.css({ "font-size": "250%", "position": "relative", "text-align": "center" });
    answerHolder.empty();
    //this for loop is to output every value inside the array
    for (i = 0; i < 4; i++) {
        var choice = $("<p>");
        choice.text(answers.array[currentA].answers[i]);
        choice.attr('data-id', i);
        choice.css({ "cursor": "pointer", "font-size": "200%", "position": "relative", "text-align": "center" });
        answerHolder.append(choice);
        console.log(currentQ);
    }
}
//work on getting the choice to correspond to the actual click
$(document).on("click", "p", function () {
    var choice = $(this).data("id");
    var correct = answers.array[currentA].correctAns;
    if (choice === correct) {
        answerHolder.empty();
        congratulationsPopup();
        currentA++;
        currentQ++;
        clearMyClock();
        setTimeout(function () {
            askQuestion();
            startTimer(60);
            howManyC++;
            endGameStats();
        }, 5000);
        console.log("correct");
    }
    else {
        answerHolder.empty();
        incorrectBox();
        currentA++;
        currentQ++;
        clearMyClock();
        setTimeout(function () {
            askQuestion();
            startTimer(60);
            howManyW++;
            endGameStats();
        }, 5000);
        console.log("incorrect");
    }
})

function clearMyClock() {
    clearInterval(something);
}


//function to call to make a popup box to congratulate
function congratulationsPopup() {
    let correctBox = $("<p>");
    correctBox.text("You got it correct! Good Job! Get ready for the next Question!");
    correctBox.css({ "font-size": "150%", "position": "relative", "text-align": "center" });
    answerHolder.append(correctBox);
}

function incorrectBox() {
    let correctIndex = answers.array[currentA].correctAns
    let correctAnswer = answers.array[currentA].answers[correctIndex];
    let incorrectBox = $("<p>");
    incorrectBox.text("You got it wrong! Maybe Next Time! Get ready for the next question! The correct answer was " + correctAnswer);
    incorrectBox.css({ "font-size": "150%", "position": "relative", "text-align": "center" });
    answerHolder.append(incorrectBox);
}

function timeOutWrong() {
    let correctIndex = answers.array[currentA].correctAns
    let correctAnswer = answers.array[currentA].answers[correctIndex];
    let incorrectBox = $("<p>");
    incorrectBox.text("You ran out of time! Maybe Next Time! Get ready for the next question! The correct answer was " + correctAnswer);
    incorrectBox.css({ "font-size": "150%", "position": "relative", "text-align": "center" });
    answerHolder.append(incorrectBox);
}

function endGameStats() {
    if (currentQ === 8) {
        let correctAnswers = $("<p>");
        let incorrectAnswers = $("<p>");
        let noAnswers = $("<p>");
        correctAnswers.text("How Many Correct " + howManyC);
        correctAnswers.css({ "font-size": "150%", "position": "relative", "text-align": "center" });
        anotherAnswerHolder.append(correctAnswers);
        incorrectAnswers.text("How Many Incorrect " + howManyW);
        incorrectAnswers.css({ "font-size": "150%", "position": "relative", "text-align": "center" });
        incorrectHolder.append(incorrectAnswers);
        noAnswers.text("How many were unanswered " + unAnswered);
        noAnswers.css({ "font-size": "150%", "position": "relative", "text-align": "center" });
        noAnswerHolder.append(noAnswers);
        clearMyClock();
    }
}
//need to figure out when to call the endgamestats function

function newGameBtn() {
    let button = $("<button>");
    button.attr("type", "button");
    button.addClass("someClass");
    button.attr("id", "newGameButton");
    button.text("Restart?");
    button.css({ "font-size": "220%", "text-align": "center", "background": "#2ecc71", "box-shadow": "0px 5px 0px 0px #15B358" });
    newGameButtonContainer.append(button);
}

newGameButtonContainer.on('click', function () {
    newGame1();
    anotherAnswerHolder.empty();
    incorrectHolder.empty();
    noAnswerHolder.empty();
});

function newGame1() {
    currentA = 0;
    currentQ = 0;
    howManyC = 0;
    howManyW = 0;
    unAnswered = 0;
    clearMyClock();
    askQuestion();
    startTimer(60);
}
