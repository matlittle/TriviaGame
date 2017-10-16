// initialize variables needed to begin the game

// object to hold questions, choices, and correct answer
var trivia = {
	one: {
		question: "What is the name of Dumbledore's phoenix?",
		answer: "Fawkes",
		choices: ["Firenze","Fawkes","Fluffy","Hermes"],
		asked: false 
	},
	two: {
		question: "What is the symbol for Ravenclaw house?",
		answer: "An Eagle",
		choices: ["A Badger","An Eagle","A Lion","A Snake"],
		asked: false 
	},
	three: {
		question: "Who destroyed the last remaining Horcrux?",
		answer: "Neville Longbottom",
		choices: ["Ginny Weasley","Neville Longbottom","Hermoine Granger","Harry Potter"],
		asked: false 
	},
	four: {
		question: "What does O.W.L. stand for?",
		answer: "Ordinary Wizarding Level",
		choices: ["Ordinary Wizarding Level","Official Wizarding License","Organized Wizard Learning","Outstanding Wizard Lesson"],
		asked: false 
	},
	five: {
		question: "What does Professor Lupin give Harry to eat after his encounter with a Death Eater?",
		answer: "Chocolate",
		choices: ["Chocolate","Sherbet","Ice Cream","Bertie Bott's Every Flavored Beans"],
		asked: false 
	},
	six: {
		question: "Who is Ginny's first boyfriend?",
		answer: "Michael Corner",
		choices: ["Dean Thomas","Michael Corner","Zacharias Smith","Harry Potter"],
		asked: false 
	},
	seven: {
		question: "What do Ron and Hermoine use to destroy Helga Hufflepuff's cup?",
		answer: "A Basilisk Fang",
		choices: ["The Sword of Gryffindor","Fiendfyre","The Killing Curse","A Basilisk Fang"],
		asked: false 
	},
	eight: {
		question: "Where does Harry sleep at the Dursley's before he moves to Dudley's second bedroom?",
		answer: "The cupboard under the stairs",
		choices: ["The cupboard under the stairs","The cellar","The garden shed","The attic"],
		asked: false 
	},
	nine: {
		question: "What body part does Ron leave behind in his Apparition test?",
		answer: "Half an eyebrow",
		choices: ["Half an eyebrow","His left foot","His right hand","His nose"],
		asked: false 
	},
	ten: {
		question: "How did Harry's parents die according to the Dursleys?",
		answer: "In a car crash",
		choices: ["In a car crash","They were murdered","Lost at sea","From an illness"],
		asked: false 
	} 
}

var contentDiv = $("#content");

// object to hold stats (correct/incorrect/skipped)
var stats = {
	correct: 0,
	incorrect: 0,
	unanswered: 0
}

// variables to hold starting time, and time between questions
var startTime = 15;
var waitTime = 4;

// object to hold current question
var currentQuestion;

// timeout and interval variables
var questionTime, countdown;


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

		// randomize choices into randomOrder arr
		var randomOrder = randomizeArr(arr);

		randomOrder.forEach(function(choice) {
			var listItem = $("<li>").text(choice);
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
	var playArea = $("#play-area-row");
	playArea.html("");

	// show that they answered correctly
	var header = $("<div>").addClass("col-xs-12");
	var correctEl = $("<h2>").text("Correct!");
	myAppend(correctEl, header, playArea);

	// increment number of correct answers
	stats.correct += 1;

	// after n seconds move to the next question
	setTimeout(nextQuestion, waitTime * 1000);

	console.log("correct");
}

// called when answer is incorrect
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
	setTimeout(nextQuestion, waitTime * 1000);

	console.log("incorrect");
}

// called when the time runs out
function questionTimeUp() {
	// if the time runs out
	var playArea = $("#play-area-row");
	playArea.html("");

	// show the correct answer
	var header = $("<div>").addClass("col-xs-12");
	var timeUpEl = $("<h2>").text("Time's Up!");

	var answer = $("<p>")
	$(answer).text(`The correct answer was: ${currentQuestion.answer}`);

	myAppend(timeUpEl, header, playArea);
	$(playArea).append(answer);

	// increment the number of skipped questions
	stats.unanswered += 1;

	// after n seconds move to the next question
	setTimeout(nextQuestion, waitTime * 1000);

	console.log("Time Up");
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
	var playArea = $("#play-area-row");

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
	$("#play-area-row").html("");
}

// Function to append elements together
function myAppend() {
	for(var i = 0; i < arguments.length - 1; i += 1) {
		$(arguments[i+1]).append(arguments[i]);
	}
}


