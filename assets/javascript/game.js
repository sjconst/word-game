// # Option Two: Word Guess Game (Challenge - Recommended)

// 1. [Watch the demo](https://youtu.be/W-IJcC4tYFI).

// 2. Choose a theme for your game! In the demo, we picked an 80s theme: 80s questions, 80s sound and an 80s aesthetic. You can choose any subject for your theme, though, so be creative!

// 3. Use key events to listen for the letters that your players will type.

// 4. Display the following on the page:

// 5. Press any key to get started!

// 6. Wins: (# of times user guessed the word correctly).

//    * If the word is `madonna`, display it like this when the game starts: `_ _ _ _ _ _ _`.

//    * As the user guesses the correct letters, reveal them: `m a d o _  _ a`.

// 7. Number of Guesses Remaining: (# of guesses remaining for the user).

// 8. Letters Already Guessed: (Letters the user has guessed, displayed like `L Z Y H`).

// 9. After the user wins/loses the game should automatically choose another word and make the user play it.

// ##### Word Guess Game Bonuses

// 1. Play a sound or song when the user guesses their word correctly, like in our demo.
// 2. Write some stylish CSS rules to make a design that fits your game's theme.
// 3. **HARD MODE:** Organize your game code as an object, except for the key events to get the letter guessed. This will be a challenge if you haven't coded with JavaScript before, but we encourage anyone already familiar with the language to try this out.
// 4. Save your whole game and its properties in an object.
// 5. Save any of your game's functions as methods, and call them underneath your object declaration using event listeners.
// 6. Don't forget to place your global variables and functions above your object.
//    * Remember: global variables, then objects, then calls.


// alert("Click a letter to get started!"); 

var score, guesses, item;

var DOMScore = document.getElementById("score");

var next = ["tehran", "conakry"]

var letterUsedList = document.getElementById("lettersUsed").querySelectorAll(".letterUsed");
var letterAnswerList = document.getElementById("guessTiles").querySelectorAll(".letterAnswer");
var tehranList = document.getElementById(next[0]).querySelectorAll(".letterAnswer");

init();

document.querySelector("#lettersUsed").addEventListener("click", function(event) {
    if(gamePlaying) {
        var letter = event.target.id;
        var solution = document.querySelector("." + next[item] + "." + letter); 
            
    // cross out letter clicked
        document.getElementById(letter).style.textDecoration = "line-through";

    // if letter clicked matches letter hidden in solution then display ALL matching hidden letters, increase score by number of letters revealed, and reduce guesses remaining by one

        if(solution) {
            solution.style.visibility = "visible";
            score += 1;
            DOMScore.textContent = score;
            // tehranCheck();            
            lessGuess();
        }  else {
            score -= 1;
            DOMScore.textContent = score;
            lessGuess();
        }
    }
 });


document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    score = 0;
    guesses = 8;
    DOMScore.textContent = "0";
    document.getElementById("guesses").textContent = "8";    
    gamePlaying = true;  
    for (var i = 0; i < letterUsedList.length; i++) {
        letterUsedList[i].style.textDecoration = null;
    };
    for (var j = 0; j < letterAnswerList.length; j++) {
        letterAnswerList[j].style.visibility = "hidden";
    };   
    document.getElementById("lose").style.visibility = "hidden";
    document.getElementById("win").style.visibility = "hidden";
    item = 0;
}

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

// function nextWord() {
//     for (var i = 0; i < next.length; i++) {
//         next[i] += 1;
//     }
// }
 
// function tehranCheck() {
//     if (
//         tehranList[0].style.visibility = "visible" &&
//         tehranList[1].style.visibility = "visible" &&
//         tehranList[2].style.visibility = "visible" &&
//         tehranList[3].style.visibility = "visible" &&
//         tehranList[4].style.visibility = "visible" &&
//         tehranList[5].style.visibility = "visible"
//     ) {
//         return item += 1;
//     };







