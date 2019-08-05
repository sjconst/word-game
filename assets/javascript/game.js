// ##### Word Guess Game 

alert("Click a letter to get started!"); 

// Declare global variables
var score, guesses;

// UI CONTROLLER

var UIController = (function() {

    //private variables
    var DOM = {
        score: document.getElementById("score"),
        guess: document.getElementById("guesses"),
        button: document.querySelector(".btn-new"),
        win: document.getElementById("win"),
        lose: document.getElementById("lose"),
        lettersUsed: document.getElementById("lettersUsed"),
        guessTiles: document.getElementById("guessTiles")
        };
    
    var rounds = {
        firstItem: 0,
        round: [],
        roundWord: ["tehran", "conakry", "belmopan", "bangui", "helsinki", "pristina"]
        }; 

    var listLetters = {
        letterUsedList: [].slice.call(DOM.lettersUsed.querySelectorAll(".letterUsed")),
        letterAnswerList: [].slice.call(DOM.guessTiles.querySelectorAll(".letterAnswer")),
        dashes: [].slice.call(DOM.guessTiles.querySelectorAll(".dash")),
        };
    
    //public methods
    return {                  
        resetLetters:  function() {            
                        listLetters.letterUsedList.forEach(function(element){
                            element.style.textDecoration = null;
                            });           
                        listLetters.letterAnswerList.forEach(function(element){
                            element.style.visibility = "hidden";
                            });              
                        listLetters.dashes.forEach(function(element){
                            element.style.visibility = "hidden";
                            });
                        },      
                        
        nextWord: function() {
            if (rounds.firstItem < rounds.roundWord.length - 1) {
                this.resetLetters();                       
                rounds.firstItem += 1;                     
                this.nextDash();   
                guesses = 8;
                DOM.guess.textContent = "8";
                } else {
                    DOM.win.style.visibility = "visible";
                    gamePlaying = false;
                }   
            },

        nextDash:   function() { 
                    var firstDash = [].slice.call(document.getElementById(rounds.roundWord[rounds.firstItem]).querySelectorAll(".dash"));
                    firstDash.forEach(function(element){
                        element.style.visibility = "visible";       
                        })
                    },   
                 
        // getInput: function(event) {
        //         return {
        //             letter2: event.target.id
        //             }
        //         }, 
        
        getDOM: function() {
                return DOM;
                },
        
        getRounds: function(){
                return rounds;
            },
            
        lessGuess:  function() {
                    if (guesses <= 1) {
                        DOM.lose.style.visibility = "visible";
                        gamePlaying = false;        
                    }
                    else {
                        guesses -= 1;
                        DOM.guess.textContent = guesses;
                        }    
                    },

        isComplete: function(element) { 
                    return element.style.visibility === "visible";
                    },   
                            
        
        };           
    })();

// GAME CONTROLLER

var controller = (function(UICtrl) {

    var DOMstrings = UICtrl.getDOM();
    var roundDetail = UICtrl.getRounds();

    //Initialize function, sets scores to 0, guesses to 8, hides solution letters, un-crosses out letters 
    var setupInit = function () {           
        score = 0;
        guesses = 8;
        DOMstrings.score.textContent = "0";
        DOMstrings.guess.textContent = "8";   
        UICtrl.resetLetters(); 
        UICtrl.nextDash();        
        gamePlaying = true;  
        DOMstrings.lose.style.visibility = "hidden";
        DOMstrings.win.style.visibility = "hidden";       
        };    
    
    var userGuess = function(event) {
        if(gamePlaying) {
            var letter = event.target.id;                                           
            var solution = document.querySelector("." + roundDetail.roundWord[roundDetail.firstItem] + "." + letter);     
            var allSolution = [].slice.call(document.querySelectorAll("." + roundDetail.roundWord[roundDetail.firstItem] + "." + letter));                         
            var wordList = [].slice.call(document.getElementById(roundDetail.roundWord[roundDetail.firstItem]).querySelectorAll(".letterAnswer"));
                        
        // cross out letter clicked
            document.getElementById(letter).style.textDecoration = "line-through";

        // if letter clicked matches letter hidden in solution
            if(solution) {
                // display ALL matching hidden letters, increase score by one, add additional point to displayed score
                allSolution.forEach(function(element){
                    element.style.visibility = "visible";
                    });             
                score += 1;                
                DOMstrings.score.textContent = score; 

                // check if word guessed. If it is, next word
                if (wordList.every(UICtrl.isComplete)) {
                    UICtrl.nextWord();                    
                } else {
                    //if not, remove one remaining guess   
                    UICtrl.lessGuess();
                };         
            
        //if letter clicked doesn't match letter hidden in solution
            }  else {
                // reduce score by one, take away point from displayed score, take away from remaining guesses
                score -= 1;                
                DOMstrings.score.textContent = score;
                UICtrl.lessGuess();
            }
        }
    };    
    
    // Setup event listeners
    var setupEventListeners = function () {                    
            DOMstrings.lettersUsed.onclick = userGuess;
              
            // if new game button clicked, start over
            DOMstrings.button.onclick = setupInit;
        }
  
    return {
        eventListeners: function() {
            setupEventListeners();
        },
        init: function() {
            setupInit();
        }
    }; 
}) (UIController); 

controller.eventListeners();
controller.init();
