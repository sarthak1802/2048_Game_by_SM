var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
  setGame();
};
// card board
function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }
  //create 2 to begin the game
  setTwo();
  setTwo();
}

// Update tiles
function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = ""; //clear the classList
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num.toString();
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192");
    }
  }
}

// action performed when arrow key press
document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
  }
  document.getElementById("score").innerText = score;
});


// Action performed when game play in touchScreen
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
  const xUp = evt.touches[0].clientX;
  const yUp = evt.touches[0].clientY;

  const yDiff = yDown - yUp;
  const xDiff = xDown - xUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      slideLeft();
      setTwo();
    } else if (xDiff <= 0) {
      slideRight();
      setTwo();
    } else if (yDiff > 0) {
      slideUp();
      setTwo();
    } else if (yDiff <= 0) {
      slideDown();
      setTwo();
    }
  }
  document.getElementById("score").innerText = score;
}

function filterZero(row) {
  return row.filter((num) => num != 0); //create new array of all nums != 0
}

function slide(row) {
  //[0, 2, 2, 2]
  row = filterZero(row); //[2, 2, 2]
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    }
  } //[4, 0, 2]
  row = filterZero(row); //[4, 2]
  //add zeroes
  while (row.length < columns) {
    row.push(0);
  } //[4, 2, 0, 0]
  return row;
}

// function for leftKey
function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// function for rightKey
function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r]; //[0, 2, 2, 2]
    row.reverse(); //[2, 2, 2, 0]
    row = slide(row); //[4, 2, 0, 0]
    board[r] = row.reverse(); //[0, 0, 2, 4];
    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// function for upKey
function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// function for downKey
function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// function for set initial value of tile
function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }
  let found = false;
  while (!found) {
    //find random row and column to place a 2 in
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

function hasEmptyTile() {
  // let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        //at least one zero in the board
        return true;
      }
    }
  }
  return false;
}