/**
 * Stores the tic-tac-toe game board
 * @type {{board: string[][]}}
 */
const gameBoard = (function() {
    let board = [
        ["","",""],
        ["","",""],
        ["","",""],
    ];
    return{board};
})();

/**
 * Creates player objects with a name and a chosen mark ("X" or "O")
 * @param name
 * @param mark
 * @returns {{name, mark}}
 */
const player = function(name, mark) {
    this.name = name;
    this.mark = mark;
    return{name, mark}
}

/**
 *
 * @type {{startGame: startGame}}
 */
const ticTacToe = (function() {

    let _player1 = player("Player X", "X");
    let _player2 = player("Player O", "O");
    const _cells = document.querySelectorAll('.cell');
    const _gameMessage = document.querySelector('.gameMessage');

    let _playerTurn = _player1.mark;

    /***
     * Changes the turn based on whose turn it currently is
     * @private
     */
    const _toggleTurn = function() {
        if(_playerTurn === _player1.mark) {_playerTurn = _player2.mark}
        else if(_playerTurn === _player2.mark) {_playerTurn = _player1.mark}
    }

    /**
     * Updates the 2-dimensional array storing the game board (gameBoard.board)
     * @private
     */
    const _updateBoard = function() {
        let i = 0;
        let j =  0;
        _cells.forEach(cell => {
            if(j > 2) {
                j = 0;
                i++
            }
            gameBoard.board[i][j] = cell.textContent;
            j++
        })
    }

    /***
     * Click event listener that current player to place on mark on the cell, and updates the state of
     * the game after the action
     * @param e
     * @private
     */
    const _addMark = function(e) {
        if(e.target.textContent === "") {
            e.target.textContent = _playerTurn;
            _updateBoard();
            _toggleTurn();
            _checkGameState();
        }
    }

    /**
     * Sets the _addMark click event listener to every cell on the game board
     * @private
     */
    const _setBoard = function() {
        _cells.forEach(cell => {
            cell.addEventListener("click", _addMark);
        })
    }

    /**
     * Checks if the game board has been fully played
     * @returns {boolean}
     * @private
     */
    const _isBoardFull = function() {
        for(let i = 0; i < gameBoard.board.length; i++) {
            for(let j = 0; j < gameBoard.board[i].length; j++) {
                if(gameBoard.board[i][j] === "") {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Stops players from altering the game board state
     * @private
     */
    const _freezeBoard = function() {
        _cells.forEach(cell => {
            cell.removeEventListener("click", _addMark);
        })
    }

    /**
     * Checks if either player has one or a tie has been reached
     * @private
     */
    const _checkGameState = function () {
        let hasWon = false;
        let winMark;
        let winner;

        //check rows for win
        for(let i = 0; i < gameBoard.board.length && !hasWon; i++) {
            if((gameBoard.board[i][0] && gameBoard.board[i][1] && gameBoard.board[i][2]) &&
                gameBoard.board[i][0] === gameBoard.board[i][1] &&
                gameBoard.board[i][1] === gameBoard.board[i][2]) {
                hasWon = true;
                winMark = gameBoard.board[i][0];
            }
        }

        //check columns for win
        for(let i = 0; i < gameBoard.board.length && !hasWon; i++) {
            if((gameBoard.board[0][i] && gameBoard.board[1][i] && gameBoard.board[2][i]) &&
                gameBoard.board[0][i] === gameBoard.board[1][i] &&
                gameBoard.board[1][i] === gameBoard.board[2][i]) {
                hasWon = true;
                winMark = gameBoard.board[0][i];
            }
        }

        //check left diagonal for win
        if((gameBoard.board[0][0] && gameBoard.board[1][1] && gameBoard.board[2][2]) &&
            !hasWon && gameBoard.board[0][0] === gameBoard.board[1][1] &&
            gameBoard.board[1][1] === gameBoard.board[2][2]) {
            hasWon = true;
            winMark = gameBoard.board[0][0];
        }

        //check right diagonal for win
        else if((gameBoard.board[0][2] && gameBoard.board[1][1] && gameBoard.board[2][0]) &&
            !hasWon && gameBoard.board[0][2] === gameBoard.board[1][1] &&
            gameBoard.board[1][1] === gameBoard.board[2][0]) {
            hasWon = true;
            winMark = gameBoard.board[0][2];
        }

        //check for tie
        else if(!hasWon && _isBoardFull()) {
            _gameMessage.textContent = "Tie game!";
            _freezeBoard();
        }

        //relay win message
        if(hasWon) {
            winner = (winMark === _player1.mark)? _player1 : _player2;
            _gameMessage.textContent = winner.name + " has won!";
            _freezeBoard();
        }

    }

    /**
     * Starts the game
     */
    const startGame = function() {
        _setBoard();
    }

    return{startGame};
})();

//Start game
ticTacToe.startGame();