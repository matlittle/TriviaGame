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

	// variable to hold starting time for each question
	var startTime = 15;

	// object to hold current question
	var currentQuestion;

	// timeout and interval variables
	var questionTime, countdown;

	init();

	// function to initialize game area, choose first question, and start timer
	function init() {
		buildTimerElement();

		buildPlayArea();

		buildQuestionElement(getRandomQuestion());

		startTimers();
	}

	// build initil timer element and append to page
	function buildTimerElement() {
		var timerRow = $("<div>").addClass("row").attr("id", "timer-row");
		var timerCol = $("<div>").addClass("col-xs-12");
		var timerText = $("<h4>").text("Time Remaining: ");
		var countdown = $("<span>").attr("id", "countdown");
		$(countdown).text(`${startTime} Seconds`);

		myAppend(countdown, timerText, timerCol, timerRow, contentDiv);
	}

	// build and append initial timer element
	function buildPlayArea() {
		var playArea = $("<div>").addClass("row").attr("id", "play-area-row");
		$(contentDiv).append(playArea);
	}

	// build question element from given question object
	function buildQuestionElement(obj) {
		var playArea = $("#play-area-row");

		var question = $("<div>").addClass("col-xs-12").attr("id", "question");
		var questionText = $("<h4>").text(obj.question);

		var choices = $("<div>").addClass("col-xs-12").attr("id", "choices");
		var choicesList = buildChoicesList(obj.choices);

		// set asked to true for current question
		obj.asked = true;

		myAppend(questionText, question, playArea);
		myAppend(choicesList, choices, playArea);

		// build choices list from question choices array
		function buildChoicesList(arr) {
			var list = $("<ul>");

			arr.forEach(function(choice) {
				var listItem = $("<li>").text(choice);
				attachClickListener(listItem);
				$(list).append(listItem);
			})

			return list;

			function attachClickListener(el) {
				$(el).click(function() {
					$(el).off("click");
					checkAnswer(this);
				});
			}
		}
	}

	// get a random question that has not been asked
	function getRandomQuestion() {
		//get array of trivia object keys
		var keys = Object.getOwnPropertyNames(trivia);

		// get possible trivia questions where asked is false
		var possQuestions = jQuery.grep(keys, function(question){
			return !trivia[question].asked;
		});

		// get random number to select possible question
		randomNum = Math.floor(Math.random() * possQuestions.length);
		
		// set current question variable to randomly selected question
		currentQuestion = trivia[possQuestions[randomNum]]

		// return current question
		return currentQuestion;
	}

	// start the timer for the current question
	function startTimers() {
		// call the questionTimeUp function if time runs out
		questionTime = setTimeout(function(){
			questionTimeUp();
		}, startTime * 1000);

		var currentTime = startTime;

		$("#countdown").text(`${currentTime} Seconds`);

		// update the countdown display every second
		countdown = setInterval(function(){
			if(currentTime > 0){
				currentTime -= 1;
				$("#countdown").text(`${currentTime} Seconds`);
			}
		}, 1000);
	}

	function clearTimers() {
		clearTimeout(questionTime);
		clearTimeout(countdown);
	}

	// check the clicked answer
	function checkAnswer(el) {
		clearTimers();

		var choice = $(el).text();
		var answer = currentQuestion.answer;

		if(choice === answer) {
			correctAnswer();
		} else if(choice !== answer) {
			incorrectAnswer();
		}
	}

	function correctAnswer() {
		// if the user answers correctly
		var playArea = $("#play-area-row");
		playArea.html("");

		// show that they answered correctly
		var header = $("<div>").addClass("col-xs-12");
		var correctEl = $("<h2>").text("Correct!");
		myAppend(correctEl, header, playArea);

		// increment number of correct answers
		stats.correct += 1;

		// after n seconds move to the next question
		setTimeout(nextQuestion, 5 * 1000);

		console.log("correct");
	}

	function incorrectAnswer() {
		// if they answer incorrectly
		var playArea = $("#play-area-row");
		playArea.html("");

		// show the correct answer
		var header = $("<div>").addClass("col-xs-12");
		var wrongEl = $("<h2>").text("Wrong!");

		var answer = $("<p>")
		$(answer).text(`The correct answer was: ${currentQuestion.answer}`);

		myAppend(wrongEl, header, playArea);
		$(playArea).append(answer);

		// increment number of incorrect guesses
		stats.incorrect += 1;

		// after n seconds move to the next question
		setTimeout(nextQuestion, 5 * 1000);
		
		console.log("incorrect");
	}

	function questionTimeUp() {
		// if the time runs out
		// show the correct answer
		// increment the number of skipped questions
		// after n seconds move to the next question
		console.log("Time Up");
	}

	function nextQuestion() {
		console.log("next");
	}




}


	

	

	

// after all questions have been asked
// show final stats page with number of correct/incorrect/skipped answers
// include button to restart game. 


// Function to append elements together
function myAppend() {
	for(var i = 0; i < arguments.length - 1; i += 1) {
		$(arguments[i+1]).append(arguments[i]);
	}
}


