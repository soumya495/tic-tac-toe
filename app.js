const boxes = document.querySelectorAll(".box");
let currentPlayerTurn = "x-turn";
const winningPostions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function gameStart() {
  boxes.forEach((box) => box.classList.add(currentPlayerTurn));
}

function swapTurn() {
  if (currentPlayerTurn === "x-turn") currentPlayerTurn = "circle-turn";
  else currentPlayerTurn = "x-turn";
  boxes.forEach((box) => {
    box.classList.remove("x-turn");
    box.classList.remove("circle-turn");
    box.classList.add(currentPlayerTurn);
  });
}

function hasWon(current) {
  return winningPostions.some((position) => {
    return position.every((index) => {
      return boxes[index].classList.contains(current);
    });
  });
}

function Draw() {
  return [...boxes].every((box) => {
    return box.classList.contains("x") || box.classList.contains("circle");
  });
}

function handleClick(e) {
  if (currentPlayerTurn === "x-turn") e.target.classList.add("x");
  else e.target.classList.add("circle");
  let current = currentPlayerTurn === "x-turn" ? "x" : "circle";
  if (hasWon(current)) {
    document.querySelector(".game-end-popup").classList.add("active");
    document.querySelector(".message").textContent = `${current} WON!`;
  } else if (Draw()) {
    document.querySelector(".game-end-popup").classList.add("active");
    document.querySelector(".message").textContent = `DRAW!`;
  } else swapTurn();
}

gameStart();

boxes.forEach((box) => {
  box.addEventListener("click", handleClick, { once: true });
});
