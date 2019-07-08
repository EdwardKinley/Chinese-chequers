document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board');
  const score = document.querySelector('.score');

  n = 0;
  colours = ['red', 'yellow', 'green', 'blue', 'purple', 'darkorange'];
  players = [];
  currentPlayerPieces = [];
  steppables = [];
  hoppables = [];
  movables = [];
  selectedPiece = null;
  spacesStepToable = [];
  spacesHopToable = [];
  spacesMoveToable = [];
  currentMoveKind = null;

  enablePlayerNumberSelection();
  addRows();
  addSpaces();
  // n=6;
  // addPieces(6);
  // startGame();

  // colourHomeSpaces('#202020');

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
        addPieces(numbers[thisX]);
        colourTargets(numbers[thisX]);
      })
      score.appendChild(option);
    }
  }

  function colourTargets(n) {
    const target = document.querySelector('.colours');
    if (n==2) { target.style.backgroundImage = 'conic-gradient(blue 0deg 30deg, goldenrod 30deg 150deg, red 150deg 210deg, goldenrod 210deg 330deg, blue 330deg 360deg)'; }
    if (n==3) { target.style.backgroundImage = 'conic-gradient(goldenrod 0deg 30deg, purple 30deg 90deg, goldenrod 90deg 150deg, red 150deg 210deg, goldenrod 210deg 270deg, green 270deg 330deg, goldenrod 330deg 360deg)'; }
    if (n==4) { target.style.backgroundImage = 'conic-gradient(goldenrod 0deg 30deg, purple 30deg 90deg, darkorange 90deg 150deg, goldenrod 150deg 210deg, yellow 210deg 270deg, green 270deg 330deg, goldenrod 330deg 360deg)'; }
    if (n==6) { target.style.backgroundImage = 'conic-gradient(blue 0deg 30deg, purple 30deg 90deg, darkorange 90deg 150deg, red 150deg 210deg, yellow 210deg 270deg, green 270deg 330deg, blue 330deg 360deg)'; }
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

  function addPieces(n) {
    if (n==2) {
      addSet(0, 5);
      addSet(3, 5);
    }
    if (n==3) {
      addSet(0, 4);
      addSet(2, 4);
      addSet(4, 4);
    }
    if (n==4) {
      addSet(1, 4);
      addSet(2, 4);
      addSet(4, 4);
      addSet(5, 4);
    }
    if (n==6) {
      addSet(0, 4);
      addSet(1, 4);
      addSet(2, 4);
      addSet(3, 4);
      addSet(4, 4);
      addSet(5, 4);
    }
  }

  function addSet(id, lines) {
    if (id==0) {
      for (i=0; i<4; i++) {
        thisI = i;
        for (j=0; j<=thisI; j++) {
          addPiece(100+thisI, 112-thisI+j, colours[0]);
        }
      }
      if (lines==5) {
        for (k=0; k<5; k++) { addPiece(104, k+108, colours[0]); }
      }
    }
    if (id==1) {
      for (i=4; i<=7; i++) {
        thisI = i;
        for (j=13; j<21-thisI; j++) {
          addPiece(100+thisI, 100+j, colours[1])
        }
      }
    }
    if (id==2) {
      for (i=9; i<=12; i++) {
        thisI = i;
        for (j=0; j<=thisI-9; j++) {
          addPiece(100+thisI, 121-thisI+j, colours[2])
        }
      }
    }
    if (id==3) {
      if (lines==5) {
        for (k=0; k<5; k++) { addPiece(112, k+104, colours[3]); }
      }
      for (i=0; i<4; i++) {
        thisI = i;
        for (j=0; j<4-thisI; j++) {
          addPiece(thisI+113, 104+j, colours[3]);
        }
      }
    }
    if (id==4) {
      for (i=9; i<=12; i++) {
        thisI = i;
        for (j=12-thisI; j<4; j++) {
          addPiece(100+thisI, 100+j, colours[4])
        }
      }
    }
    if (id==5) {
      for (i=4; i<=7; i++) {
        thisI = i;
        for (j=4; j<12-thisI; j++) {
          addPiece(100+thisI, 100+j, colours[5])
        }
      }
    }
  }

  function addPiece(i, j, colour) {
    space = getSpace(i, j);
    const piece = document.createElement('div');
    piece.className = 'piece';
    space.appendChild(piece);
    piece.style.backgroundColor = colour;
  }

  function getSpace(i, j) {
    return document.querySelector(`#space${i}-${j}`);
  }

  function startGame() {
    score.innerHTML = '';
    // addPiece(106, 112, 'red')
    updatePlayers();
    addSectionsToScoreSpace();
    showNewGameButton();
    enableMove();
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
      // selectedPiece = this;
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
      console.log(this);
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
    updateCurrentPlayer();
    enableMove();
  }

  function enableFurtherMove() {
    const endTurnButton = document.createElement('button');
    endTurnButton.className = 'button';
    endTurnButton.id = 'endTurnButton';
    endTurnButton.textContent = 'End turn';
    document.querySelector('#playerSpace').appendChild(endTurnButton);
    endTurnButton.addEventListener('click', () => {
      endTurnButton.parentNode.removeChild(endTurnButton);
      makeMovableUnselected();
      enableNextMove();
    })
  }

  // function enableMove() {
  //   showCurrentPlayer();
  //   updateCurrentPlayerPieces();
  //   updateSteppables();
  //   updateHoppables();
  //   updateMovables();
  //   makeMovablesSelectable();
  // }

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
