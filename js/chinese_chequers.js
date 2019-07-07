document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board');
  const score = document.querySelector('.score');

  n = 0;
  colours = ['red', 'yellow', 'green', 'blue', 'purple', 'darkorange'];
  players = [];
  currentPlayerPieces = [];
  steppables = [];
  hoppables = [];

  enablePlayerNumberSelection();
  addRows();
  addSpaces();
  // colourHomeSpaces('#505050');

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
      })
      score.appendChild(option);
    }
  }

  function addStartButton() {
    const startButton = document.createElement('button');
    startButton.className = 'button';
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
      row.style.height = `${100/17}%`;
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
      // console.log(rowIDn);
      const space = document.createElement('div');
      space.className = 'space';
      // space.id = `space1${row.id[4]}${row.id[5]}-${100+j}`;
      // space.id = `space${rowIDn}-${100+j}`;
      if (rowIDn<104) {
        space.id = `space${rowIDn}-${212-rowIDn+j}`;
      } else if (rowIDn<109) {
        space.id = `space${rowIDn}-${104+j}`;
      } else if (rowIDn<113) {
        space.id = `space${rowIDn}-${212-rowIDn+j}`;
      } else {
        space.id = `space${rowIDn}-${104+j}`;
      }
      // console.log(space.id);
      space.style.width = `${100/17}%`;
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
    addPiece(109, 105, 'red')
    updatePlayers();
    showNewGameButton();
    enableMove();
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
    newGameButton.textContent = 'New Game';
    score.appendChild(newGameButton);
    newGameButton.addEventListener('click', () => {
      location.reload();
    })
  }

  function enableMove() {
    updateCurrentPlayerPieces();
    updateSteppables();
    updateHoppables();
  }

  function updateCurrentPlayerPieces() {
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
    console.log('steppables', steppables);
    // for (j=0; j<steppables.length; j++) {
    //   steppables[j].style.backgroundColor = 'salmon'
    // }
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
    console.log('hoppables', hoppables);
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





})
