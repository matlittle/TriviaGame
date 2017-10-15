// initialize variables needed to begin the game
var trivia = {
	// object to hold questions, choices, and correct answer
	one: {
		question: "A",
		answer: "A",
		choices: ["A","B","C","D"],
		asked: false 
	},
	two: {
		question: "B",
		answer: "B",
		choices: ["A","B","C","D"],
		asked: false 
	},
	three: {
		question: "C",
		answer: "C",
		choices: ["A","B","C","D"],
		asked: false 
	},
	four: {
		question: "D",
		answer: "D",
		choices: ["A","B","C","D"],
		asked: false 
	},
	five: {
		question: "A",
		answer: "A",
		choices: ["A","B","C","D"],
		asked: false 
	},
	six: {
		question: "B",
		answer: "B",
		choices: ["A","B","C","D"],
		asked: false 
	},
	seven: {
		question: "C",
		answer: "C",
		choices: ["A","B","C","D"],
		asked: false 
	},
	eight: {
		question: "D",
		answer: "D",
		choices: ["A","B","C","D"],
		asked: false 
	},
	nine: {
		question: "A",
		answer: "A",
		choices: ["A","B","C","D"],
		asked: false 
	},
	ten: {
		question: "B",
		answer: "B",
		choices: ["A","B","C","D"],
		asked: false 
	}
}

var contentDiv = $("#content");



// show initial starting screen with option to begin trivia game
function showStartPage() {
	var startDiv = $("<div>").className("row")
	var startBtn = $("<h2>").attr("id", "start-btn").text("Start");

	myAppend(startBtn, startDiv, contentDiv);

	$(startBtn).click(function() {
		$(contentDiv).html("");
		startGame();
	});
}

// once user clicks start, initialize the game
function startGame() {

	// object to hold stats (correct/incorrect/skipped)
	var stats = {
		correct: 0,
		incorrect: 0,
		unanswered: 0
	}

	function getRandomQuestion() {
		//get array of trivia object keys
		var keys = Object.keys('trivia');

		// get possible trivia questions where asked is false
		var possQuestions = jQuery.grep(keys, function(question){
			return !question.asked;
		});

		// get random number to select possible question
		randomNum = Math.floor(Math.random() * possQuestion.length);
		
		// return question
		return possQuestions[randomNum];
	}

}

	// show first question and start the timer

	// if the user answers correctly
		// show that they answered correctly
		// increment number of correct answers
		// after n seconds move to the next question

	// if they answer incorrectly
		// show the correct answer
		// increment number of incorrect guesses
		// after n seconds move to the next question

	// if the time runs out
		// show the correct answer
		// increment the number of skipped questions
		// after n seconds move to the next question

// after all questions have been asked
// show final stats page with number of correct/incorrect/skipped answers
// include button to restart game. 


// Function to append elements together
function myAppend() {
	for(var i = 0; i < arguments.length - 1; i += 1) {
		$(arguments[i+1]).append(arguments[i]);
	}
}


