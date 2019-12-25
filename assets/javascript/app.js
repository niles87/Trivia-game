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
      result = setTimeout(game.userGuess, 3000);
      $("#question").html("<h4>Time Expired! The Answer Was " + currentUnanswered + "</h4>" + "<img src='" + currentImage + "'>");
    }
  },
  // checks the users guess
  checkGuess: function() {
    var currentAnswer = Object.values(game.answer)[game.currentQuestion];
    var currentImage = Object.values(game.images)[game.currentQuestion];
    clearInterval(game.clockRunning);
    if ($(this).text() === currentAnswer) {
      game.correctAnswers++;
      $("#question").html("<h4>That Is Correct</h4>" + "<img src='" + currentImage + "'>");
    } else {
      game.incorrectAnswers++;
      $("#question").html("<h4>That Is Incorrect! " + currentAnswer + "</h4>" + "<img src='" + currentImage + "'>");
    }
    result = setTimeout(game.userGuess, 3000);
  },
  // removes previous question and asks the next
  userGuess: function() {
    game.currentQuestion++;
    $(".answer").remove();
    $("#question").empty();
    // if every question has been asked then show game results
    if (game.currentQuestion === Object.keys(game.questions).length) {
      $("#question").html(
        "<h3>Thanks For Playing</h3>" +
          "<div>Correct: <strong>" +
          game.correctAnswers +
          "</strong></div>" +
          "<div>Incorrect: <strong>" +
          game.incorrectAnswers +
          "</strong></div>" +
          "<div>Unanswered: <strong>" +
          game.unanswered +
          "</strong></div>"
      );
      start = setTimeout(game.startGame, 3000);
    } else {
      game.askQuestion();
    }
  },
  getRandomColor: function() {
    var choices = "0123456789ABCDEF";
    var color = "#";
    for (var c = 0; c < 6; c++) {
      color += choices[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  setRandomColor: function() {
    $(".char1").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char2").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char3").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char4").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char5").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char7").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char8").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char9").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char10").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char12").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char13").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char14").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char15").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char16").css({ color: game.getRandomColor(), "text-decoration": "underline" });
    $(".char17").css({ color: game.getRandomColor(), "text-decoration": "underline" });
  },
  refreshColor: function() {
    var timeInSeconds = 0.3;

    game.setRandomColor();

    setTimeout(game.refreshColor, timeInSeconds * 1000);
  }
};

$(document).ready(function() {
  $("#title").lettering();
  game.refreshColor();
  $("#time-remaining").hide();
  $("#start").on("click", game.startGame);
  $(document).on("click", ".answer", game.checkGuess);
});
