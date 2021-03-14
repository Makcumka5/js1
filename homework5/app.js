const board = document.getElementById("gameBoard");
const letters = document.getElementById("letters");
const numbers = document.getElementById("numbers");

const createSquares = () => {
    let change = false;
    let backgroundColor = "white";
    const towers = [0, 7, 56, 63];
    const knights = [1, 6, 57, 62];
    const bishops = [2, 5, 58, 61];
    const queens = [3, 59];
    const kings = [4, 60];

    for (i = 0; i <= 64; i++) {
        const square = document.createElement("div");
        square.classList.add("square");

        change = i % 8 === 0 || i === 0;
        backgroundColor = change ?
            backgroundColor :
            backgroundColor === "white" ?
            "black" :
            "white";
        square.style.backgroundColor = backgroundColor;
        if (square.style.backgroundColor === "black") {
            square.style.color = "white";
        }

        if (i > 7 && i < 16) {
            square.innerHTML = "&#9817;";
        }
        if (i > 47 && i < 56) {
            square.innerHTML = "&#9823";
        }
        if (towers.includes(i)) {
            if (i > 30) {
                square.innerHTML = "♜";
            } else {
                square.innerHTML = "♖";
            }
        }
        if (knights.includes(i)) {
            if (i > 30) {
                square.innerHTML = "♞";
            } else {
                square.innerHTML = "♘";
            }
        }
        if (bishops.includes(i)) {
            if (i > 30) {
                square.innerHTML = "♝";
            } else {
                square.innerHTML = "♗";
            }
        }
        if (queens.includes(i)) {
            if (i > 30) {
                square.innerHTML = "♛";
            } else {
                square.innerHTML = "♕";
            }
        }
        if (kings.includes(i)) {
            if (i > 30) {
                square.innerHTML = "♚";
            } else {
                square.innerHTML = "♔";
            }
        }

        board.appendChild(square);
    }
};

const createNumbers = () => {
    for (i = 8; i > 0; i--) {
        const number = document.createElement("div");
        number.innerText = i;
        numbers.appendChild(number);
    }
};

const createLetters = () => {
    const lettersArr = ["a", "b", "c", "d", "e", "f", "g", "h"];
    for (i = 0; i < 8; i++) {
        const letter = document.createElement("div");
        letter.innerText = lettersArr[i];
        letters.appendChild(letter);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    createSquares();
    createNumbers();
    createLetters();
});