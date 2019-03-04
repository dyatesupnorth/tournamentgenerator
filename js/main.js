function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
var names = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6"];
var games = [
    "COD : WW2 : 1v1",
    "COD : WW2 Free-For-All",
    "COD : WW2 Team Deathmatch",
    "COD : Black Ops 4 : 1v1",
    "COD : Black Ops 4 : Free-For-All",
    "COD : Black Ops 4 : Team Deathmatch",    
    "Street Fighter V : Best of 3", 
    "Dragonball Fighter Z : Best of 3", 
    "Rocket League: 1 v 1",
    "Rocket League: Rumble",  
    "Minecraft : Tumble",
    "Minecraft : Battle", 
    "Horizon: Chase Turbo : Best Finishing Position",  
    "Gang Beasts"
];
var currentRound = []
var roundCount = 0
function addPlayer() {

    var playerName = document.getElementById('playerName').value
    document.getElementById('playerName').value = ''
    names.push(playerName)

    console.log(names)

}
function outcomeChanged() {
    var sel = document.getElementById('outcome').value;
    console.log(sel)

}
function setOutcome() {
    var sel = document.getElementById('outcome').value;
}

function finishRound() {

    
    roundCount++

    var arr = []
    var anyGamesNotFinished = false
    currentRound.forEach(game => {
        console.log(anyGamesNotFinished)
        if (!game.outcome) {
            alert('The game between ' + game.player1 + ' and ' + game.player2 + ' is not finished');
            anyGamesNotFinished = true
            console.log(anyGamesNotFinished)

        } else {
            arr.push(game.outcome)
            console.log(anyGamesNotFinished)

        }

    });
 

    names = arr
    console.log(names)
    var divCurrentRound = document.getElementById('currentRound');
    divCurrentRound.innerHTML = ""

    generateRound()
    if(currentRound.round == "It's the Final Round"){
        var sound = new Howl({
            src: ['final.mp3']
        });
        var btnFinishRound = document.getElementById('finishRound')
        btnFinishRound.style = 'display:none;'
        var btnEndTournament = document.getElementById('endTournament')
        btnEndTournament.style = 'display:inline-flex;'
        
        var bg = document.getElementById('hero')
        bg.style.backgroundImage = "url('img/victory.jpg')";
    }

}

function endTournament(){
    window.location.reload(false); 
}

function displayRound() {
    switch (names.length) {
        case 6:
            return "It's the Quarter Final"
        case 5:
            return "It's the Quarter Final"
        case 4:
            return "It's the Semi Final"
        case 3:
            return "It's the Semi Final"
        case 2:
            return "It's the Final Round"
            break;
        default:
            return "Round " + (roundCount + 1)
            break;
    }
}

function generateGame(game) {
    console.log(game);
    var divCurrentRound = document.getElementById('currentRound');
    var currentGame = - document.getElementById('currentGame');
    currentGame.innerHTML = game.game
    console.log(divCurrentRound)
    var div = document.createElement('div')
    div.id = game.id
    divCurrentRound.appendChild(div);

    if (game.seed) {
        var gameDescription = document.createElement('p');
        gameDescription.className = "subtitle"
        gameDescription.innerHTML = game.seed + " is automatically through to the next round"

        divCurrentRound.appendChild(gameDescription)

    } else {

        var gameDescription = document.createElement('p');
        gameDescription.innerHTML = '<p class="title"><strong>' + game.player1 + '</strong> vs <strong>' + game.player2 + '</strong></p><p class="subtitle">' + game.game
        div.appendChild(gameDescription)

        var divSel = document.createElement('div')
        divSel.className = "select"
        div.appendChild(divSel)
        var sel = document.createElement('select');
        sel.id = "game-" + game.id
        divSel.appendChild(sel)
        var opt = document.createElement('option');
        opt.innerHTML = ''
        sel.appendChild(opt);

        var opt = document.createElement('option');
        opt.innerHTML = game.player1;
        opt.value = game.player1;
        sel.appendChild(opt);

        var opt = document.createElement('option');
        opt.innerHTML = game.player2;
        opt.value = game.player2;
        sel.appendChild(opt);

        sel.addEventListener('change', function (sel) {
            console.log(sel);
            console.log('game', game);
            outcome.innerHTML = 'Winner is : ' + this.value;
            game.complete = true
            game.outcome = this.value
            console.log('game', game);

        })

        var outcome = document.createElement('p');
        div.appendChild(outcome)
    }
    var br = document.createElement('br');
    div.appendChild(br)
}
function generateRound() {
    console.log(names)
    currentRound = []

    // Hide the generate button
    var btnGenerateRound = document.getElementById('generateRound')
    btnGenerateRound.style = 'display:none';
    var finishRound = document.getElementById('finishRound');
    finishRound.style = "display:inline-flex;"
    var divCurrentRound = document.getElementById('currentRound');
    divCurrentRound.innerHTML = ""
    var arr = shuffle(names)
    console.log(arr)
    for (var i = 0; i < arr.length; i += 2) {
        if (arr[i + 1] !== undefined) {
            var game = {
                id: uuid(),
                player1: arr[i],
                player2: arr[i + 1],
                game: shuffle(games)[0],
                complete: false,
                outcome: ''
            }
            currentRound.push(game);
        } else {
            var game = {
                id: uuid(),
                seed: arr[i],
                outcome: arr[i]
            }
            currentRound.push(game);
        }
    }
    currentRound.forEach(game => {
        generateGame(game)
    });
    currentRound.round = displayRound()
    // If round is x play y sound 
    
    var divRoundName = document.getElementById('roundName')
    divRoundName.innerHTML = ""
    var roundName = document.createElement('p')
    roundName.innerHTML = "<p>" + currentRound.round + "</p>"
    divRoundName.appendChild(roundName)
    console.log(currentRound)

} function addGame() {

    var gameName = document.getElementById('gameName').value
    document.getElementById('gameName').value = ''
    games.push(gameName)

    console.log(games)

}

