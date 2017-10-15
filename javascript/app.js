// initialize variables needed to begin the game

// object to hold stats (correct/incorrect/skipped)
var stats = {
	correct: 0,
	incorrect: 0,
	unanswered: 0
}

var trivia = {
	// object to hold questions, choices, and correct answer
	one: {
		question: "A",
		answer: "A",
		choices: ["A","B","C","D"],
		order: 
	},
	two: {
		question: "B",
		answer: "B",
		choices: ["A","B","C","D"],
		order: 
	},
	three: {
		question: "C",
		answer: "C",
		choices: ["A","B","C","D"],
		order: 
	},
	four: {
		question: "D",
		answer: "D",
		choices: ["A","B","C","D"],
		order: 
	},
	five: {
		question: "A",
		answer: "A",
		choices: ["A","B","C","D"],
		order: 
	},
	six: {
		question: "B",
		answer: "B",
		choices: ["A","B","C","D"],
		order: 
	},
	seven: {
		question: "C",
		answer: "C",
		choices: ["A","B","C","D"],
		order: 
	},
	eight: {
		question: "D",
		answer: "D",
		choices: ["A","B","C","D"],
		order: 
	},
	nine: {
		question: "A",
		answer: "A",
		choices: ["A","B","C","D"],
		order: 
	},
	ten: {
		question: "B",
		answer: "B",
		choices: ["A","B","C","D"],
		order: 
	}
}

var mainDiv = $("#content");

// show initial starting screen with option to begin trivia game

// once user clicks start, initialize the game

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