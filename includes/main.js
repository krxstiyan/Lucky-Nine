$(document).ready(function(){
    var rollCount = 0;
    dMoney = 250000;
    pMoney = 250000;

    $('#wager').keyup(function(){
        bet = parseInt($(this).val());

        if(bet > pMoney && bet > dMoney){
            $('#wager').removeClass("form-control is-valid");
            $('#wager').addClass("form-control is-invalid");
            $('#roll').attr("disabled", "true");
        }else if (bet <= pMoney){
            $('#wager').removeClass("form-control is-invalid");
            $('#wager').addClass("form-control is-valid");
            $('#roll').removeAttr("disabled", "true");
        }
    })

    $('#roll').click(function(){
            
            $('#hold').removeAttr("disabled" , "true");
            rollCount++;
            $('#wager').attr("disabled" , "true");

            if(rollCount == 1){
                $('#plrFrstVal').html(player.randomNum());
                $('#plrSndVal').html(player.randomNum());
                var fval = parseInt($('#plrFrstVal').text());
                var sval = parseInt($('#plrSndVal').text());
                $('#plrHnd').html( "<h4>Hand Value: &nbsp; </h4><h2 id ='plrVal'>"+ player.handVal(fval,sval) +"</h2>");
            }
            else if(rollCount == 2){
                $('#plrTrdVal').html(player.randomNum());
                $('#hold').removeAttr("disabled", "true");
                $('#roll').attr("disabled", "true");
                $('#plrTrdVal').html(player.randomNum());
                var hval = parseInt($('#plrVal').text());
                var tval = parseInt($('#plrTrdVal').text());
                $('#plrHnd').html( "<h4>Hand Value: &nbsp; </h4><h2 id ='plrVal'>"+ player.handVal(tval,hval) +"</h2>");
            }
    })

    $('#hold').click(function(){
        $('#dlrFrstVal').html(dealer.randomNum());
        $('#dlrSndVal').html(dealer.randomNum());
        $('#dlrTrdVal').html(player.randomNum());
        var dfval = parseInt($('#dlrFrstVal').text());
        var dsval = parseInt($('#dlrSndVal').text());
        var dhval = dealer.handVal(dfval,dsval);
        var dtval = parseInt($('#dlrTrdVal').text());
        $('#dlrHnd').html( "<h4>Hand Value: &nbsp; </h4><h2 id ='dlrVal'>"+ dealer.handVal(dtval,dhval) +"</h2>");
        $('#roll').attr("disabled", "true");
        $('#hold').attr("disabled", "true");
        $('#reset').removeAttr("disabled" , "true");
    
    })

    $('#hold').click(function(){
        var pval = parseInt($('#plrVal').text());
        var dlval = parseInt($('#dlrVal').text());
        var cashWon = parseInt($('#wager').val());
        if (pval > dlval){
            alert ("Player Wins: $" + cashWon);
            pMoney += cashWon;
            dMoney -= cashWon;
            $('#playerCash').html("$" + pMoney);
            $('#dealerCash').html("$" + dMoney);

        }else if( pval < dlval){
            alert ("Dealer Wins: $" + cashWon);
            pMoney -= cashWon;
            dMoney += cashWon;
            $('#playerCash').html("$" + pMoney);
            $('#dealerCash').html("$" + dMoney);

        }else if(pval == dval){
            alert ("Draw");
            $('#playerCash').html("$" + pMoney);
            $('#dealerCash').html("$" + dMoney);
        }
    })

    $('#hold').click(function(){
        if(pMoney == 500000 ){
            $('body').css({
                "background-color" : "green"
            });
            alert("PLAYER WINS THE GAME");
        }else if(dMoney == 500000){
            $('body').css({
                "background-color" : "red"
            });
            alert("PLAYER LOSES THE GAME");
        }
    })

    $('#reset').click(function(){
        $('#dlrFrstVal').html("");
        $('#dlrSndVal').html("");
        $('#dlrTrdVal').html("");
        $('#plrFrstVal').html("");
        $('#plrSndVal').html("");
        $('#plrTrdVal').html("");
        $('#dlrHnd').html("");
        $('#plrHnd').html("");
        $('#roll').removeAttr("disabled", "true");
        $('#wager').removeAttr("disabled" , "true");
        $('#hold').attr("disabled", "true");
        $('#reset').attr("disabled" , "true");
        rollCount = 0;
    })


function luckyNine(){
    this.randomNum = function() {
        var rand = Math.floor((Math.random() * 13) + 1);
        return rand;
    }
    this.handVal = function (x,y) {
        if(x + y < 10){
            return (x + y);
        } else if(x + y >= 10 && x + y < 20){
            return (x + y) -10;
        }else if(x + y >= 20 ){
            return (x + y) -20;
        }
    }
}

let player = new luckyNine();
let dealer = new luckyNine();

});

