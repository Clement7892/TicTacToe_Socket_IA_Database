class Player{
    constructor(id,ws , name) {
        this.id=id;
        this.ws=ws;
        this.assigned=false;
        if(typeof name !== 'undefined'){
            this.name = name;
        }
        else {
            this.name = "";
        }
    }
}

if (typeof global !== 'undefined') {
    global.Player = Player;
}