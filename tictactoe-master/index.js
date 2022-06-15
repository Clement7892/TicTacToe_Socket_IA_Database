$(document).ready(function () {
    let ws = new WebSocket('ws://localhost:8080');
    $("#new").click(function () {
        $('.title').remove();
        if ($("#name").val() == "") {
            alert("Please enter your name");
        }
        else {
            ws.send(JSON.stringify({"action": "newGame", "name": $("#name").val()}));
            $(".join-game").addClass('hidden');
            $("#loader").removeClass('hidden');

        }
    });
    $("#existing").click(function () {
        if ($("#name").val() == "") {
            alert("Please enter your name");
        }
        else {
            ws.send(JSON.stringify({"action": "existingGame", "name": $("#name").val()}));
            $(".join-game").addClass('hidden');
            $("#loader").removeClass('hidden');
        }
    });
    let board = new Board();
    ws.onmessage = function incoming(response) {
        let msg = JSON.parse(response.data);
        if (msg.action === 'start' || msg.action === 'continue') {
            $("#loader").addClass('hidden');
            let myTurn=false;
            board.currentPlayer=msg.board.currentPlayer;
            board.currentGame=msg.board.currentGame;
            board.lines=msg.board.lines;

            if(board.currentPlayer===msg.turn){
                myTurn=true;
            }
            board.drawBoard(myTurn);
        }
        else if(msg.action === 'end') {
            $("#loader").addClass('hidden');
            board.lines=msg.board.lines;
            board.drawBoard(false, msg.message);
        }
        else if(msg.action === 'restart') {
            $("#loader").addClass('hidden');
            $(".join-game").removeClass('hidden');
            $('.title').remove();
            let html = '<p class="title">No game found. Please try again</p>';
            $('body').append(html);
        }
    };
    $('body').on('click', '.cell.selectable', function () {
        board.move($(this).data('index'));
        board.drawBoard();
        ws.send(JSON.stringify({"action": "move", "board": board}));
    });

    let id = 'loader', fill = '#1f1f1f',
        size = 20, radius = 3, duration = 1000,
        maxOpacity = 0.6, minOpacity = 0.15;
    $('<svg id="' + id + '" class="hidden" width="' + (size * 3.5) + '" height="' + size + '">' +
        '<rect width="' + size + '" height="' + size + '" x="0" y="0" rx="' + radius + '" ry="' + radius + '" fill="' + fill + '" fill-opacity="' + maxOpacity + '">' +
        '<animate attributeName="opacity" values="1;' + minOpacity + ';1" dur="' + duration + 'ms" repeatCount="indefinite"/>' +
        '</rect>' +
        '<rect width="' + size + '" height="' + size + '" x="' + (size * 1.25) + '" y="0" rx="' + radius + '" ry="' + radius + '" fill="' + fill + '" fill-opacity="' + maxOpacity + '">' +
        '<animate attributeName="opacity" values="1;' + minOpacity + ';1" dur="' + duration + 'ms" begin="' + (duration / 4) + 'ms" repeatCount="indefinite"/>' +
        '</rect>' +
        '<rect width="' + size + '" height="' + size + '" x="' + (size * 2.5) + '" y="0" rx="' + radius + '" ry="' + radius + '" fill="' + fill + '" fill-opacity="' + maxOpacity + '">' +
        '<animate attributeName="opacity" values="1;' + minOpacity + ';1" dur="' + duration + 'ms" begin="' + (duration / 2) + 'ms" repeatCount="indefinite"/>' +
        '</rect>' +
        '</svg>').appendTo('body');
});