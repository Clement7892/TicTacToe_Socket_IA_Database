var State = function(old) {
    this.turn = "";
    this.oMovesCount = 0;
    this.result = "still running";
    this.board = [];

    if(typeof old !== "undefined") {
        var len = old.board.length;
        this.board = new Array(len);

        for(var itr = 0 ; itr < len ; itr++) {
            this.board[itr] = old.board[itr];
        }

        this.oMovesCount = old.oMovesCount;
        this.result = old.result;
        this.turn = old.turn;
    }

    this.advanceTurn = function() {
        this.turn = this.turn === "X" ? "O" : "X";
    }

    this.emptyCells = function() {
        var indxs = [];
        for(var itr = 0; itr < 9 ; itr++) {
            if(this.board[itr] === "E") {
                indxs.push(itr);
            }
        }
        return indxs;
    }

    this.isTerminal = function() {
        var B = this.board;

        for(var i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        for(var i = 0; i <= 2 ; i++) {
            if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        var available = this.emptyCells();
        if(available.length == 0) {
            this.result = "draw";
            return true;
        }
        else {
            return false;
        }
    };

};

var Game = function(autoPlayer) {
    this.ai = autoPlayer;
    this.currentState = new State();
    this.currentState.board = ["E", "E", "E",
                               "E", "E", "E",
                               "E", "E", "E"];
    this.currentState.turn = "X";
    this.status = "beginning";

    this.advanceTo = function(_state) {
        this.currentState = _state;
        if(_state.isTerminal()) {
            this.status = "ended";

            if(_state.result === "X-won")
                ui.switchViewTo("won");
            else if(_state.result === "O-won")
                ui.switchViewTo("lost");
            else
                ui.switchViewTo("draw");
        }
        else {
            if(this.currentState.turn === "X") {
                ui.switchViewTo("human");
            }
            else {
                ui.switchViewTo("robot");
                this.ai.notify("O");
            }
        }
    };

    this.start = function() {
        if(this.status = "beginning") {
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }

};

Game.score = function(_state) {
    if(_state.result === "X-won"){
        return 10 - _state.oMovesCount;
    }
    else if(_state.result === "O-won") {
        return - 10 + _state.oMovesCount;
    }
    else {
        return 0;
    }
}