
//array of words to choose from
var usStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
var stateAbbr= {
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    'New Hampshire': "NH",
    'New Jersey': "NJ",
    'New Mexico': "NM",
    'New York': "NY",
    'North Carolina': "NC",
    'North Dakota': "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    'Rhode Island': "RI",
    'South Carolina': "SC",
    'South Dakota': "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    'West Virginia': "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
}
///indices of each correct letter in the targetword
var indices;
var newWord = true;
//Key pressed by user
var userLetter;
//the group of guessed letters
var guessedLetters = "";
var targetWord;
//what to type instead of chosen word before user guess
var blankWord;
//number of lives left for each round
var tries = 7;
var winCount=0;
var lostCount=0;
// array of correct guessed letters on each round
var correctLetters;
var randomIndex;
var targetID;
var state;
//SVG path for the target state
var svgElem;
//key trigger
startAnim();
oppeningAnim();
document.onkeyup = function trigger(event){
        //choose a new word and store it in targetWord if the user hasn't guessed
        if (newWord){
            clearStart();
            tries = 5;
            rewriteStats();
            correctLetters = [];
            newWord=false;
            randomIndex = Math.floor(Math.random()*usStates.length)
            state= usStates[randomIndex];
            targetID = stateAbbr[state];
            targetWord = usStates[randomIndex].toUpperCase();      
            resetGuessed();
            secretWord();
            rewriteWord();
        } else{
// What happens when user presses a letter key        
        userLetter = event.key.toUpperCase();
        if (isLetter(userLetter)){
        guessCheck();
        replaceChar();
        printUsedLetters();
        chechWin();
        rewriteWord();
        rewriteStats();
        }
     }
    }


// function to find correct guessed letters and their index in the target word
function guessCheck(){
    indices = [];
    for (var i=0; i<targetWord.length; i++){
        if (targetWord[i] === userLetter) {
            indices.push(i);
            correctLetters.push(userLetter);
    }
} 
}

//generate the secret word by dashes and spaces
function secretWord(){
    blankWord = "";
    for (var i =0; i<targetWord.length; i++){
        if (targetWord[i] != " "){
            blankWord += "-";
        } else if (targetWord[i] == " "){
            blankWord += " ";
        }
    }
}

//function to replace a letter in a string at a particular index
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

//put correct letters in the blank 
function replaceChar(){
    for (var j=0; j<indices.length; j++){
        blankWord = setCharAt(blankWord,indices[j],userLetter);
        console.log(blankWord);
    }
}

//check if the pressed key is a letter key
function isLetter(str) {
    return str.length === 1 && str.toLowerCase() != str.toUpperCase();
  }


//rewrite the placeholder word on each user guess
function rewriteWord(){
    document.getElementById("word-holder").textContent=blankWord;
}

//print used letters if they are not repeated and are not in the target word
function printUsedLetters(){
    if (guessedLetters.indexOf(userLetter)== -1 && correctLetters.indexOf(userLetter) == -1){
        tries--;
        guessedLetters += userLetter + " ";
        }
        document.getElementById("guessed-letters").textContent= guessedLetters ;
    }

//check if user has won or lost
function chechWin(){ 
    if (blankWord.indexOf("-") == -1){
    resetGuessed();
    winCount++;
    tries=0;
    newWord=true;
    stateAnimCorrect();
    burnCorrect();
    burnWord();
}else if (tries==0){
    resetGuessed();
    lostCount++;
    newWord=true;
    stateAnimFalse();
    burnFalse();
    burnWord();
}

}
//Give them 5 chances to try their guesses
function resetGuessed(){
    guessedLetters= "";

}

//rewrite stats
function rewriteStats(){
    document.getElementById("win-count").textContent = winCount;
    document.getElementById("lost-count").textContent = lostCount;
    document.getElementById("try-count").textContent = tries;
}

//burn the chosen word
function burnWord(){
    usStates.splice(randomIndex, 1);
}

//add burnt states to the last column
function burnFalse(){
    var listThis = $("<div>").text(state);
    listThis.addClass("flex-item burnt-list false-guess")
    $("#burnt-list").prepend(listThis);
}
function burnCorrect(){
    var listThis = $("<div>").text(state);
    listThis.addClass("flex-item burnt-list correct-guess");
    $("#burnt-list").prepend(listThis);
}

function clearStart(){
    $("#start").empty();
}
///ANIMATION STUFF
//get svg element by state name
function stateAnimCorrect(){
    svgElem= $("#" + targetID)
    var stateAnim = new TimelineMax ();
    stateAnim.fromTo(svgElem, 1, {x: -200, scale: 2, transformOrigin: "50% 50%"}, {x: 0 ,scale: 1, transformOrigin: "50% 50%", fill: 'green'})
}
function stateAnimFalse(){
    svgElem= $("#" + targetID)
    var stateAnim = new TimelineMax ();
    stateAnim.fromTo(svgElem, 1, {x:-200, scale: 2, transformOrigin: "50% 50%"}, {x:0, scale: 1, transformOrigin: "50% 50%", fill: 'red'})

}

function oppeningAnim(){
    var tl = new TimelineMax();
    tl.staggerFrom(".st0", 2, {scale:0,y:70, transformOrigin: "50% 50%", ease:Elastic.easeOut}, 0.02)
} 
function startAnim(){
    var startAnim = new TimelineMax({repeat: -1});
    startAnim.to("#start-text", 0.5,{opacity:0})
    .to("#start-text", 1, {opacity:1})
}

