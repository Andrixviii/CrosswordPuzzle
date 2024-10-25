import React, { useState } from 'react';

const CrosswordPuzzle = () => {
  const [score, setScore] = useState(0);

  const answers = {
    across: {
      1: 'JAKARTA',
      2: 'LABIL',
      3: 'KERJA',
      4: 'APOTEK',
      5: 'ATLETIS'
    },
    down: {
      6: 'KABUR',
      7: 'EMPATI',
      8: 'ERA',
      9: 'ASMA',
      10: 'SAPI'
    }
  };

  const grid = [
    [1, 'J', 6, 'K', 'A', 'R', 9, null, null, null, null, null],
    [null, null, 'A', null, null, null, 'S', null, null, null, null, null],
    [2, 'L', 'A', 'B', 'I', null, 'M', null, null, null, null, null],
    [null, null, 'U', null, null, null, 'A', null, null, null, null, null],
    [3, 7, 'E', 'R', 'J', null, null, null, null, null, null, null],
    [null, 'M', null, null, null, null, null, null, null, null, null, null],
    [4, 'A', 'P', 'O', 'T', 'E', null, null, null, null, null, null],
    [null, 'A', null, null, null, null, null, null, null, null, null, null],
    [5, 'A', 'T', 8, 'E', 'T', 10, null, null, null, null, null],
    [null, 'I', null, 'A', null, null, 'A', null, null, null, null, null],
    [null, null, null, 'H', null, null, 'P', null, null, null, null, null],
    [null, null, null, null, null, null, 'I', null, null, null, null, null]
  ];

  const findRelatedWords = (row, col) => {
    const relatedCells = new Set();

    // Check across word
    let startCol = col;
    while (startCol > 0 && grid[row][startCol - 1] !== null) {
      startCol--;
    }
    if (typeof grid[row][startCol] === 'number') {
      let c = startCol;
      while (c < grid[row].length && grid[row][c] !== null) {
        relatedCells.add(`${row}-${c}`);
        c++;
      }
    }

    // Check down word
    let startRow = row;
    while (startRow > 0 && grid[startRow - 1][col] !== null) {
      startRow--;
    }
    if (typeof grid[startRow][col] === 'number') {
      let r = startRow;
      while (r < grid.length && grid[r][col] !== null) {
        relatedCells.add(`${r}-${col}`);
        r++;
      }
    }

    return relatedCells;
  };

  const getWordAt = (row, col, direction) => {
    const inputs = document.querySelectorAll('input');
    let word = '';

    for (let input of inputs) {
      const inputRow = parseInt(input.dataset.row);
      const inputCol = parseInt(input.dataset.col);

      if (direction === 'across' && inputRow === row && inputCol >= col) {
        if (word.length >= answers.across[grid[row][col]].length) break;
        word += input.value || '';
      } else if (direction === 'down' && inputCol === col && inputRow >= row) {
        if (word.length >= answers.down[grid[row][col]].length) break;
        word += input.value || '';
      }
    }

    return word;
  };

  const highlightWord = (row, col, direction, length) => {
    const inputs = document.querySelectorAll('input');
    let count = 0;

    for (let input of inputs) {
      const inputRow = parseInt(input.dataset.row);
      const inputCol = parseInt(input.dataset.col);

      if (direction === 'across' && inputRow === row && inputCol >= col) {
        if (count < length) {
          input.parentElement.classList.add('correct');
          count++;
        }
      } else if (direction === 'down' && inputCol === col && inputRow >= row) {
        if (count < length) {
          input.parentElement.classList.add('correct');
          count++;
        }
      }
    }
  };

  const checkAnswers = () => {
    let correct = 0;
    const totalQuestions = Object.keys(answers.across).length + Object.keys(answers.down).length;

    // Check across
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (typeof grid[i][j] === 'number' && answers.across[grid[i][j]]) {
          const word = getWordAt(i, j, 'across');
          if (word.toUpperCase() === answers.across[grid[i][j]]) {
            correct++;
            highlightWord(i, j, 'across', answers.across[grid[i][j]].length);
          }
        }
      }
    }

    // Check down
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (typeof grid[i][j] === 'number' && answers.down[grid[i][j]]) {
          const word = getWordAt(i, j, 'down');
          if (word.toUpperCase() === answers.down[grid[i][j]]) {
            correct++;
            highlightWord(i, j, 'down', answers.down[grid[i][j]].length);
          }
        }
      }
    }

    const newScore = Math.round((correct / totalQuestions) * 100);
    setScore(newScore);

    if (newScore === 100) {
      alert('Selamat! Anda telah menyelesaikan TTS dengan sempurna!');
    } else {
      alert(`Anda mendapatkan skor ${newScore}. Terus mencoba!`);
    }
  };

  const handleInputFocus = (row, col) => {
    // Clear previous highlights
    document.querySelectorAll('.cell').forEach(cell => {
      cell.classList.remove('highlight', 'active');
    });

    // Highlight active cell
    document.getElementById(`cell-${row}-${col}`).classList.add('active');

    // Highlight related cells
    const relatedCells = findRelatedWords(row, col);
    relatedCells.forEach(cellCoord => {
      const [r, c] = cellCoord.split('-');
      const cell = document.getElementById(`cell-${r}-${c}`);
      if (cell) cell.classList.add('highlight');
    });
  };

  const handleInput = (e) => {
    const currentInput = e.target;
    const currentIndex = Array.from(document.querySelectorAll('input')).indexOf(currentInput);

    // Jika karakter dimasukkan, geser fokus ke input berikutnya
    if (currentInput.value.length === 1) {
      const allInputs = document.querySelectorAll('input');
      if (currentIndex < allInputs.length - 1) {
        allInputs[currentIndex + 1].focus();
      }
    }
  };

  const handleKeyDown = (e) => {
    const currentInput = e.target;
    const currentIndex = Array.from(document.querySelectorAll('input')).indexOf(currentInput);

    if (e.key === 'Backspace' && currentInput.value === '') {
      const allInputs = document.querySelectorAll('input');
      // Pastikan currentIndex lebih dari 0 sebelum mencoba untuk mengakses indeks sebelumnya
      if (currentIndex > 0) {
        // Fokus pada input sebelumnya
        allInputs[currentIndex - 1].focus();
      }
    }
  };

  return (
    <div className="crossword-container">
      <div className="score">
        <span>Score: </span>
        <span id="score">{score}</span>
      </div>
      <div id="grid" className="grid">
        {grid.map((row, i) => (
          row.map((cell, j) => (
            <div 
              key={`${i}-${j}`}
              id={`cell-${i}-${j}`}
              className="cell"
              style={{ visibility: cell === null ? 'hidden' : 'visible' }}
            >
              {cell !== null && (
                <>
                  <input
                    maxLength={1}
                    data-row={i}
                    data-col={j}
                    onFocus={() => handleInputFocus(i, j)}
                    onInput={(e) => handleInput(e, i * grid[0].length + j)}
                    onKeyDown={handleKeyDown}
                  />
                  {typeof cell === 'number' && (
                    <div className="number">{cell}</div>
                  )}
                </>
              )}
            </div>
          ))
        ))}
      </div>
      <button onClick={checkAnswers} className="check-button">
        Check Answers
      </button>
    </div>
  );
};

export default CrosswordPuzzle;
