class Board {
    constructor(lines) {
        this.currentPlayer = "x";
        this.currentGame = "";
        if (typeof lines !== 'undefined') {
            this.lines = lines;
        }
        else {
            this.lines = [
                "", "", "",
                "", "", "",
                "", "", ""
            ];
        }
    }

    drawBoard(myTurn, message) {
        if (typeof message === 'undefined') {
            message = 'You play with ' + this.currentPlayer;
        }
        let html = '<p class="title">' + message + '</p>' +
            '<div class="board">' +
            '<div class="row">';
        for (let line = 0; line < this.lines.length; line++) {
            let extraClass = "";
            if (myTurn===true && this.lines[line] === "") {
                extraClass = " selectable";
            }
            html += '<div class="col-md-4 cell' + extraClass + '" data-index="' + line + '">';
            html += this.lines[line];
            html += '</div>';
        }
        html += '</div>' +
            '</div>';
        $('.title').remove();
        $('.board').remove();
        $('body').append(html);
    }

    move(index) {
        if (this.lines[index] === "") {
            this.lines[index] = this.currentPlayer;
            return true;
        }
        return false;
    }

    moveIsValid(board) {
        let countModified = 0;
        let modified = null;
        for (let line = 0; line < this.lines.length; line++) {
            if (this.lines[line] !== board.lines[line]) {
                countModified++;
                modified = board.lines[line];
            }
        }
        if (countModified !== 1 || modified !== board.currentPlayer) {
            return false;
        }
        return true;
    }

    gameEnded() {
        if (this.won("x")) {
            return "x";
        }
        else if (this.won("0")) {
            return "0";
        }
        else if (this.lines.indexOf("") < 0) {
            return "draw";
        }
        else {
            return false
        }
    }

    won(player) {
        if (this.lines[0] == player && this.lines[1] == player && this.lines[2] == player) {
            return true;
        }
        if (this.lines[3] == player && this.lines[4] == player && this.lines[5] == player) {
            return true;
        }
        if (this.lines[6] == player && this.lines[7] == player && this.lines[8] == player) {
            return true;
        }
        if (this.lines[0] == player && this.lines[3] == player && this.lines[6] == player) {
            return true;
        }
        if (this.lines[1] == player && this.lines[4] == player && this.lines[7] == player) {
            return true;
        }
        if (this.lines[2] == player && this.lines[5] == player && this.lines[8] == player) {
            return true;
        }
        if (this.lines[0] == player && this.lines[4] == player && this.lines[8] == player) {
            return true;
        }
        if (this.lines[2] == player && this.lines[4] == player && this.lines[6] == player) {
            return true;
        }
        return false;
    }
}

if (typeof global !== 'undefined') {
    global.Board = Board;
}