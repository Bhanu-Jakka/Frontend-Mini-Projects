const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restartBtn");
const computerButton = document.getElementById("computerBtn");
const playerButton = document.getElementById("playerBtn");

let board = ["", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsComputer = true;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {

    const index = event.target.dataset.index;

    if (board[index] !== "" || !gameActive) {
        return;
    }

    if (vsComputer && currentPlayer === "O") {
        return;
    }

    makeMove(index, currentPlayer);

    if (!gameActive) {
        return;
    }

    if (vsComputer) {

        currentPlayer = "O";
        statusText.textContent = "Computer is thinking...";

        setTimeout(computerMove, 500);

    } else {

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        statusText.textContent =
            `Player ${currentPlayer}'s turn`;
    }
}

function makeMove(index, player) {

    board[index] = player;

    cells[index].textContent = player;
    cells[index].classList.add(player.toLowerCase());

    checkGame();
}

function checkGame() {

    for (const pattern of winningPatterns) {

        const [a, b, c] = pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            gameActive = false;

            statusText.textContent =
                `${board[a]} wins! 🎉`;

            return;
        }
    }

    if (!board.includes("")) {

        gameActive = false;

        statusText.textContent = "It's a draw!";
    }
}

function computerMove() {

    if (!gameActive) {
        return;
    }

    const availableCells = board
        .map((value, index) => value === "" ? index : null)
        .filter(index => index !== null);

    if (availableCells.length === 0) {
        return;
    }

    let selectedIndex;

    const winningMove = findWinningMove("O");

    if (winningMove !== null) {
        selectedIndex = winningMove;
    } else {

        const blockingMove = findWinningMove("X");

        if (blockingMove !== null) {
            selectedIndex = blockingMove;
        } else if (board[4] === "") {
            selectedIndex = 4;
        } else {
            selectedIndex =
                availableCells[
                    Math.floor(Math.random() * availableCells.length)
                ];
        }
    }

    makeMove(selectedIndex, "O");

    if (!gameActive) {
        return;
    }

    currentPlayer = "X";
    statusText.textContent = "Your turn — X";
}

function findWinningMove(player) {

    for (const pattern of winningPatterns) {

        const [a, b, c] = pattern;

        const values = [board[a], board[b], board[c]];

        if (
            values.filter(value => value === player).length === 2 &&
            values.includes("")
        ) {

            return pattern[values.indexOf("")];
        }
    }

    return null;
}

function restartGame() {

    board = ["", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;

    cells.forEach(function(cell) {

        cell.textContent = "";
        cell.classList.remove("x", "o");

    });

    if (vsComputer) {
        statusText.textContent = "Your turn — X";
    } else {
        statusText.textContent = "Player X's turn";
    }
}

computerButton.addEventListener("click", function() {

    vsComputer = true;

    computerButton.classList.add("active");
    playerButton.classList.remove("active");

    restartGame();
});

playerButton.addEventListener("click", function() {

    vsComputer = false;

    playerButton.classList.add("active");
    computerButton.classList.remove("active");

    restartGame();
});

cells.forEach(function(cell) {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);

restartGame();