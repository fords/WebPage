let moves = 0;
let clicks = 0;
var secondsElapsed = 0;
var matchTwoCards = [];
let flipCard1;
let flipCard2;
var cardsFlippedArr = [];
var shuffled;
var setTimer;

$(document).ready(function() {
    shuffleInit();
    $(".card").click(function() {
       startGame(this);
    });
});

function startGame(card) {
    const cards_Select = document.querySelectorAll('.card');
    $(card).addClass('show open');
    if(matchTwoCards.length > 0 &&  matchTwoCards.length < 2) {
      matchTwoCards.push(card);
      isMatched(matchTwoCards);
    }else {
      matchTwoCards.push(card);
    }
    if(matchTwoCards.length === 2) {
      setTimeout(function(){ removeIncorrect(matchTwoCards);}, 150);
      setTimeout(function(){ removeCorrect(matchTwoCards);}, 150);
      setTimeout(function(){ matchTwoCards = [];}, 270);
    }
    clicksCount();
    starsCalculate(clicks);
}

function clicksCount() {
    clicks++;
    if(clicks === 1) {
      setTImer = setInterval(startTime, 1000);
    }
}


function movesCount() {
    moves++;
    $('.moves').text(moves);
}

function starsCalculate(clicks) {
    var stars = document.querySelectorAll('.fa-star');
    if(clicks >= 32 && clicks < 36){
        $(stars[2]).css('color', '#fbf0ea');
    }
    else if(clicks >= 36 ){
        $(stars[1]).css('color', '#fbf0ea');
    }
}

function startTime() {
    secondsElapsed++;
    var hour = Math.floor(secondsElapsed / 3600);
    var minute = Math.floor((secondsElapsed - hour * 3600) / 60);
    var second = secondsElapsed - (hour * 3600 + minute * 60);
    if(second < 10){
        document.getElementById("timer").innerHTML = minute + ":" + "0" + second;
    } else{
        document.getElementById("timer").innerHTML = minute + ":" + second;
    }
}

function hideModal() {
    $('#win-modal').hide();
}

function shuffleInit() {
    var cards = document.querySelectorAll('.card');
    var cardsArray = objToArray(cards);
    shuffled = shuffle(cardsArray);

    const list = document.createElement("ul");
    for(let i = 0; i < shuffled.length; i++){
        let li = document.createElement("li");
        li.innerHTML = shuffled[i];
        li.classList.add("card");
        list.appendChild(li);
    }

    const createGrid =  document.getElementsByClassName("deck")[0].innerHTML = list.innerHTML;
    return createGrid;
}

// Shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


function removeCorrect(matchTwoCards) {
    for(let i = 0; i < matchTwoCards.length; i++){
        $(matchTwoCards[i]).removeClass('correct');
    }
}

function removeIncorrect(matchTwoCards) {
    for(let i = 0; i < matchTwoCards.length; i++){
        $(matchTwoCards[i]).removeClass('incorrect');
    }
}

function isMatched(matchTwoCards) {
    flipCard1 = matchTwoCards[0].innerHTML;
    flipCard2 = matchTwoCards[1].innerHTML;
    if($(matchTwoCards[0]).is($(matchTwoCards[1]))) {
        matchTwoCards.pop(flipCard2);
        return false;
    } else {
        if (flipCard1 === flipCard2){
            matched(matchTwoCards);
        } else{
            notMatched(matchTwoCards);
        }
    }
}

function matched(matchTwoCards) {
    for(let i = 0; i < matchTwoCards.length; i++){
        $(matchTwoCards[i]).addClass("match");
        $(matchTwoCards[i]).addClass('correct');

        if($(matchTwoCards[i]).hasClass('match')){
          cardsFlippedArr.push(matchTwoCards[i]);
        }
    }
    if(cardsFlippedArr.length === 16){
        winGame();
    }
    movesCount();
}

function notMatched(matchTwoCards) {
    for(let i = 0; i < matchTwoCards.length; i++){
        $(matchTwoCards[i]).removeClass('open show', 800, "easeInBack");
        $(matchTwoCards[i]).addClass('incorrect');
    }
    movesCount();
}


function winGame() {
    let winModalId = document.getElementById('win-modal');
    setTimeout(function() {
      winModalId.style.display = "block";
    }, 300);
    stars = document.querySelectorAll('.fa-star');
    document.getElementById('win-stars').innerHTML =
        "<ul class=\"stars\">" + stars[0].outerHTML + stars[1].outerHTML + stars[2].outerHTML + "</ul>";
    document.getElementById('win-time').innerHTML = document.getElementById("timer").innerHTML;
    document.getElementById('win-moves').innerHTML = moves + 1;
    cardsFlippedArr = [];
    window.clearInterval(setTimer);
}

function restart() {
    document.getElementById('timer').innerHTML = "0:00";
    document.querySelector(".moves").innerHTML = '0';
    $(".open").removeClass("open");
    $(".show").removeClass("show");
    $(".match").removeClass("match");
    stars = document.querySelectorAll('.fa-star');
    for(let i = 0; i < stars.length; i++){
        $(stars[i]).css('color', 'gold');
    }
    clicks = 0;
    moves = 0;
    secondsElapsed = 0;
    matchTwoCards  = [];
    cardsFlippedArr = [];
    window.clearInterval(setTimer);
    shuffleInit();
    $(".card").click(function() {
       startGame(this);
    });
    window.setTimeout(unflip, 1000);


}


function unflip() {
    let cards = document.querySelectorAll(".card");
    for(let i = 0; i < cards.length; i++){
        $(cards[i]).removeClass('open show');
    }
}
// Convert object to array
// https://stackoverflow.com/a/4608021/7997431
function objToArray(obj) {
    var result = [];
    for (var key in obj) {
       if (obj.hasOwnProperty(key)) {
           result.push(obj[key].innerHTML);
       }
    }
    return result;
}
