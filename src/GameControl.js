import { useEffect, useState } from "react";
import {
    getEmptyBoard,
    generateRandom,
    moveLeft,
    moveRight,
    moveDown,
    moveUp,
    isOver,
    checkWin
} from "./GameBoard";

const Cell = ({ number }) => {
    return (
        <div className={`cell cell-${number}`}>{number > 0 ? number: ""}</div>
    );
};

const GameControl = () => {
    const [board, updatedBoard] = useState(generateRandom(getEmptyBoard()));

    const checkEndGame = () => {
        if (checkWin(board)) {
            console.log("you win");
        } else if (isOver(board)) {
            console.log("Game Over");
        }
    };

    const left = () => {
        const newBoard = moveLeft(board);
        updatedBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const right = () => {
        const newBoard = moveRight(board);
        updatedBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const up = () => {
        const newBoard = moveUp(board);
        updatedBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const down = () => {
        const newBoard = moveDown(board);
        updatedBoard(generateRandom(newBoard));
        checkEndGame();
    };

    const onKeyDown = (e) => {
        switch (e.key) {
            case "ArrowLeft":
                left();
                break;
            case "ArrowRight":
                right();
                break;
            case "ArrowUp":
                up();
                break;
            case "ArrowDown":
                down();
                break;
            default:
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    });

    return (
        <div>
            <div className="game-board">
                {board.map((row, i ) => {
                    return (
                        <div key={`row-${i}`} className="row">
                            {row.map((cell, j) => (
                                <Cell key={`cell-${i}-${j}`} number={cell} />
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GameControl;