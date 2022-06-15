class Game{
    constructor(id,x,o) {
        this.id= id;
        this.board= new Board();
        this.board.currentGame=this.id;
        this.x= x;
        this.o= o;
        this.x.assigned=true;
        this.o.assigned=true;
        this.turn="x";
        this.isEnded=false;
    }
    start(){
        this.board.currentPlayer="x";
        this.x.ws.send(JSON.stringify({"action":"start","board":this.board, "turn":this.turn}));
        this.board.currentPlayer="0";
        this.o.ws.send(JSON.stringify({"action":"start","board":this.board, "turn":this.turn}));
    }
    sendWinners(winner, con){
        if(winner!==false){
            this.isEnded=true;
            if(winner==='draw'){
                this.x.ws.send(JSON.stringify({"action":"end","board":this.board, "message":"Draw!"}));
                this.o.ws.send(JSON.stringify({"action":"end","board":this.board, "message":"Draw!"}));
            }
            if(winner==='x'){
                this.x.ws.send(JSON.stringify({"action":"end","board":this.board, "message":"You won!"}));
                this.o.ws.send(JSON.stringify({"action":"end","board":this.board, "message":"You lost!"}));
            }
            if(winner==='0'){
                this.x.ws.send(JSON.stringify({"action":"end","board":this.board, "message":"You lost!"}));
                this.o.ws.send(JSON.stringify({"action":"end","board":this.board, "message":"You won!"}));
            }
            this.persistResult(con, this.id,this.x.name,this.o.name,winner);
        }
    }
    switchPlayers(valid){
        if(valid){
            if(this.turn==="x"){
                this.turn="0"
            }
            else {
                this.turn="x"
            }
        }
        this.board.currentPlayer="x";
        this.x.ws.send(JSON.stringify({"action":"continue","board":this.board, "turn":this.turn}));
        this.board.currentPlayer="0";
        this.o.ws.send(JSON.stringify({"action":"continue","board":this.board, "turn":this.turn}));
    }
    persistResult(con, game_id, player_x,player_0,winner){
        var sql = "INSERT INTO results (game_id, player_x, player_0, winner) VALUES ('"+game_id+"','"+player_x+"','"+player_0+"','"+winner+"')";
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    }

}

if (typeof global !== 'undefined') {
    global.Game = Game;
}