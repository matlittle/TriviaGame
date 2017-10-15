// initialize variables needed to begin the game

// object to hold questions, choices, and correct answer
var trivia = {
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


showStartPage();

// show initial starting screen with option to begin trivia game
function showStartPage() {
	var startDiv = $("<div>").addClass("row")
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

	var startTime = 15;

	console.log(getRandomQuestion());


	function buildTimerElement() {
		var timerRow = $("<div>").addClass("row");
		var timerCol = $("<div>").addClass("col-xs-12");
		var timerText = $("<h4>").text("Time Remaining: ");
		var countdown = $("<span>").attr("id", "countdown");
		$(countdown).text(`${startTime} Seconds`);

		myAppend(countdown, timerText, timerCol, timerRow);
	}

	function getRandomQuestion() {
		//get array of trivia object keys
		var keys = Object.getOwnPropertyNames(trivia);

		// get possible trivia questions where asked is false
		var possQuestions = jQuery.grep(keys, function(question){
			return !trivia[question].asked;
		});

		// get random number to select possible question
		randomNum = Math.floor(Math.random() * possQuestions.length);
		
		// return question
		return possQuestions[randomNum];
	}

	function showQuestion(questionObj) {


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


