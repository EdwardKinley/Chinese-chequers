document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board');
  const score = document.querySelector('.score');
  const target = document.querySelector('.colours');

  n = 0;
  colours = ['blue', 'rebeccapurple', 'green', 'red', 'yellow', 'deeppink'];
  players = [];
  targets = [];
  currentPlayerPieces = [];
  steppables = [];
  hoppables = [];
  movables = [];
  selectedPiece = null;
  spacesStepToable = [];
  spacesHopToable = [];
  spacesMoveToable = [];
  currentMoveKind = null;
  const boardColour = 'silver';
  target.style.background = boardColour;
  board.style.backgroundColor = boardColour;

  homes = [];

  const homesData4 = [['0012', '0111', '0112', '0210', '0211', '0212', '0309', '0310', '0311', '0312'], ['0413', '0414', '0415', '0416', '0513', '0514', '0515', '0613', '0614', '0713'], ['0912', '1011', '1012', '1110', '1111', '1112', '1209', '1210', '1211', '1212'], ['1304', '1305', '1306', '1307', '1404', '1405', '1406', '1504', '1505', '1604'], ['0903', '1002', '1003', '1101', '1102', '1103', '1200', '1201', '1202', '1203'], ['0404', '0405', '0406', '0407', '0504', '0505', '0506', '0604', '0605', '0704']];
  const homesData5 = [['0012', '0111', '0112', '0210', '0211', '0212', '0309', '0310', '0311', '0312', '0408', '0409', '0410', '0411', '0412'], [], [], ['1204', '1205', '1206', '1207', '1208', '1304', '1305', '1306', '1307', '1404', '1405', '1406', '1504', '1505', '1604'], [], []];

  enablePlayerNumberSelection();
  addRows();
  addSpaces();

  document.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
      if (document.querySelector('#endTurnButton') != null) {
        endTurn();
      }
    }
  })

  // colourHomeSpaces('white');

  function enablePlayerNumberSelection() {
    addSelectInstruction();
    addPlayerNumberOptions();
    addStartButton();
  }

  function addSelectInstruction() {
    const selectInstruction = document.createElement('div');
    selectInstruction.className = 'instruction';
    selectInstruction.textContent = 'Select players:';
    score.appendChild(selectInstruction);
  }

  function addPlayerNumberOptions() {
    const numbers = [2, 3, 4, 6];
    for (x=0; x<numbers.length; x++) {
      const option = document.createElement('div');
      option.className = 'option';
      option.id = `option${numbers[x]}`;
      option.style.backgroundImage = `url("images/option${numbers[x]}.png")`;
      const thisX = x;
      option.addEventListener('click', () => {
        removeAllPieces();
        n = numbers[thisX];
        updatePlayers();
        identifyHomes();
        addPieces();
        colourTargets(numbers[thisX]);
        document.querySelector('#startButton').focus();
      })
      score.appendChild(option);
    }
  }

  function colourTargets(n) {
    if (n==2) { target.style.backgroundImage = `conic-gradient(${colours[3]} 0deg 30deg, ${boardColour} 30deg 150deg, ${colours[0]} 150deg 210deg, ${boardColour} 210deg 330deg, ${colours[3]} 330deg 360deg)`; }
    if (n==3) { target.style.backgroundImage = `conic-gradient(${boardColour} 0deg 30deg, ${colours[4]} 30deg 90deg, ${boardColour} 90deg 150deg, ${colours[0]} 150deg 210deg, ${boardColour} 210deg 270deg, ${colours[2]} 270deg 330deg, ${boardColour} 330deg 360deg)`; }
    if (n==4) { target.style.backgroundImage = `conic-gradient(${boardColour} 0deg 30deg, ${colours[4]} 30deg 90deg, ${colours[5]} 90deg 150deg, ${boardColour} 150deg 210deg, ${colours[1]} 210deg 270deg, ${colours[2]} 270deg 330deg, ${boardColour} 330deg 360deg)`; }
    if (n==6) { target.style.backgroundImage = `conic-gradient(${colours[3]} 0deg 30deg, ${colours[4]} 30deg 90deg, ${colours[5]} 90deg 150deg, ${colours[0]} 150deg 210deg, ${colours[1]} 210deg 270deg, ${colours[2]} 270deg 330deg, ${colours[3]} 330deg 360deg)`; }
    // if (n==6) { target.style.backgroundImage = `conic-gradient(${colours[3]} 20deg, ${boardColour} 20deg 40deg, ${colours[4]} 40deg 80deg, ${boardColour} 80deg 100deg, ${colours[5]} 100deg 140deg, ${boardColour} 140deg 160deg, ${colours[0]} 160deg 200deg, ${boardColour} 200deg 220deg, ${colours[1]} 220deg 260deg, ${boardColour} 260deg 280deg, ${colours[2]} 280deg 320deg, ${boardColour} 320deg 340deg, ${colours[3]} 340deg)`; }
  }

  function addStartButton() {
    const startButton = document.createElement('button');
    startButton.className = 'button';
    startButton.id = 'startButton';
    startButton.textContent = 'Start game';
    score.appendChild(startButton);
    startButton.addEventListener('click', () => {
      if (n>0) {
        startGame();
      }
    })
  }

  function removeAllPieces() {
    const pieces = document.querySelectorAll('.piece');
    for (i=0; i<pieces.length; i++) {
      pieces[i].parentNode.removeChild(pieces[i]);
    }
  }

  function addRows(location) {
    for (i=0; i<17; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      row.id = `row${100+i}`;
      row.style.height = `${99/17}%`;
      board.appendChild(row);
    }
  }

  function addSpaces() {
    for (i=0; i<17; i++) {
      row = document.querySelector(`#row${100+i}`);
      if (i<4) {
        addSpacesToRow(row, i+1);
      } else if (i<9) {
        addSpacesToRow(row, 17-i);
      } else if (i<13) {
        addSpacesToRow(row, i+1);
      } else {
        addSpacesToRow(row, 17-i);
      }
    }
  }

  function addSpacesToRow(row, n) {
    for (j=0; j<n; j++) {
      const rowIDn = parseInt(`1${row.id[4]}${row.id[5]}`);
      const space = document.createElement('div');
      space.className = 'space';
      if (rowIDn<104) {
        space.id = `space${rowIDn}-${212-rowIDn+j}`;
      } else if (rowIDn<109) {
        space.id = `space${rowIDn}-${104+j}`;
      } else if (rowIDn<113) {
        space.id = `space${rowIDn}-${212-rowIDn+j}`;
      } else {
        space.id = `space${rowIDn}-${104+j}`;
      }
      space.style.width = `${99/17}%`;
      row.appendChild(space);
    }
  }

  function colourHomeSpaces(colour) {
    const spaces = document.querySelectorAll('.space');
    for (i=0; i<spaces.length; i++) {
      if (i<14 || (i>18 && i<26) || (i>31 && i<37) || (i>43 && i<47) || i==55 || i==65 || (i>73 && i<77) || (i>83 && i<89) || (i>94 && i<102) || i>106) {
        spaces[i].style.backgroundColor = colour;
      }
    }
  }

  function addPieces() {
    for (i=0; i<players.length; i++) {
      for (j=0; j<homes[players[i]].length; j++) {
        const space = homes[players[i]][j];
        const piece = document.createElement('div');
        piece.className = 'piece';
        space.appendChild(piece);
        piece.style.backgroundColor = colours[players[i]];
      }
    }
  }

  function getSpace(i, j) {
    return document.querySelector(`#space${i}-${j}`);
  }

  function startGame() {
    score.innerHTML = '';
    addSectionsToScoreSpace();
    showNewGameButton();
    enableMove();
  }

  function identifyHomes() {
    for (i=0; i<players.length; i++) {
      if (n==2) {
        makeHomeDivs(homesData5);
      } else {
        makeHomeDivs(homesData4);
      }
      targets = [homes[3], homes[4], homes[5], homes[0], homes[1], homes[2]];
    }
  }

  function makeHomeDivs(data) {
    for (i=0; i<data.length; i++) {
      homes[i] = [];
      for (j=0; j<data[i].length; j++) {
        homes[i].push(document.querySelector(`#space1${data[i][j][0]}${data[i][j][1]}-1${data[i][j][2]}${data[i][j][3]}`));
      }
    }
  }

  function isOccupied(space) {
    return (space.firstChild != null && space.firstChild.style.backgroundColor == 'red');
  }

  function addSectionsToScoreSpace() {
    const playerSpace = document.createElement('div');
    playerSpace.id = 'playerSpace';
    score.appendChild(playerSpace);
    const finishersSpace = document.createElement('div');
    finishersSpace.id = 'finishersSpace';
    score.appendChild(finishersSpace);
    const newGameSpace = document.createElement('div');
    newGameSpace.id = 'newGameSpace';
    score.appendChild(newGameSpace);
  }

  function updatePlayers() {
    if (n==2) { players = [0, 3]; }
    if (n==3) { players = [0, 2, 4]; }
    if (n==4) { players = [1, 2, 4, 5]; }
    if (n==6) { players = [0, 1, 2, 3, 4, 5]; }
  }

  function showNewGameButton() {
    const newGameButton = document.createElement('button');
    newGameButton.className = 'button';
    newGameButton.id = 'newGameButton';
    newGameButton.textContent = 'New Game';
    document.querySelector('#newGameSpace').appendChild(newGameButton);
    newGameButton.addEventListener('click', () => {
      location.reload();
    })
  }

  function enableMove() {
    showCurrentPlayer();
    updateCurrentPlayerPieces();
    updateSteppables();
    updateHoppables();
    updateMovables();
    makeMovablesSelectable();
  }

  function showCurrentPlayer() {
    const currentPlayer = document.createElement('div');
    currentPlayer.className = 'currentPlayer';
    currentPlayer.style.backgroundColor = colours[players[0]];
    document.querySelector('#playerSpace').appendChild(currentPlayer);
  }

  function unshowCurrentPlayer() {
    const currentPlayerSign = document.querySelector('.currentPlayer');
    currentPlayerSign.parentNode.removeChild(currentPlayerSign);
  }

  function updateCurrentPlayerPieces() {
    currentPlayerPieces = [];
    const allPieces = document.querySelectorAll('.piece');
    for (i=0; i<allPieces.length; i++) {
      if (allPieces[i].style.backgroundColor == colours[players[0]]) {
        currentPlayerPieces.push(allPieces[i]);
      }
    }
  }

  function updateSteppables() {
    for (i=0; i<currentPlayerPieces.length; i++) {
      if (isSteppable(currentPlayerPieces[i])) {
        steppables.push(currentPlayerPieces[i]);
      }
    }
  }

  function isSteppable(piece) {
    return (canStep(piece, 'sl') || canStep(piece, 'sr') || canStep(piece, 'ul') || canStep(piece, 'ur') || canStep(piece, 'dl') || canStep(piece, 'dr'));
  }

  function canStep(piece, direction) {
    if (relativeSpace(piece, direction, 1) != null && relativeSpace(piece, direction, 1).firstChild == null) { return true; }
  }

  function updateHoppables() {
    for (i=0; i<currentPlayerPieces.length; i++) {
      if (isHoppable(currentPlayerPieces[i])) {
        hoppables.push(currentPlayerPieces[i]);
      }
    }
  }

  function isHoppable(piece) {
    return (canHop(piece, 'sl') || canHop(piece, 'sr') || canHop(piece, 'ul') || canHop(piece, 'ur') || canHop(piece, 'dl') || canHop(piece, 'dr'));
  }

  function canHop(piece, direction) {
    if (relativeSpace(piece, direction, 1) != null && relativeSpace(piece, direction, 1).firstChild != null && relativeSpace(piece, direction, 2) != null && relativeSpace(piece, direction, 2).firstChild == null) { return true; }
  }

  function relativeSpace(piece, direction, distance) {
    const idI = parseInt(`${piece.parentNode.id[5]}${piece.parentNode.id[6]}${piece.parentNode.id[7]}`);
    const idJ = parseInt(`${piece.parentNode.id[9]}${piece.parentNode.id[10]}${piece.parentNode.id[11]}`)
    if (direction == 'sl') { return document.querySelector(`#space${idI}-${idJ-distance}`); }
    else if (direction == 'sr') { return document.querySelector(`#space${idI}-${idJ+distance}`); }
    else if (direction == 'ul') { return document.querySelector(`#space${idI-distance}-${idJ}`); }
    else if (direction == 'ur') { return document.querySelector(`#space${idI-distance}-${idJ+distance}`); }
    else if (direction == 'dl') { return document.querySelector(`#space${idI+distance}-${idJ-distance}`); }
    else if (direction == 'dr') { return document.querySelector(`#space${idI+distance}-${idJ}`); }
  }

  function updateMovables() {
    movables = Array.from(new Set(steppables.concat(hoppables)));
  }

  function makeMovablesSelectable() {
    for (i=0; i<movables.length; i++) {
      movables[i].addEventListener('click', movableClicked);
    }
  }

  function makeMovablesUnselectable() {
    for (i=0; i<movables.length; i++) {
      movables[i].removeEventListener('click', movableClicked);
    }
  }

  function movableClicked() {
    if (selectedPiece == null) {
      makeMovableSelected(this);
    } else if (selectedPiece == this) {
      makeMovableUnselected();
    } else if (selectedPiece != null && selectedPiece != this) {
      makeMovableUnselected();
      makeMovableSelected(this);
    }
  }

  function makeMovableSelected(piece) {
    selectedPiece = piece;
    showSelected(selectedPiece);
    updateAllMoveToables();
    makeMoveToablesMoveToable();
  }

  function makeMovableUnselected() {
    showUnselected(selectedPiece);
    selectedPiece = null;
    emptyAllMoveToables();
  }

  function showSelected(piece) {
    const selection = document.createElement('div');
    selection.className = 'selection';
    piece.appendChild(selection);
  }

  function showUnselected(piece) {
    piece.removeChild(piece.firstChild);
  }

  function emptyAllMoveToables() {
    spacesStepToable = [];
    spacesHopToable = [];
    spacesMoveToable = [];
  }

  function updateAllMoveToables() {
    updateSpacesStepToable();
    updateSpacesHopToable();
    updateSpacesMoveToable();
  }

  function updateSpacesStepToable() {
    if (currentMoveKind != 'hop') {
      if (canStep(selectedPiece, 'ul')) { spacesStepToable.push(relativeSpace(selectedPiece, 'ul', 1)); }
      if (canStep(selectedPiece, 'ur')) { spacesStepToable.push(relativeSpace(selectedPiece, 'ur', 1)); }
      if (canStep(selectedPiece, 'sl')) { spacesStepToable.push(relativeSpace(selectedPiece, 'sl', 1)); }
      if (canStep(selectedPiece, 'sr')) { spacesStepToable.push(relativeSpace(selectedPiece, 'sr', 1)); }
      if (canStep(selectedPiece, 'dl')) { spacesStepToable.push(relativeSpace(selectedPiece, 'dl', 1)); }
      if (canStep(selectedPiece, 'dr')) { spacesStepToable.push(relativeSpace(selectedPiece, 'dr', 1)); }
    }
  }

  function updateSpacesHopToable() {
    if (canHop(selectedPiece, 'ul')) { spacesHopToable.push(relativeSpace(selectedPiece, 'ul', 2)); }
    if (canHop(selectedPiece, 'ur')) { spacesHopToable.push(relativeSpace(selectedPiece, 'ur', 2)); }
    if (canHop(selectedPiece, 'sl')) { spacesHopToable.push(relativeSpace(selectedPiece, 'sl', 2)); }
    if (canHop(selectedPiece, 'sr')) { spacesHopToable.push(relativeSpace(selectedPiece, 'sr', 2)); }
    if (canHop(selectedPiece, 'dl')) { spacesHopToable.push(relativeSpace(selectedPiece, 'dl', 2)); }
    if (canHop(selectedPiece, 'dr')) { spacesHopToable.push(relativeSpace(selectedPiece, 'dr', 2)); }
  }

  function updateSpacesMoveToable() {
    spacesMoveToable = Array.from(new Set(spacesStepToable.concat(spacesHopToable)));
  }

  function makeMoveToablesMoveToable() {
    for (i=0; i<spacesMoveToable.length; i++) {
      spacesMoveToable[i].addEventListener('click', move);
    }
  }

  function move() {
    currentMoveKind = stepOrHop(this);
    makeMoveToablesUnmoveToable();
    makeMovablesUnselectable();
    emptyAllMovables();
    emptyAllMoveToables();
    this.appendChild(selectedPiece);
    showUnselected(selectedPiece);
    selectedPiece = null;
    if (currentMoveKind == 'step') {
      enableNextMove();
    } else if (currentMoveKind == 'hop') {
      makeMovableSelected(this.firstChild);
      if (document.querySelector('#endTurnButton') == null) {
        enableFurtherMove();
      }
    }
  }

  function stepOrHop(space) {
    if (spacesStepToable.includes(space)) { return 'step'; }
    else if (spacesHopToable.includes(space)) { return 'hop'; }
  }

  function makeMoveToablesUnmoveToable() {
    for (i=0; i<spacesMoveToable.length; i++) {
      spacesMoveToable[i].removeEventListener('click', move);
    }
  }

  function enableNextMove() {
    currentMoveKind = null;
    processFinisher();
    updateCurrentPlayer();
    enableMove();
  }

  function processFinisher() {
    // console.log(players[0], colours[players[0]], 'has just moved');
    playerScore = 0;
    for (i=0; i<targets[players[0]].length; i++) {
      if (targets[players[0]][i].firstChild != null && targets[players[0]][i].firstChild.style.backgroundColor == colours[players[0]]) {
        playerScore ++;
      };
    }
    const targetScore = targets[players[0]].length;
    // console.log('target score', targetScore);
    // console.log('score', playerScore);
    // console.log('finished?', playerScore == targetScore);
    if (playerScore == targetScore) {
      showFinisher(players[0]);
      players.shift();
      players.unshift(players.pop());
    }
  }

  function showFinisher(player) {
    const finisher = document.createElement('div');
    finisher.className = 'finisher';
    finisher.textContent = `${n+1 - players.length}`;
    finisher.style.backgroundColor = colours[players[0]];
    document.querySelector('#finishersSpace').appendChild(finisher);
    if (colours[players[0]] == 'yellow') {
      finisher.style.color = 'black';
    }
  }

  function enableFurtherMove() {
    const endTurnButton = document.createElement('button');
    endTurnButton.className = 'button';
    endTurnButton.id = 'endTurnButton';
    endTurnButton.textContent = 'End turn';
    document.querySelector('#playerSpace').appendChild(endTurnButton);
    endTurnButton.addEventListener('click', endTurn);
  }

  function endTurn() {
    const endTurnButton = document.querySelector('#endTurnButton');
    endTurnButton.parentNode.removeChild(endTurnButton);
    makeMovableUnselected();
    enableNextMove();
  }

  function updateCurrentPlayer() {
    unshowCurrentPlayer();
    players.push(players.shift());
  }

  function emptyAllMovables() {
    steppables = [];
    hoppables = [];
    movables = [];
  }

})
