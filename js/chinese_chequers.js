document.addEventListener('DOMContentLoaded', () => {

  const board = document.querySelector('.board');

  addRows();

  function addRows() {
    for (i=0; i<17; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      row.id = `row${i}`;
      row.style.height = `${100/17}%`;
      row.textContent = row.id;
      board.appendChild(row);
    }
  }


})
