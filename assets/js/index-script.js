var time = 60; //Setting timer at 60 seconds and tracking time
var score = 0; //Tracking current score
var question = 0; //Tracking current question number
var timer; //setInterval variable, golabl to be able to clearInterval from a different function
var highScores = JSON.parse(localStorage.getItem("HighScores")); //Extracting high score from local storage to array


//Event listener for Start button
$(".start-button").click(function () {
    $(".dashboard").removeAttr("hidden");
    $(".nav-buttons").attr("hidden", "");
    loadQuestion();
    timer = setInterval(function () {
        time--;
        $("#time").text(time);
        if (time <= 0) {
            endQuiz();
        }
    }, 1000)
});

//Event listener for High Score button
$(".highscore-button").click(function () {
    loadHighScores();
});

//Event listener for multiple choice buttons
$(".choices").click(function () {
    var choice = $(this).attr("data-choice");
    if (choice == questions[question].correct) {
        question++;
        updateScore();
        loadQuestion();
    } else {
        var timeDisplay = $("#time");
        time -= 10;
        timeDisplay.css("color", "red") 
        setTimeout(function(){timeDisplay.css("color", "black")}, 1000)
        if (time <= 0) {
            console.log("Time's up")
            endQuiz();
        } else {
            question++;
            loadQuestion();
        }
    }
});

//Function to load question objects onto the page
function loadQuestion() {
    if (question < 10) {
        var quest = questions[question];
        var buttons = $(".choices");
        var i = 0;
        $("h1").text(quest.question);
        buttons.each(function () {
            $(this).empty();
            $(this).append("<span>" + quest.options[i] + "<span>");
            i++;
        });
    } else {
        endQuiz();
    }
}

//Function to update score when correct answer is chosen
function updateScore() {
    var scoreDisplay = $("#score");
    score++;
    scoreDisplay.text(score);
    scoreDisplay.css("color", "green") 
    setTimeout(function(){scoreDisplay.css("color", "black")}, 1000)
}


//Function to end the quiz and display score form
function endQuiz() {
    clearInterval(timer);
    $(".dashboard").attr("hidden", "");
    $(".form").removeAttr("hidden");
    $("h1").text("You scored " + score + " points!");
}

//Event listener for score form submit button
$("#submit-init").click(function (e) {
    e.preventDefault();
    var inits = $("#initials").val();
    if (inits != "") {
        var newScore = { player: inits, score: score };
        if (highScores) {
            highScores.push(newScore);
            highScores.sort((a, b) => (a.score > b.score) ? -1 : (a.score < b.score) ? 1 : 0);
        } else {
            highScores = [newScore];
        }
        localStorage.setItem("HighScores", JSON.stringify(highScores));
        loadHighScores();
    }
});

//Function to load high scores from array to webpage
function loadHighScores() {
    $("#cover").removeAttr("hidden");
    if (highScores.length > 0) {
        for (let i = 0; i < highScores.length; i++) {
            var listIem = (i + 1) + "- " + highScores[i].player + " - - - - - - - " + highScores[i].score + " Points";
            console.log(listIem)
            $("#score-list").append("<p>" + listIem + "</p>")
        }
    }
}

$("#cover").click(function () {
    location.reload();
});



var questions =

    [{
        question: "How is an html sheet styled?",
        options: ["Using Photoshop", "Using crayons", "Using CSS", "html cannot be styled"],
        correct: "c"
    },
    {
        question: "Name a framework that makes a webpage's design responsive",
        options: ["Bootsole", "Strong leadership", "Kind words", "Bootstrap"],
        correct: "d"
    },
    {
        question: "What scripting language makes a webpage interactive?",
        options: ["Magic spells", "Javascript", "Java", "English"],
        correct: "b"
    },
    {
        question: "What is the correct way of referencing an id in CSS?",
        options: ["#id", ".id", "$id", "this.id"],
        correct: "a"
    },
    {
        question: "What is the correct way of creating a variable that holds the value 0 in Javascript?",
        options: ["Create A Variable That Equals Zero", "variable = 0", "0", "var myVariable = 0"],
        correct: "d"
    },
    {
        question: "How many values can a variables hold in Javascript?",
        options: ["One in each hand", "Too many to count", "1", "3"],
        correct: "c"
    },
    {
        question: "WebAPI allows ...",
        options: ["Boyfriend manipulation", "DOM manipulation", "JON manipulation", "Displaying webpages in browser"],
        correct: "b"
    },
    {
        question: "DOM manipulation allows Javascript to control...",
        options: ["Appetite", "Cravings", "html elements", "Repositories"],
        correct: "c"
    },
    {
        question: "In order to access html elements from Javascript, the syntax must start with...",
        options: ["GetThemElements.", "javascript.", "html.", "document."],
        correct: "d"
    },
    {
        question: "What is the correct tag for adding an external Javascript file to an html file?",
        options: ["&lt;script&gt;", "&lt;javascript&gt;", "&lt;AddJavascript&gt;", "Javascript is always inline."],
        correct: "a"
    }]
