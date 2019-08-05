
// 1. Play a sound or song when the user guesses their word correctly, like in our demo.

// 3. **HARD MODE:** Organize your game code as an object, except for the key events to get the letter guessed. This will be a challenge if you haven't coded with JavaScript before, but we encourage anyone already familiar with the language to try this out.
// 4. Save your whole game and its properties in an object.
// 5. Save any of your game's functions as methods, and call them underneath your object declaration using event listeners.
// 6. Don't forget to place your global variables and functions above your object.
//    * Remember: global variables, then objects, then calls.

// ##### Word Guess Game 

// alert("Click a letter to get started!"); 

// Declare and set global variables
    var score, guesses, item; 
    var next = ["tehran", "conakry", "belmopan", "bangui", "helsinki", "pristina"]

//    var DOM = {
//         score: document.getElementById("score"),
//         guess: document.getElementById("guesses"),
//         button: document.querySelector(".btn-new"),
//         win: document.getElementById("win"),
//         lose: document.getElementById("lose")
//         }


// UI Controller
var UIController = (function() {

    var DOM = {
        score: document.getElementById("score"),
        guess: document.getElementById("guesses"),
        button: document.querySelector(".btn-new"),
        win: document.getElementById("win"),
        lose: document.getElementById("lose"),
        lettersUsed: document.getElementById("lettersUsed"),
        guessTiles: document.getElementById("guessTiles")
        }
    
    var listLetters = {
        letterUsedList: [].slice.call(DOM.lettersUsed.querySelectorAll(".letterUsed")),
        letterAnswerList: [].slice.call(DOM.guessTiles.querySelectorAll(".letterAnswer")),
        dashes: [].slice.call(DOM.guessTiles.querySelectorAll(".dash")),
    }
    
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
                 
        getInput: function(event) {
                return {
                    letter2: event.target.id
                }
            }, 
        
        getDOM: function() {
            return DOM;
            }
        };           
    })();

//Game controller
var controller = (function(UICtrl) {

    var DOMstrings = UICtrl.getDOM();

    //Add event listeners
    document.querySelector("#lettersUsed").onclick = function(event) {
        // game.userGuess(event)
        if(gamePlaying) {
            var letter = event.target.id;
            console.log(letter);
            var letter3 = UICtrl.getInput(event);
            console.log(letter3);
            
            var solution = document.querySelector("." + next[item] + "." + letter);     
            var allSolution = [].slice.call(document.querySelectorAll("." + next[item] + "." + letter)); 
                  
            var wordList = [].slice.call(document.getElementById(next[item]).querySelectorAll(".letterAnswer"));
                           
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
                if (wordList.every(isComplete)) {
                    nextWord();                    
                } else {
                    //if not, remove one remaining guess   
                    lessGuess();
                };         
            
        //if letter clicked doesn't match letter hidden in solution
            }  else {
                // reduce score by one, take away point from displayed score, take away from remaining guesses
                score -= 1;                
                DOMstrings.score.textContent = score;
                lessGuess();
            }
        }
    };
}) (UIController); 


    // if new game button clicked, start over
    document.querySelector(".btn-new").onclick = init;


//Functions used 

    //Initialize function, sets scores to 0, guesses to 8, hides solution letters, un-crosses out letters
    function init() {
        score = 0;
        guesses = 8;
        item = 0;
        document.getElementById("score").textContent = "0";
        document.getElementById("guesses").textContent = "8";   
        UIController.resetLetters(); 
        nextDash();        
        gamePlaying = true;  
        document.getElementById("lose").style.visibility = "hidden";
        document.getElementById("win").style.visibility = "hidden";       
    }

    // takes away remaining guesses, if no remaining guesses, diplays "you lose"
    function lessGuess() {
        if (guesses <= 1) {
            document.getElementById("lose").style.visibility = "visible";
            gamePlaying = false;        
        }
        else {
            guesses -= 1;
            document.getElementById("guesses").textContent = guesses;
        }    
    }
 
    //checks if all elements of an array are visible
    function isComplete(element){ 
        return element.style.visibility === "visible";
    };

    // Next word
    function nextWord() {
        if (item < next.length - 1) {
        UIController.resetLetters();
        item += 1; 
        nextDash();   
        guesses = 8;
        document.getElementById("guesses").textContent = "8";
        } else {
            document.getElementById("win").style.visibility = "visible";
            gamePlaying = false;
        }   
    };

    //Next dash appears
    function nextDash(){
        var firstDash = [].slice.call(document.getElementById(next[item]).querySelectorAll(".dash"));
        firstDash.forEach(function(element){
            element.style.visibility = "visible";       
        })
    };

//Initialize game
init();




// GRAVEYARD

    // //Resets solution and keyboard letters 
    // function resetLetters(){
    //     //reset all letters used to un-crossed out
    //     var letterUsedList = [].slice.call(document.getElementById("lettersUsed").querySelectorAll(".letterUsed"));
    //     letterUsedList.forEach(function(element){
    //         element.style.textDecoration = null;
    //     })
             
    //     //hides ALL solution letters (from all countries)
    //     var letterAnswerList = [].slice.call(document.getElementById("guessTiles").querySelectorAll(".letterAnswer"));
    //     letterAnswerList.forEach(function(element){
    //         element.style.visibility = "hidden";
    //     })
        
    //     //hides dashes of all words
    //     var dashes = [].slice.call(document.getElementById("guessTiles").querySelectorAll(".dash"));
    //     dashes.forEach(function(element){
    //         element.style.visibility = "hidden";
    //     })
    // };
