
var trivia = {
    initialScreen: "",
    correctCounter: 0,
    inCorrectCounter: 0,
    unAnsweredCounter: 0,
    gameHTML: "",
    questionsArray: [
                    "Which 80s movie was the highest grossing film of the decade ?", "What commercial was Michael Jackson filming when his hair caught on fire?", "What game cartridge came with the Atari 2600 package? ", "What family sitcom was based around a furry alien?", "Which of the following is a popular 80s boy band?"],
    answerArray: [
                  ["Goonies", "ET", "Backt To The Future", "Ghostbusters"], ["Mcdonalds", "dominos", "Coca Cola", "Pepsi"], ["Combat", "Space Invaders", "Breakout", "Asteroids"], ["ALF", "Family Ties", "The Cosby Show", "The Wonder Years"], ["Boys II Men", "Jonas Brothers", "New Kids On The Block", "Backstreet Boys"],],
    correctAnswers: [
                    "B. ET", "D. Pepsi", "A. Combat", "A. ALF", "C. New Kids On The Block"],
    imageArray: [
                "<img class='center-block img-right' src='assets/images/ET.gif'>", "<img class='center-block img-right' src='assets/images/pepsi.gif'>", "<img class='center-block img-right' src='assets/images/atari.gif'>", "<img class='center-block img-right' src='assets/images/ALF.gif'>", "<img class='center-block img-right' src='assets/images/New.gif'>"],
    clock: "",
    questionCounter: 0,
    timeCounter: 20,
  };
  
  
  //FUNCTIONS
  //===========================================
  function startScreen(){
    //Create the start button
    trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Start</a></p>";
    //Add Start button to main-area
    $(".main-area").html(trivia.initialScreen);
  };
  
  function timer(){
    trivia.clock = setInterval(twentySeconds, 1000);
    function twentySeconds(){
      if(trivia.timeCounter === 0){
        timeOutLoss();
        clearInterval(trivia.clock);
      }
      if(trivia.timeCounter > 0) {
        trivia.timeCounter --;
      }
      $(".timer").html(trivia.timeCounter);
    }
  };
  
  function wait(){
    if(trivia.questionCounter < 4) {
      trivia.questionCounter ++;
      generateHTML();
      trivia.timeCounter = 20;
      timer();
    }
    else {
      finalScreen();
    }
  };
  
  function win(){
    trivia.correctCounter ++;
    trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
    $(".main-area").html(trivia.gameHTML);
    setTimeout(wait, 4000);
  };
  
  function loss(){
    trivia.inCorrectCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 4000);
  };
  
  function timeOutLoss(){
    trivia.unAnsweredCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 4000);
  };
  
  function finalScreen(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".main-area").html(trivia.gameHTML);
  };
  
  function resetGame(){
    trivia.questionCounter = 0;
    trivia.correctCounter = 0;
    trivia.inCorrectCounter = 0;
    trivia.unAnsweredCounter = 0;
    trivia.timeCounter = 20;
    generateHTML();
    timer();
  };
  
  function generateHTML(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
    $(".main-area").html(trivia.gameHTML);
  }
  
  
  //MAIN PROCESS
  //===========================================
  startScreen();
  
  //start-button click
  $("body").on("click", ".start-button", function(event){
      event.preventDefault();
      generateHTML();
  
      timer();
  }); 
  
  $("body").on("click", ".answer", function(event){
    selectedAnswer = $(this).text();
      if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {
  
          clearInterval(trivia.clock);
          win();
      }
    //If incorrect ansewr
      else {
  
          clearInterval(trivia.clock);
          loss();
      }
  }); // Close .answer click
  
  //reset-button click
  $("body").on("click", ".reset-button", function(event){
      resetGame();
  })