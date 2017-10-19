// initialize variables needed to begin the game

// object to hold questions, choices, and correct answer
var trivia = {
	one: {
		question: "What is the name of Dumbledore's phoenix?",
		answer: "Fawkes",
		choices: ["Firenze","Fawkes","Fluffy","Hermes"],
		asked: false,
		image: "fawkes.jpg"
	},
	two: {
		question: "What is the symbol for Ravenclaw house?",
		answer: "An Eagle",
		choices: ["A Badger","An Eagle","A Lion","A Snake"],
		asked: false,
		image: "ravenclaw.png"
	},
	three: {
		question: "Who destroyed the last remaining Horcrux?",
		answer: "Neville Longbottom",
		choices: ["Ginny Weasley","Neville Longbottom","Hermoine Granger","Harry Potter"],
		asked: false,
		image: "neville.png"
	},
	four: {
		question: "What does O.W.L. stand for?",
		answer: "Ordinary Wizarding Level",
		choices: ["Ordinary Wizarding Level","Official Wizarding License","Organized Wizard Learning","Outstanding Wizard Lesson"],
		asked: false,
		image: "owl.jpg"
	},
	five: {
		question: "What does Professor Lupin give Harry to eat after his encounter with a Death Eater?",
		answer: "Chocolate",
		choices: ["Chocolate","Sherbet","Ice Cream","Bertie Bott's Every Flavored Beans"],
		asked: false,
		image: "chocolate.gif"
	},
	six: {
		question: "Who is Ginny's first boyfriend?",
		answer: "Michael Corner",
		choices: ["Dean Thomas","Michael Corner","Zacharias Smith","Harry Potter"],
		asked: false,
		image: "michael.jpg"
	},
	seven: {
		question: "What do Ron and Hermoine use to destroy Helga Hufflepuff's cup?",
		answer: "A Basilisk Fang",
		choices: ["The Sword of Gryffindor","Fiendfyre","The Killing Curse","A Basilisk Fang"],
		asked: false,
		image: "fang.jpg"
	},
	eight: {
		question: "Where does Harry sleep at the Dursley's before he moves to Dudley's second bedroom?",
		answer: "The cupboard under the stairs",
		choices: ["The cupboard under the stairs","The cellar","The garden shed","The attic"],
		asked: false,
		image: "cupboard.jpg"
	},
	nine: {
		question: "When is Harry Potter's birthday?",
		answer: "July 31st",
		choices: ["July 31st","July 30th","June 30th","August 30th"],
		asked: false,
		image: "birthday.png"
	},
	ten: {
		question: "What is Dumbledore's full name?",
		answer: "Albus Percival Wulfric Brian Dumbledore",
		choices: ["Albus Percival Wulfric Brian Dumbledore","Albus Wulfric Percival Brian Dumbledore","Albus Brian Percival Wulfric Dumbledore","Albus Wulfric Brian Percival Dumbledore"],
		asked: false,
		image: "dumbledore.jpg"
	} 
}

var contentDiv = $("#content");
var playArea;

// object to hold stats (correct/incorrect/skipped)
var stats = {
	correct: 0,
	incorrect: 0,
	unanswered: 0
}

// variables to hold starting time, and time between questions
var startTime = 99;
var waitTime = 60;

// object to hold current question
var currentQuestion;

// timeout and interval variables
var questionTime, countdown;

$(document).ready(function() {
	showStartPage();
})


// show initial starting screen with option to begin trivia game
function showStartPage() {

	var startDiv = $("<div>").addClass("row")
	var startBtn = $("<h2>").attr("id", "start-btn").text("Start");

	myAppend(startBtn, startDiv, contentDiv);

	playAudioElement();

	setTimeout(animateStartPage, 2 * 1000);

	$(startBtn).click(function() {
		$(contentDiv).html("");
		startGame();
	});


	function playAudioElement() {

		var audioEl = document.getElementById("start-audio");
		
		audioEl.volume = 1;
		audioEl.currentTime = 0;
		audioEl.play();

		setTimeout(function() {
			$(audioEl).animate({volume: "0"}, 5 * 1000);
			setTimeout(function() {audioEl.pause();}, 5 * 1000);
		}, 10 * 1000);
	}


	function animateStartPage() {
		$("#background").fadeTo(3 * 1000, "0.4");

		$("#main-header").animate({
			opacity: "0.5",
			top: "0"
		}, 2 * 1000);
		$("#main-header").animate({
			opacity: "1"
		}, 1 * 1000);

		setTimeout(function() {
			$("#start-btn").animate({
				opacity: "1",
				top: "0"
			}, 2 * 1000);
		}, 1 * 1000);
		
	}
}

// once user clicks start, initialize the game
function startGame() {
	// initialize game area
	buildTimerElement();
	buildPlayArea();

 	// choose first question
 	buildQuestionElement(getRandomQuestion());

	// start timers
	startTimers();
}

// build initial timer element and append to page
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
	playArea = $("<div>").addClass("row").attr("id", "play-area-row");
	$(contentDiv).append(playArea);
}

