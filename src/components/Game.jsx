import Square from '../components/Square'
import Restart from '../components/Restart'
import { useState } from 'react';

export default function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [statusMessage, setStatusMessage] = useState('Start!');
    const winner = calculateWinner(squares);


    function renderSquare(n) {    
        return <Square value={squares[n]} onClick={() => {
            if(squares[n] !== null || winner !== null) {
                setStatusMessage(`Winner: ${winner}`)
                return;
            }
            setStatusMessage(`Next Move: ${isXNext ? 'O' : 'X'}`)
            const nextSquares = squares.slice();
            nextSquares[n] = isXNext ? 'X' : 'O';
            setSquares(nextSquares);
            setIsXNext(!isXNext);
        }} />
    }

    function renderRestartButton() {
        return <Restart onClick={() => {
            setSquares(Array(9).fill(null));
            setIsXNext(true);
        }}
        />
    }

    function isBoardFull(squares) {
        for(let val=0;val<squares.length;val++) {
            if(squares[val] == null)
                return false;
        }
        return true;
    }

    function getStatus(squares) {
        if(winner)
            setStatusMessage(`Winner : ${winner}`);
        else if(isBoardFull(squares))
            setStatusMessage(`Draw`);
        else 
            setStatusMessage(`Next Turn: ${isXNext ? 'O' : 'X'}`)
    }

    function calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for(let line of lines) {
            const [a, b, c] = line;
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    
    
    return (  
    <>
        <div className="container">
            <div className="game">
                <div className="game-board">
                    <div className="game-row">
                        { renderSquare(0) }
                        { renderSquare(1) }
                        { renderSquare(2) }

                    </div>
                    <div className="game-row">
                        { renderSquare(3) }
                        { renderSquare(4) }
                        { renderSquare(5) }
                    </div>
                    <div className="game-row">
                        { renderSquare(6) }
                        { renderSquare(7) }
                        { renderSquare(8) }
                    </div>
                </div>
            </div>
        </div>
        <div className="buttons">
            <div className="game-info">{statusMessage}</div>
            <div className="restart-button">{renderRestartButton()}</div>
        </div>
    </>
    )
}