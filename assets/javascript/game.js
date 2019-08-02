
// 1. Play a sound or song when the user guesses their word correctly, like in our demo.

// 3. **HARD MODE:** Organize your game code as an object, except for the key events to get the letter guessed. This will be a challenge if you haven't coded with JavaScript before, but we encourage anyone already familiar with the language to try this out.
// 4. Save your whole game and its properties in an object.
// 5. Save any of your game's functions as methods, and call them underneath your object declaration using event listeners.
// 6. Don't forget to place your global variables and functions above your object.
//    * Remember: global variables, then objects, then calls.

// ##### Word Guess Game 

// alert("Click a letter to get started!"); 

/**** NOTE: letter tiles created for user to click on to display letters rather than typing letter on keyboard for mobile users */

// Declare and set global variables
    var score, guesses, item; 
    //list of words available
    var next = ["tehran", "conakry", "belmopan", "bangui", "helsinki", "pristina"]

    init();

//Add event listeners

    document.querySelector("#lettersUsed").addEventListener("click", function(event) {
        if(gamePlaying) {
    
            var letter = event.target.id;
            var solution = document.querySelector("." + next[item] + "." + letter); 
            
            // turns node list into array, so can be used with array.every call below
            var tehranList = [].slice.call(document.getElementById(next[item]).querySelectorAll(".letterAnswer"));
                           
        // cross out letter clicked
            document.getElementById(letter).style.textDecoration = "line-through";

        // if letter clicked matches letter hidden in solution
            if(solution) {
                // display ALL matching hidden letters
                solution.style.visibility = "visible";

                //increase score by one
                score += 1;

                //add additional point to displayed score
                document.getElementById("score").textContent = score; 

                // check if word guessed. If it is, 
                if (tehranList.every(isComplete)) {

                    // next word
                    nextWord();
                    
                } else {
                    //if not, remove one remaining guess   
                    lessGuess();
                };         
            
        //if letter clicked doesn't match letter hidden in solution
            }  else {
                // reduce score by one
                score -= 1;
                // take away point from displayed score
                document.getElementById("score").textContent = score;

                //take away from remaining guesses
                lessGuess();
            }
        }
    });

    // if new game button clicked, start over
    document.querySelector(".btn-new").addEventListener("click", init);


//Functions used 

    //Initialize function, sets scores to 0, guesses to 8, hides solution letters, un-crosses out letters
    function init() {
        score = 0;
        guesses = 8;
        item = 0;
        document.getElementById("score").textContent = "0";
        document.getElementById("guesses").textContent = "8";   
        resetLetters(); 
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
        resetLetters();
        item += 1; 
        nextDash();   
        guesses = 8;
        document.getElementById("guesses").textContent = "8";   
        
    };

    //Resets solution and keyboard letters 
    function resetLetters(){
        //reset all letters used to un-crossed out
        var letterUsedList = [].slice.call(document.getElementById("lettersUsed").querySelectorAll(".letterUsed"));
        letterUsedList.forEach(function(element){
            element.style.textDecoration = null;
        })
             
        //hides ALL solution letters (from all countries)
        var letterAnswerList = [].slice.call(document.getElementById("guessTiles").querySelectorAll(".letterAnswer"));
        letterAnswerList.forEach(function(element){
            element.style.visibility = "hidden";
        })
        
        //hides dashes of all words
        var dashes = [].slice.call(document.getElementById("guessTiles").querySelectorAll(".dash"));
        dashes.forEach(function(element){
            element.style.visibility = "hidden";
        })
    };

    //Next dash appears
    function nextDash(){
    var firstDash = [].slice.call(document.getElementById(next[item]).querySelectorAll(".dash"));
    firstDash.forEach(function(element){
        element.style.visibility = "visible";
        console.log("Next dash working")
    })
    };



/****GRAVEYARD */

// function checkComplete() {
//     if (
//         tehranList[0].style.visibility === "visible" &&
//         tehranList[1].style.visibility === "visible" &&
//         tehranList[2].style.visibility === "visible" &&
//         tehranList[3].style.visibility === "visible" &&
//         tehranList[4].style.visibility === "visible" &&
//         tehranList[5].style.visibility === "visible"
//     ) {
//         console.log("its complete!");
//     }
// };   

// function newFunc(word1){
//     // Foreach index in word1

//     for (var i = 0; i < word1.length; i++) {
//         // if some index is not visible
//         if (word1[i].style.visibility === "hidden") {
//             // return false (no need to keep checking)
//             return false;
//         } 
//    }
//    console.log("its working!")    
//    // return True (you've made it to the end of the loop without returning so therefore
//                 //  everything is visible)
//    return true;          
   
// }

    
