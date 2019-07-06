document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board');
  const score = document.querySelector('.score');

  n = 0;
  colours = ['red', 'yellow', 'green', 'blue', 'purple', 'darkorange'];

  addPlayerNumberOptions();
  addRows();
  addSpaces();
  // addPieces(2);
  // addPieces(3);
  // addPieces(4);
  // addPieces(6);

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
        addPieces(numbers[thisX]);
      })
      score.appendChild(option);
    }
  }

  function removeAllPieces() {
    const pieces = document.querySelectorAll('.piece');
    console.log(pieces);
    for (i=0; i<pieces.length; i++) {
      pieces[i].parentNode.removeChild(pieces[i]);
    }
  }

  function addRows(location) {
    for (i=0; i<17; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      if (i<10) {
        row.id = `row0${i}`;
      } else {
        row.id = `row${i}`;
      }
      row.style.height = `${100/17}%`;
      board.appendChild(row);
    }
  }

  function addSpaces() {
    for (i=0; i<17; i++) {
      if (i<10) {
        row = document.querySelector(`#row0${i}`);
      } else {
        row = document.querySelector(`#row${i}`);
      }
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
      const space = document.createElement('div');
      space.className = 'space';
      if (j<10) {
        space.id = `space${row.id[3]}${row.id[4]}-0${j}`;
      } else {
        space.id = `space${row.id[3]}${row.id[4]}-${j}`;
      }
      space.style.width = `${100/17}%`;
      row.appendChild(space);
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
          addPiece(thisI, j, colours[0]);
        }
      }
      if (lines==5) {
        for (k=0; k<5; k++) { addPiece(4, k+4, colours[0]); }
      }
    }
    if (id==1) {
      for (i=4; i<=7; i++) {
        thisI = i;
        for (j=9; j<17-thisI; j++) {
          addPiece(thisI, j, colours[1])
        }
      }
    }
    if (id==2) {
      for (i=9; i<=12; i++) {
        thisI = i;
        for (j=9; j<=thisI; j++) {
          addPiece(thisI, j, colours[2])
        }
      }
    }
    if (id==3) {
      if (lines==5) {
        for (k=0; k<5; k++) { addPiece(12, k+4, colours[3]); }
      }
      for (i=0; i<4; i++) {
        thisI = i;
        for (j=0; j<4-thisI; j++) {
          addPiece(thisI+13, j, colours[3]);
        }
      }
    }
    if (id==4) {
      for (i=9; i<=12; i++) {
        thisI = i;
        for (j=0; j<thisI-8; j++) {
          addPiece(thisI, j, colours[4])
        }
      }
    }
    if (id==5) {
      for (i=4; i<=7; i++) {
        thisI = i;
        for (j=0; j<8-thisI; j++) {
          addPiece(thisI, j, colours[5])
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
    if (i<10 && j<10) { return document.querySelector(`#space0${i}-0${j}`); }
    if (i<10 && j>=10) { return document.querySelector(`#space0${i}-${j}`); }
    if (i>=10 && j<10) { return document.querySelector(`#space${i}-0${j}`); }
    if (i>=10 && j>=10) { return document.querySelector(`#space${i}-${j}`); }
  }

})
