/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice, dice, prevDice1, prevDice2;

var winnningScore = 50;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying) {
    // random number
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;

    // display result
    var diceDOM1= document.querySelector('#dice-1');
    var diceDOM2= document.querySelector('#dice-2');
    // diceDOM.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    document.querySelector('.dice-container').style.display = 'flex';


    ///////////// LEFT TO FIGURE OUT HOW TO ATTACH SECOND DICE RESULT TO GAME LOGISTICS

    //update the round score
    if ((dice1 == 6 || dice2 == 6) && (prevDice1 == 6 || prevDice2 == 6)) {
        alert('Double 6! Lose ALL your points');
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = '0';
        prevDice1 = 0;
        prevDice2 = 0;
        nextPlayer();
    }
    else if (dice1 !== 1 && dice2 !== 1) {
        //add score
        roundScore += dice1;
        roundScore += dice2;
        prevDice1 = dice1;
        prevDice2 = dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        // roundScore = round;
    } else {
        //Next Player
        prevDice1 = 0;
        prevDice2 = 0;
        nextPlayer();
    }      
    }
    // random number
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if(gamePlaying){
    //add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    // scores[activePlayer] = score[activePlayer]  + roundScore //this is the same thing as above

    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if player won the game
    if (scores[activePlayer] >= winnningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice-container').style.display = 'none'; //shouldn't use style property too much
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;

    } else {
        nextPlayer();
    }
    }
})

document.querySelector('.btn-new').addEventListener('click', init); 
//^while init() is a function, we don't use () off the bat because then the computer would call it immediately, and we would like to wait on an actual click to run it

document.querySelector('.btn-score').addEventListener('click', function() {
    winnningScore = document.getElementById('input-score').value;
    document.querySelector('#winning-score').textContent = winnningScore;
});


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice-container').style.display = 'none';
    //this sets the dice display to none which hides it

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active'); //still need to remove first so when we add it doesn't duplicate and have 2 active classes
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
};

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    // can toggle instead of doing it like this^

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice-container').style.display = 'none';
};

// function check6() {
//     if (prevDice == 6 && dice == 6) {
//         alert('double 6!');
//         scores[activePlayer] = 0;
//     }
// }

// function checkWin() {
//     if (scores[activePlayer] >= 10) {
//         alert('Player ' + activePlayer + ' won!');
//     }
// }

//^ we just say btn because the event listener is already calling it


// var x = document.querySelector('#score-0').textContent;
// console.log(x);

// document.getElementById('score-0').textContent = '0';
// document.getElementById('score-1').textContent = '0';
// document.getElementById('current-0').textContent = '0';
// document.getElementById('current-1').textContent = '0';

// document.querySelector('#current-' + activePlayer).textContent = dice;
//^this will write out as #current-0 or #current-1

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//by using innerHTML we can do more than just pure text