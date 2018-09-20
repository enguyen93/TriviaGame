var questionHolder = $(".questionHolder");
var answerHolder = $(".answerHolder");
var currentQ = 0;
var currentA = 0;
var howManyCorrect = 0;

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
    question: "quiz over"
}];



var answers = {
    array: [{
        answers: ["100 Cal", "180 Cal", "130 Cal", "20 Cal"],
        correctAns: 2
    }, {
        answers: ["Replenishment of fluids followed by gradual increase in high quality protein and/or calories in the diet", "supplimentation of the diet with a high protein/high calorie drink", "weight bearing exercise", "fruit drinks"],
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
    let correctIndex = answers.array[currentA].correctAns
    let correctAnswer = answers.array[currentA].answers[correctIndex];
    var correct = answers.array[currentA].correctAns;
    if (choice === correct) {
        answerHolder.empty();
        answerHolder.html("You got it correct! Good Job! Get ready for the next Question!");
        // congratulationsPopup();
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
        answerHolder.html("You got it wrong! Maybe Next Time! Get ready for the next question! The correct answer was " + correctAnswer);
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
// function congratulationsPopup () {
//     var div = $('<div class="congratzPopupClass">');
//     div.attr("style", "width: 500px; height: 500px");
//     div.attr("id", "congratzPopup");
//     div.text("Hey you got it right");
//     answerHolder.append(div);
// }
//so far this only adds the text underneath the other congratz message


