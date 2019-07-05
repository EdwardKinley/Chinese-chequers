document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board');
  const score = document.querySelector('.score');

  n = 0;

  addPlayerNumberOptions();
  addRows();
  addSpaces();

  function addPlayerNumberOptions() {
    const numbers = [2, 3, 4, 6];
    for (i=0; i<numbers.length; i++) {
      const option = document.createElement('div');
      option.className = 'option';
      option.id = `option${numbers[i]}`;
      score.appendChild(option);
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
      // row.textContent = row.id;
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
      // space.textContent = space.id.substring(5);
      row.appendChild(space);
    }
  }




})
