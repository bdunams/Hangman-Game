      // Hangman game object
      var game = {
        // game properties
        // an array of all 32 NFL teams
        wordPool : ['Cardinals', 'Falcons', 'Ravens', 'Bills', 'Panthers', 'Bears', 'Bengals', 'Browns','Broncos', 'Cowboys','Packers', 'Lions', 'Texans', 'Colts', 'Jaguars', 'Chiefs', 'Dolphins', 'Vikings', 'Patriots', 'Saints', 'Giants', 'Jets', 'Raiders', 'Eagles', 'Steelers','Chargers', '49ers', 'Seahawks', 'Rams','Buccaneers', 'Titans', 'Redskins'],
        blank : '-',
        wordChoice : '',
        blankWord : '',
        gameWord : '',
        lettersGuessed : [],
        userGuess : '',
        guesses : 0 ,
        wins : 0,
        losses : 0,
        status : false,
        // In all methods 'this' points to the game object
        // A method to start a new game
        newGame : function(){
          
          document.getElementById('to-start').innerHTML = 'Press any key to get started';
          
          // Randomly picks a word from the word pool array.
          this.wordChoice = this.wordPool[Math.floor(Math.random() * this.wordPool.length)];

          // Creates string of blanks the length of the chosen word
          this.blankWord = this.blank.repeat(this.wordChoice.length);

          //
          this.lettersGuessed = [];
          document.getElementById('letters-guessed').innerHTML = '';

          this.gameWord = game.blankWord;

          this.status = true;

          this.guesses = 7;

          // Sets initial blank word
          document.getElementById('word').innerHTML = this.blankWord;
          
        },
        // A method to check if player won or lost and increment those values
        scoreChecker : function(){
          
          // if all the letters have been guessed right
          if(this.wordChoice === this.blankWord){
            this.wins++;
            document.getElementById('wins').innerHTML = this.wins;
            document.getElementById('game-results').innerHTML = 'You won! Play again?';
            this.newGame();
            this.status = false;
          }
          // if you ran out of guesses
          else if(this.guesses < 1){
            this.losses++;
            document.getElementById('losses').innerHTML = this.losses;
            document.getElementById('game-results').innerHTML = 'You lose :( Try another!';
            this.newGame();
            this.status = false;
          }
          
        },
        // primary method where userinput, guess comparison and current word update are performed
        gameSession : function(){
          // This function is run whenever the user presses a key.
            document.onkeyup = function(event) {

              document.getElementById('game-results').innerHTML = '';

              document.getElementById('to-start').innerHTML = '';

              // if the key pressed is a letter, if will be saved
              // Determines which key was pressed
              if(/^[a-zA-Z]+$/.test(event.key) && event.key.length === 1){
                this.userGuess = event.key;
              }
              else{
                return
              }

              // if all letters havent't been guessed and there are guesses left
              if(this.wordChoice !== this.blankWord && this.guesses > 0){

                // wrong guess
                if(this.wordChoice.indexOf(this.userGuess) === -1){
                  this.lettersGuessed += this.userGuess + ' ';
                  this.guesses--;
                  console.log(this.lettersGuessed);
                  document.getElementById('letters-guessed').innerHTML = 'Previous Guesses: ' + this.lettersGuessed;

                  game.scoreChecker();
                  
                }
                // right guess
                else{

                  // splits gameWord into array 
                  // updates gameWord with userGuess and joins gameWord back into a string
                  this.gameWord = this.gameWord.split('');
                  this.gameWord[this.wordChoice.indexOf(this.userGuess)] = this.userGuess;
                  this.gameWord = this.gameWord.join('');

                  // splits wordChoice into array 
                  // updates wordChoice with dash where correct guess to be able to guess multiple of the same letter
                  this.wordChoice = this.wordChoice.split('');
                  this.wordChoice[this.wordChoice.indexOf(this.userGuess)] = '-';
                  this.wordChoice = this.wordChoice.join('');

                  // Update DOM with remaining letters in word
                  document.getElementById('word').innerHTML = this.gameWord;

                  game.scoreChecker();
                }

              }
              else{
                scoreChecker();
              }

              // update the number of guesses on each keypress
              document.getElementById('guesses').innerHTML = this.guesses;
          }
        }
      }
      
      game.newGame();
      game.gameSession();