// build question element from given question object
function buildQuestionElement(obj) {
	var mainQuestion = $("<div>").addClass("main-question");

	var question = $("<div>").addClass("col-xs-12").attr("id", "question");
	var questionText = $("<h4>").text(obj.question);

	var choices = $("<div>").addClass("col-xs-12").attr("id", "choices");
	var choicesList = buildChoicesList(obj.choices);

	// set asked to true for current question
	obj.asked = true;

	myAppend(questionText, question, mainQuestion);
	myAppend(choicesList, choices, mainQuestion);

	$(playArea).append(mainQuestion);

	// build choices list from question choices array
	function buildChoicesList(arr) {
		var list = $("<div>");

		// randomize choices into randomOrder arr
		var randomOrder = randomizeArr(arr);

		randomOrder.forEach(function(choice) {
			var listItem = $("<p>").text(choice);
			attachClickListener(listItem);
			$(list).append(listItem);
		})

		return list;

		function randomizeArr(arr) {
			var previous = [];
			var newOrder = [];

			function randUniqueNum() {
				var randNum = Math.floor(Math.random() * 4);
				if(previous.indexOf(randNum) < 0) {
					previous.push(randNum);
					return randNum;
				} else {
					return randUniqueNum();
				}
			}

			for(var i = 0; i < 4; i += 1){
				var rand = randUniqueNum();
				newOrder.push(arr[rand]);
			}

			return newOrder;
		}

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

	if(!possQuestions) {
		return false;
	}

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

// clear question and countdown timers
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

// called when answer is correct
function correctAnswer() {
	// if the user answers correctly
	//clearPlayArea();

	// show that they answered correctly
	showAnswer(true, "Correct!");

	// increment number of correct answers
	stats.correct += 1;

	// after n seconds move to the next question
	setTimeout(nextQuestion, waitTime * 1000);
}

// called when answer is incorrect
function incorrectAnswer() {
	// if they answer incorrectly
	//clearPlayArea();

	// show the correct answer
	showAnswer(false, "Wrong!");

	// increment number of incorrect guesses
	stats.incorrect += 1;

	// after n seconds move to the next question
	setTimeout(nextQuestion, waitTime * 1000);
}

// called when the time runs out
function questionTimeUp() {
	// if the time runs out
	clearPlayArea();

	// show the correct answer
	showAnswer(false, "Time's Up!")

	// increment the number of skipped questions
	stats.unanswered += 1;

	// after n seconds move to the next question
	setTimeout(nextQuestion, waitTime * 1000);
}

// display the answer image and if they were correct or incorrect
function showAnswer(bool, str) {

	fadeWrongAnswers();


	function fadeWrongAnswers() {
		var currentChoices = $("#choices p");

		for (var i = 0; i < currentChoices.length; i++) {
			if($(currentChoices[i]).text() !== currentQuestion.answer) {
				$(currentChoices[i]).addClass("incorrect");
			} else {
				$(currentChoices[i]).addClass("correct");
			}
		}	

		$(".incorrect").fadeTo(1000, 0);
		setTimeout(moveCorrect, 1000);
	}

	

	function moveCorrect(){
		buildAnswerElement();

		var oldOffset = $(".correct").offset();
		var newOffset = $("#shown-answer").offset();

		$("#shown-answer").offset(oldOffset);

		$("#shown-answer").animate({
			"top": newOffset.top,
			"left": newOffset.left
		}, 1 * 1000);

		console.log(oldOffset);
		console.log(newOffset);


		function fadeOutQuestion() {
			$("#question").fadeTo(500, 0)
		}

		function fadeInPrompt() {

		}

		function buildAnswerElement() {
			// show correct, incorrect or time's up based on passed string
			var answerEl = $("<div>").addClass("main-answer")

			var headEl = $("<h2>").attr("id", "prompt-head").text(str).css("opacity", "0");
			$(answerEl).append(headEl);

			var textEl = $("<p>").attr("id", "prompt-text").css("opacity", "0");
			var answer = $("<span>").attr("id", "shown-answer");
			$(answer).text(currentQuestion.answer);

			if(!bool){
				$(textEl).text("The correct answer was: ")
			}

			myAppend(answer, textEl, answerEl);

			var img = $("<img>").attr("id", "correct-img").css("opacity", "0");
			img.attr("src", `assets/images/${currentQuestion.image}`);
			$(answerEl).append(img);

			$(playArea).append(answerEl);
		}
	}
}

// choose the next question and start timer
function nextQuestion() {
	clearPlayArea();

	var question = getRandomQuestion();

	if(question !== undefined) {
		buildQuestionElement(question);
		startTimers();
	}else{
		gameOver();
	}
}

// after all questions have been asked, end game and show stats
function gameOver() {
	clearPlayArea();

	$("#timer-row").remove();

	buildStatsDisplay();

	buildResetBtn();

	function buildStatsDisplay() {
		// show final stats page with number of correct/incorrect/skipped
		var statsHead = $("<div>").addClass("col-xs-12");
		var headText = $("<h3>").attr("id", "stats-head");
		headText.text("All done, here's how you did!");

		myAppend(headText, statsHead, playArea);

		var statsList = $("<div>")
		$(statsList).addClass("col-xs-12").attr("id", "stat-list");

		for(var stat in stats) {
			var textEl = $("<p>")
			var text = stat[0].toUpperCase() + stat.slice(1);
			text += `: ${stats[stat]}`;

			textEl.text(text);

			$(statsList).append(textEl);
		}

		$(playArea).append(statsList);
	}
	
	// include button to restart game.
	function buildResetBtn() {
		var btnDiv = $("<div>").addClass("col-xs-12");
		var resetBtn = $("<button>").attr("id", "reset-btn");
		resetBtn.text("Play Again?");

		myAppend(resetBtn, btnDiv, playArea);

		$(resetBtn).click(function(){
			resetGame();
		})
	}
}

// reset the game to the beginning
function resetGame() {
	// reset trivia questions to unasked
	for(var question in trivia){
		trivia[question].asked = false;
	}

	$(contentDiv).html("");

	startGame();
}

// clear the play area element
function clearPlayArea() {
	//
	$(playArea).html("");
}

// Function to append elements together
function myAppend() {
	for(var i = 0; i < arguments.length - 1; i += 1) {
		$(arguments[i+1]).append(arguments[i]);
	}
}


