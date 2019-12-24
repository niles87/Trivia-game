var game = {
  correctAnswers: 0,
  incorrectAnswers: 0,
  unanswered: 0,
  currentQuestion: 0,
  timer: 10,
  timeRunning: false,
  timeRemaining: "",

  questions: {
    one: "What video game was released in 1996 exclusively for PlayStation and starred a marsupial that is found in Australia and Tasmania?",
    two: "What is the highest selling video game console of all time?",
    three: "What video game from 1997 is considered the best selling for the PlayStation console?",
    four: "What video game was the most sold for the Super Nintendo?",
    five: "What computer game became the best selling piece of software passing Windows 95?",
    six: "What was SEGA’s first home console?",
    seven: "What was Mario’s first profession?",
    eight: "What was the first console that played 16-bit video games?"
  },
  possibleAnswers: {
    one: ["Sonic the Hedgehog", "Crash Bandicoot", "Banjo-Kazooie", "Donkey Kong"],
    two: ["Nintendo 64", "Sega", "X-box", "PlayStation 2"],
    three: ["Final Fantasy VII", "Tomb Raider II", "Gran Turismo", "GoldenEye 007"],
    four: ["Donkey Kong Country", "Star Fox", "Kirby", "Super Mario World"],
    five: ["DOOM", "Duke Nukem 3D", "StarCraft", "Diablo"],
    six: ["Dreamcast", "Sega CD", "SG-1000", "Genesis"],
    seven: ["Carpenter", "Plumber", "Construction Worker", "Boxing Referee"],
    eight: ["SEGA Genesis", "Super Nintendo", "Atari", "TurboGrafx-16 Entertainment SuperSystem"]
  },
  answer: {
    one: "Crash Bandicoot",
    two: "PlayStation 2",
    three: "Gran Turismo",
    four: "Super Mario World",
    five: "DOOM",
    six: "SG-1000",
    seven: "Carpenter",
    eight: "TurboGrafx-16 Entertainment SuperSystem"
  },
  images: {
    one: "assets/images/crash_bandicoot.jpeg",
    two: "assets/images/playstation2.jpeg",
    three: "assets/images/gran_turismo.jpeg",
    four: "assets/images/supermario_world.jpeg",
    five: "assets/images/doom.jpeg",
    six: "assets/images/sg-1000.jpeg",
    seven: "assets/images/mario.jpeg",
    eight: "assets/images/turbografx.jpeg"
  },
  // starts game
  startGame: function() {
    console.log("game started");
    clearTimeout(start);
    clearInterval(game.timeRemaining);
    game.timeRemaining = "";
    game.currentQuestion = 0;
    game.correctAnswers = 0;
    game.incorrectAnswers = 0;
    game.unanswered = 0;
    game.timeRunning = false;
    $("#time-remaining").show();
    $("#start").remove();
    $("#results").html("");
    game.askQuestion();
  },
  // asks a question
  askQuestion: function() {
    console.log("asking question");
    game.timer = 10;
    $("#timer").text(game.timer);
    if (!game.timeRunning) {
      clearInterval(game.timeRemaining);
      game.timeRemaining = setInterval(game.clockRunning, 1000);
    }
    var question = Object.values(game.questions)[game.currentQuestion];
    $("#question").text(question);
    var answers = Object.values(game.possibleAnswers)[game.currentQuestion];
    $.each(answers, function(index, key) {
      $("#answers").append($("<button class='answer' data-value='" + key + "'>" + key + "</button>"));
    });
  },
  // checks the status of the timer
  clockRunning: function() {
    var currentUnanswered = Object.values(game.answer)[game.currentQuestion];
    var currentImage = Object.values(game.images)[game.currentQuestion];
    if (game.timer > -1 && game.currentQuestion < Object.keys(game.questions).length) {
      $("#timer").text(game.timer);
      game.timer--;
    }
    // if time runs out add to unanswered and show correct answer
    else if (game.timer === -1) {
      game.unanswered++;
      game.incorrectAnswers++;
      clearInterval(game.timeRemaining);
      result = setTimeout(game.userGuess, 1000);
      $("#question").html("<h4>Time Expired! The Answer Was " + currentUnanswered + "</h4>" + "<img src='" + currentImage + "'>");
      console.log("Current unanswered amount " + game.unanswered);
    }
    // if every question has been answered then show game results
    else if (game.currentQuestion === Object.keys(game.questions).length) {
      console.log("game over");
      $("#question").html(
        "<h3>Thanks For Playing</h3>" +
          "<div>Correct: " +
          game.correctAnswers +
          "</div>" +
          "<div>Incorrect: " +
          game.incorrectAnswers +
          "</div>" +
          "<div>Unanswered: " +
          game.unanswered +
          "</div>"
      );
      console.log("start game function running below");
      start = setTimeout(game.startGame, 1000);
    }
  },
  // checks the users guess
  checkGuess: function() {
    console.log("Im checking the guess");
    // var guess = game.getButtonValue($("button"));
    var currentAnswer = Object.values(game.answer)[game.currentQuestion];
    var currentImage = Object.values(game.images)[game.currentQuestion];
    if ($(this).text() === currentAnswer) {
      game.correctAnswers++;
      console.log("This is the current number of correct answers " + game.correctAnswers);
      clearInterval(game.clockRunning);
      result = setTimeout(game.userGuess, 1000);
      $("#question").html("<h4>That Is Correct</h4>" + "<img src='" + currentImage + "'>");
    } else {
      game.incorrectAnswers++;
      console.log("Current incorrect answers " + game.incorrectAnswers);
      clearInterval(game.clockRunning);
      result = setTimeout(game.userGuess, 1000);
      $("#question").html("<h4>That Is Incorrect! " + currentAnswer + "</h4>" + "<img src='" + currentImage + "'>");
    }
  },
  // removes previous question and asks the next
  userGuess: function() {
    console.log("asking the next question");
    game.currentQuestion++;
    $(".answer").remove();
    $("#question").empty();
    game.askQuestion();
  }
};

$(document).ready(function() {
  $("#time-remaining").hide();
  $("#start").on("click", game.startGame);
  $(document).on("click", ".answer", game.checkGuess);
});
