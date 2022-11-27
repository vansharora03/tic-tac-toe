const gameBoard = (function() {
    let board = [
        ["O","O","O"],
        ["O","O","O"],
        ["O","O","O"],
    ];
    return{board};
})();

const player = function(name, mark) {
    this.name = name;
    this.mark = mark;
}

const game = function() {

}
