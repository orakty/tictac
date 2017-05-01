"use strict"
var x_i, 
    x_j,
    o_i, 
    o_j,
    n = 0,
    m = 0;
var mas = [],
    max = 0;
    
$( document ).ready(function() {
    
        
    function soundClick() {
      var audio = new Audio(); 
      audio.src = 'audio/click.mp3';
      audio.autoplay = true; 
    };
    
    $('[name=button2]').on('click', function(){
        var html = '';
        var count = 0;
        $('[name=game]').html(html);
        if($('[name=rowColum]').val()<5){
            alert('Высота и ширина должна быть больше 5')
        } else{ 
            n = $('[name=rowColum]').val(),
            m = $('[name=rowColum]').val();
            for (var i = -4; i < m+4; i++){
                mas[i] = [];
                for (var j = -4; j < n+4; j++){
                    mas[i][j] = 3;
                }
            }
            for (var i = 0; i < m; i++){
                for (var j = 0; j < n; j++){
                    mas[i][j] = 0;
                }
            }
            for (var i = 0; i < m; i++){
                for (var j = 0; j < n; j++){
                    html += '<INPUT TYPE="button" NAME="sqr1" id="'+i+'-'+j+'" class="tictac" i="'+i+'" j="'+j+'" style="width:25px; height:25px" value=" ">'
                }
                    html += '</br>'
            }
            $('[name=game]').html(html);
            
        }
        
   
        
        $('.tictac').on('click', function(){
            soundClick();
            count = count + 1;
            var x_count = 0;
            var o_count = 0;
                x_i = $(this).attr('i');
                x_j = $(this).attr('j');
            for (var i = 0; i < m; i++){
                for (var j = 0; j < n; j++){
                    if($('#'+i+'-'+j).val() === 'X'){
                        x_count = x_count + 1;
                    } else if($('#'+i+'-'+j).val() === 'O'){
                        o_count = o_count + 1;
                    };
                }
            }
            if(x_count <= o_count){
                if(mas[x_i][x_j] === 0){
                    $(this).val('X');
                    mas[x_i][x_j] = 1;
                    win(x_i,x_j,'X');
                };
            }else{
                if(mas[x_i][x_j] === 0){
                    $(this).val('O');
                    mas[x_i][x_j] = 2;
                    win(x_i,x_j,'O');
                };
            };
            document.cookie = "cook_name=" + JSON.stringify(mas) + "; expires=" + (new Date(Date.now() + 7 * 86400000).toGMTString());
     
           

        });
    
    });
              


    function win(i,j,player){
        var win_res;
        var c1 = mas[i][Number(j)-4]+''+mas[i][Number(j)-3]+''+mas[i][Number(j)-2]+''+mas[i][Number(j)-1]+''+mas[i][j]+''+mas[i][Number(j)+1]+''+mas[i][Number(j)+2]+''+mas[i][Number(j)+3]+''+mas[i][Number(j)+4];
        var c2 = mas[Number(i)-4][j]+''+mas[Number(i)-3][j]+''+mas[Number(i)-2][j]+''+mas[Number(i)-1][j]+''+mas[i][j]+''+mas[Number(i)+1][j]+''+mas[Number(i)+2][j]+''+mas[Number(i)+3][j]+''+mas[Number(i)+4][j];
        var c3 = mas[Number(i)-4][Number(j)-4]+''+mas[Number(i)-3][Number(j)-3]+''+mas[Number(i)-2][Number(j)-2]+''+mas[Number(i)-1][Number(j)-1]+''+mas[i][j]+''+mas[Number(i)+1][Number(j)+1]+''+mas[Number(i)+2][Number(j)+2]+''+mas[Number(i)+3][Number(j)+3]+''+mas[Number(i)+4][Number(j)+4];
        var c4 = mas[Number(i)+4][Number(j)-4]+''+mas[Number(i)+3][Number(j)-3]+''+mas[Number(i)+2][Number(j)-2]+''+mas[Number(i)+1][Number(j)-1]+''+mas[i][j]+''+mas[Number(i)-1][Number(j)+1]+''+mas[Number(i)-2][Number(j)+2]+''+mas[Number(i)-3][Number(j)+3]+''+mas[Number(i)-4][Number(j)+4];
        
            //alert(c1+' '+c2+' '+c3+' '+c4);
        if(player == 'X'){
            var c1_res = c1.replace(/1/gi,'W').replace(/0/gi,'0').replace(/2/gi,'0').replace(/undefined/gi,'0'); 
            var c2_res = c2.replace(/1/gi,'W').replace(/0/gi,'0').replace(/2/gi,'0').replace(/undefined/gi,'0');
            var c3_res = c3.replace(/1/gi,'W').replace(/0/gi,'0').replace(/2/gi,'0').replace(/undefined/gi,'0');
            var c4_res = c4.replace(/1/gi,'W').replace(/0/gi,'0').replace(/2/gi,'0').replace(/undefined/gi,'0');
            win_res = winner(c1_res,c2_res,c3_res,c4_res)
            if(win_res){
                alert('Игрок X выиграл');
            };
        } else {                               
            var c1_res = c1.replace(/2/gi,'W').replace(/0/gi,'0').replace(/1/gi,'0').replace(/undefined/gi,'0');
            var c2_res = c2.replace(/2/gi,'W').replace(/0/gi,'0').replace(/1/gi,'0').replace(/undefined/gi,'0');
            var c3_res = c3.replace(/2/gi,'W').replace(/0/gi,'0').replace(/1/gi,'0').replace(/undefined/gi,'0');
            var c4_res = c4.replace(/2/gi,'W').replace(/0/gi,'0').replace(/1/gi,'0').replace(/undefined/gi,'0');
            win_res = winner(c1_res,c2_res,c3_res,c4_res)
            if(win_res){
                alert('Игрок O выиграл');
            };
        }
    }
    
    function nvl(param){
        if(param === 'undefined'){
            return 0;
        }
    };
    
    function winner(w1,w2,w3,w4){
        var win_line = w1+'-'+w2+'-'+w3+'-'+w4;
        var win = /WWWWW/gi;
        var win_res = win_line.match(win);
        return win_res;
    };
    
    $('[name=button1]').on('click', function(){
        var html = '';
        var count = 0;
        $('[name=game]').html(html);
        if($('[name=rowColum]').val()<5){
            alert('Высота и ширина должна быть больше 5')
        } else{ 
            n = $('[name=rowColum]').val(),
            m = $('[name=rowColum]').val();
            for (var i = -4; i < m+4; i++){
                mas[i] = [];
                for (var j = -4; j < n+4; j++){
                    mas[i][j] = 3;
                }
            }
            for (var i = 0; i < m; i++){
                for (var j = 0; j < n; j++){
                    mas[i][j] = 0;
                }
            }
            for (var i = 0; i < m; i++){
                for (var j = 0; j < n; j++){
                    html += '<INPUT TYPE="button" NAME="sqr1" id="'+i+'-'+j+'" class="tictac" i="'+i+'" j="'+j+'" style="width:25px; height:25px" value=" ">'
                }
                    html += '</br>'
            }
            $('[name=game]').html(html);
            
        }
        
        $('.tictac').on('click', function(){
            soundClick();
            count = count + 1;
            var x_count = 0;
            var o_count = 0;
                x_i = $(this).attr('i');
                x_j = $(this).attr('j');
            for (var i = 0; i < m; i++){
                for (var j = 0; j < n; j++){
                    if($('#'+i+'-'+j).val() === 'X'){
                        x_count = x_count + 1;
                    } else if($('#'+i+'-'+j).val() === 'O'){
                        o_count = o_count + 1;
                    };
                }
            }
            if(/*x_count <= o_count*/ 1===1){
                if(mas[x_i][x_j] === 0){
                    $(this).val('X');
                    mas[x_i][x_j] = 1;
                    calc(x_i,x_j,mas);
                    win(x_i,x_j,'X');
                    var rr='',x,y;
                    /*for(var i=0; i<n; i++){
                        x = i;
                        y = 0;
                        while (x >= 0){
                            rr = rr+''+mas[x][y];
                            x = x - 1;
                            y = y + 1;
                        }
                        rr = rr+'-';
                    }
                    
                    for(var i=1; i<n; i++){
                        x = n-1;
                        y = i;
                        while (y < n){
                            rr = rr+''+mas[x][y];
                            x = x - 1;
                            y = y + 1;
                        }
                        rr = rr+'-';
                    }
                    alert(rr);*/
                };
            };
            /*document.cookie = "cook_name=" + JSON.stringify(mas) + "; expires=" + (new Date(Date.now() + 7 * 86400000).toGMTString());
            alert(JSON.parse(document.cookie.get('cook_name')));*/
        });
    });
    
    function calc(i,j,mas){
        var res;
        var type = '';
        var o;
        
        var c1 = mas[i][Number(j)-2]+''+mas[i][Number(j)-1]+''+mas[i][j]+''+mas[i][Number(j)+1]+''+mas[i][Number(j)+2];
        var c2 = mas[Number(i)-2][j]+''+mas[Number(i)-1][j]+''+mas[i][j]+''+mas[Number(i)+1][j]+''+mas[Number(i)+2][j];
        var c3 = mas[Number(i)-2][Number(j)-2]+''+mas[Number(i)-1][Number(j)-1]+''+mas[i][j]+''+mas[Number(i)+1][Number(j)+1]+''+mas[Number(i)+2][Number(j)+2];
        var c4 = mas[Number(i)+2][Number(j)-2]+''+mas[Number(i)+1][Number(j)-1]+''+mas[i][j]+''+mas[Number(i)-1][Number(j)+1]+''+mas[Number(i)-2][Number(j)+2];
        
        var c1_res = ves(c1.replace(/1/gi,'X').replace(/0/gi,'3').replace(/2/gi,'3').replace(/undefined/gi,'3'),'');
        var c2_res = ves(c2.replace(/1/gi,'X').replace(/0/gi,'3').replace(/2/gi,'3').replace(/undefined/gi,'3'),'');
        var c3_res = ves(c3.replace(/1/gi,'X').replace(/0/gi,'3').replace(/2/gi,'3').replace(/undefined/gi,'3'),'');
        var c4_res = ves(c4.replace(/1/gi,'X').replace(/0/gi,'3').replace(/2/gi,'3').replace(/undefined/gi,'3'),'');
        
            type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                //alert(Number(c1_res)+' '+Number(c2_res)+' '+Number(c3_res)+' '+Number(c4_res));
                //alert(type);
                move_o(type);
                
              
                
        function move_o(type){
            //alert(Number(c1_res)+' '+Number(c2_res)+' '+Number(c3_res)+' '+Number(c4_res));
            if(c1_res !=0 || c2_res !=0  || c3_res !=0 || c4_res !=0){
                if(type === 'c1'){
                    if(c1_res > 0){
                        if(c1_res === 2){
                            if(mas[i][Number(j)-2] === 0){
                                mas[i][Number(j)-2] = 2;
                                $('#'+i+'-'+(Number(j)-2)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 3){
                            if(mas[i][Number(j)+2] === 0){
                                mas[i][Number(j)+2] = 2;
                                $('#'+i+'-'+(Number(j)+2)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 4){
                            if(mas[i][Number(j)-1] === 0 ){
                                mas[i][Number(j)-1] = 2;
                                $('#'+i+'-'+(Number(j)-1)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 5){
                            if(mas[i][Number(j)+1] === 0){
                                mas[i][Number(j)+1] = 2;
                                $('#'+i+'-'+(Number(j)+1)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 6){
                            if(mas[i][Number(j)-1] === 0){
                                mas[i][Number(j)-1] = 2;
                                $('#'+i+'-'+(Number(j)-1)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 7){
                            if(mas[i][Number(j)+1] === 0){
                                mas[i][Number(j)+1] = 2;
                                $('#'+i+'-'+(Number(j)+1)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 8){
                            if(mas[i][Number(j)+1] === 0 && mas[i][Number(j)-3] != 2){
                                mas[i][Number(j)+1] = 2;
                                $('#'+i+'-'+(Number(j)+1)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 9){
                            if(mas[i][Number(j)-1] === 0 && mas[i][Number(j)+3] != 2){
                                mas[i][Number(j)-1] = 2;
                                $('#'+i+'-'+(Number(j)-1)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 10){
                            if(mas[i][Number(j)-2] === 0){
                                mas[i][Number(j)-2] = 2;
                                $('#'+i+'-'+(Number(j)-2)).val('O');
                            }else if(mas[i][Number(j)+2] === 0){
                                mas[i][Number(j)+2] = 2;
                                $('#'+i+'-'+(Number(j)+2)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 11){
                            if(mas[i][Number(j)-1] === 0){
                                mas[i][Number(j)-1] = 2;
                                $('#'+i+'-'+(Number(j)-1)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 12){
                            if(mas[i][Number(j)+1] === 0){
                                mas[i][Number(j)+1] = 2;
                                $('#'+i+'-'+(Number(j)+1)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 13){
                            if(mas[i][Number(j)-2] === 0){
                                mas[i][Number(j)-2] = 2;
                                $('#'+i+'-'+(Number(j)-2)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c1_res === 14){
                            if(mas[i][Number(j)+2] === 0){
                                mas[i][Number(j)+2] = 2;
                                $('#'+i+'-'+(Number(j)+2)).val('O');
                            } else{
                                c1_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        } 
                    } else {
                        if(mas[i][Number(j)+1] === 0){
                            mas[i][Number(j)+1] = 2;
                            $('#'+i+'-'+(Number(j)+1)).val('O');
                        } else if(mas[i][Number(j)-1] === 0){
                            mas[i][Number(j)-1] = 2;
                            $('#'+i+'-'+(Number(j)-1)).val('O');
                        } else {
                            c1_res = 0;
                            type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                            move_o(type);
                        }
                    }
                    c1_res = 0;
                } else if(type === 'c2'){
                    if(c2_res > 0){
                        if(c2_res === 2){
                            if(mas[Number(i)-2][j] === 0){
                                mas[Number(i)-2][j] = 2;
                                $('#'+(Number(i)-2)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 3){
                            if(mas[Number(i)+2][j] === 0){
                                mas[Number(i)+2][j] = 2;
                                $('#'+(Number(i)+2)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 4){
                            if(mas[Number(i)-1][j] === 0){
                                mas[Number(i)-1][j] = 2;
                                $('#'+(Number(i)-1)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 5){
                            if(mas[Number(i)+1][j] === 0){
                                mas[Number(i)+1][j] = 2;
                                $('#'+(Number(i)+1)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 6){
                            if(mas[Number(i)-1][j] === 0){
                                mas[Number(i)-1][j] = 2;
                                $('#'+(Number(i)-1)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 7){
                            if(mas[Number(i)+1][j] === 0){
                                mas[Number(i)+1][j] = 2;
                                $('#'+(Number(i)+1)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 8){
                            if(mas[Number(i)+1][j] === 0 && mas[Number(i)-3][j] != 2){
                                mas[Number(i)+1][j] = 2;
                                $('#'+(Number(i)+1)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 9){
                            if(mas[Number(i)-1][j] === 0 && mas[Number(i)-3][j] != 2){
                                mas[Number(i)-1][j] = 2;
                                $('#'+(Number(i)-1)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 10){
                            if(mas[Number(i)-2][j] === 0){
                                mas[Number(i)-2][j] = 2;
                                $('#'+(Number(i)-2)+'-'+j).val('O');
                            }else if(mas[Number(i)+2][j] === 0){
                                mas[Number(i)+2][j] = 2;
                                $('#'+(Number(i)+2)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 11){
                            if(mas[Number(i)-1][j] === 0){
                                mas[Number(i)-1][j] = 2;
                                $('#'+(Number(i)-1)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 12){
                            if(mas[Number(i)+1][j] === 0){
                                mas[Number(i)+1][j] = 2;
                                $('#'+(Number(i)+1)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 13){
                            if(mas[Number(i)-2][j] === 0){
                                mas[Number(i)-2][j] = 2;
                                $('#'+(Number(i)-2)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c2_res === 14){
                            if(mas[Number(i)+2][j] === 0){
                                mas[Number(i)+2][j] = 2;
                                $('#'+(Number(i)+2)+'-'+j).val('O');
                            } else{
                                c2_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }
                    } else {
                        if(mas[Number(i)+1][j] === 0){
                            mas[Number(i)+1][j] = 2;
                            $('#'+i+'-'+(Number(j)+1)).val('O');
                        } else if(mas[Number(i)-1][j] === 0){
                            mas[Number(i)-1][j] = 2;
                            $('#'+i+'-'+(Number(j)-1)).val('O');
                        } else {
                            c1_res = 0;
                            type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                            move_o(type);
                        }
                    }
                    c2_res = 0;
                } else if(type === 'c3'){
                    if(c3_res > 0){
                        if(c3_res === 2){
                            if(mas[Number(i)-2][Number(j)-2] === 0){
                                mas[Number(i)-2][Number(j)-2] = 2;
                                $('#'+(Number(i)-2)+'-'+(Number(j)-2)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 3){
                            if(mas[Number(i)+2][Number(j)+2] === 0){
                                mas[Number(i)+2][Number(j)+2] = 2;
                                $('#'+(Number(i)+2)+'-'+(Number(j)+2)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 4){
                            if(mas[Number(i)-1][Number(j)-1] === 0){
                                mas[Number(i)-1][Number(j)-1] = 2;
                                $('#'+(Number(i)-1)+'-'+(Number(j)-1)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 5){
                            if(mas[Number(i)+1][Number(j)+1] === 0){
                                mas[Number(i)+1][Number(j)+1] = 2;
                                $('#'+(Number(i)+1)+'-'+(Number(j)+1)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 6){
                            if(mas[Number(i)-1][Number(j)-1] === 0){
                                mas[Number(i)-1][Number(j)-1] = 2;
                                $('#'+(Number(i)-1)+'-'+(Number(j)-1)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 7){
                            if(mas[Number(i)+1][Number(j)+1] === 0){
                                mas[Number(i)+1][Number(j)+1] = 2;
                                $('#'+(Number(i)+1)+'-'+(Number(j)+1)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 8){
                            if(mas[Number(i)+1][Number(j)+1] === 0 && mas[Number(i)-3][Number(j)-3] != 2){
                                mas[Number(i)+1][Number(j)+1] = 2;
                                $('#'+(Number(i)+1)+'-'+(Number(j)+1)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 9){
                            if(mas[Number(i)-1][Number(j)-1] === 0 && mas[Number(i)+3][Number(j)+3] != 2){
                                mas[Number(i)-1][Number(j)-1] = 2;
                                $('#'+(Number(i)-1)+'-'+(Number(j)-1)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 10){
                            if(mas[Number(i)-2][Number(j)-2] === 0){
                                mas[Number(i)-2][Number(j)-2] = 2;
                                $('#'+(Number(i)-2)+'-'+(Number(j)-2)).val('O');
                            }else if(mas[Number(i)+2][Number(j)+2] === 0){
                                mas[Number(i)+2][Number(j)+2] = 2;
                                $('#'+(Number(i)+2)+'-'+(Number(j)+2)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 11){
                            if(mas[Number(i)-1][Number(j)-1] === 0){
                                mas[Number(i)-1][Number(j)-1] = 2;
                                $('#'+(Number(i)-1)+'-'+(Number(j)-1)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 12){
                            if(mas[Number(i)+1][Number(j)+1] === 0){
                                mas[Number(i)+1][Number(j)+1] = 2;
                                $('#'+(Number(i)+1)+'-'+(Number(j)+1)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 13){
                            if(mas[Number(i)-2][Number(j)-2] === 0){
                                mas[Number(i)-2][Number(j)-2] = 2;
                                $('#'+(Number(i)-2)+'-'+(Number(j)-2)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c3_res === 14){
                            if(mas[Number(i)+2][Number(j)+2] === 0){
                                mas[Number(i)+2][Number(j)+2] = 2;
                                $('#'+(Number(i)+2)+'-'+(Number(j)+2)).val('O');
                            } else{
                                c3_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }
                    } else {
                        if(mas[Number(i)+1][Number(j)+1] === 0){
                            mas[Number(i)+1][Number(j)+1] = 2;
                            $('#'+(Number(i)+1)+'-'+(Number(j)+1)).val('O');
                        } else if(mas[Number(i)-1][Number(j)-1] === 0){
                            mas[Number(i)-1][Number(j)-1] = 2;
                            $('#'+(Number(i)-1)+'-'+(Number(j)-1)).val('O');
                        } else {
                            c1_res = 0;
                            type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                            move_o(type);
                        }
                    }
                    c3_res = 0;
                } else if(type === 'c4'){
                    //alert(c4_res);
                    if(c4_res > 0){
                        if(c4_res === 2){
                            if(mas[Number(i)+2][Number(j)-2] === 0){
                                mas[Number(i)+2][Number(j)-2] = 2;
                                $('#'+(Number(i)+2)+'-'+(Number(j)-2)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 3){
                            if(mas[Number(i)-2][Number(j)+2] === 0){
                                mas[Number(i)-2][Number(j)+2] = 2;
                                $('#'+(Number(i)-2)+'-'+(Number(j)+2)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 4){
                            if(mas[Number(i)+1][Number(j)-1] === 0){
                                mas[Number(i)+1][Number(j)-1] = 2;
                                $('#'+(Number(i)+1)+'-'+(Number(j)-1)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 5){
                            if(mas[Number(i)-1][Number(j)+1] === 0){
                                mas[Number(i)-1][Number(j)+1] = 2;
                                $('#'+(Number(i)-1)+'-'+(Number(j)+1)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 6){
                            if(mas[Number(i)+1][Number(j)-1] === 0){
                                mas[Number(i)+1][Number(j)-1] = 2;
                                $('#'+(Number(i)+1)+'-'+(Number(j)-1)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 7){
                            if(mas[Number(i)-1][Number(j)+1] === 0){
                                mas[Number(i)-1][Number(j)+1] = 2;
                                $('#'+(Number(i)-1)+'-'+(Number(j)+1)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 8){
                            if(mas[Number(i)-1][Number(j)+1] === 0 && mas[Number(i)+3][Number(j)-3] != 2){
                                mas[Number(i)-1][Number(j)+1] = 2;
                                $('#'+(Number(i)-1)+'-'+(Number(j)+1)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 9){
                            if(mas[Number(i)+1][Number(j)-1] === 0 && mas[Number(i)-3][Number(j)+3] != 2){
                                mas[Number(i)+1][Number(j)-1] = 2;
                                $('#'+(Number(i)+1)+'-'+(Number(j)-1)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 10){
                            if(mas[Number(i)+2][Number(j)-2] === 0){
                                mas[Number(i)+2][Number(j)-2] = 2;
                                $('#'+(Number(i)+2)+'-'+(Number(j)-2)).val('O');
                            }else if(mas[Number(i)-2][Number(j)+2] === 0){
                                mas[Number(i)-2][Number(j)+2] = 2;
                                $('#'+(Number(i)-2)+'-'+(Number(j)+2)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 11){
                            if(mas[Number(i)+1][Number(j)-1] === 0){
                                mas[Number(i)+1][Number(j)-1] = 2;
                                $('#'+(Number(i)+1)+'-'+(Number(j)-1)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 12){
                            if(mas[Number(i)-1][Number(j)+1] === 0){
                                mas[Number(i)-1][Number(j)+1] = 2;
                                $('#'+(Number(i)-1)+'-'+(Number(j)+1)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 13){
                            if(mas[Number(i)+2][Number(j)-2] === 0){
                                mas[Number(i)+2][Number(j)-2] = 2;
                                $('#'+(Number(i)+2)+'-'+(Number(j)-2)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }else if(c4_res === 14){
                            if(mas[Number(i)-2][Number(j)+2] === 0){
                                mas[Number(i)-2][Number(j)+2] = 2;
                                $('#'+(Number(i)-2)+'-'+(Number(j)+2)).val('O');
                            } else{
                                c4_res = 0;
                                type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                                move_o(type);
                            }
                        }
                    } else {
                        if(mas[Number(i)-1][Number(j)+1] === 0){
                            mas[Number(i)-1][Number(j)+1] = 2;
                            $('#'+(Number(i)-1)+'-'+(Number(j)+1)).val('O');
                        } else if(mas[Number(i)-1][Number(j)+1] === 0){
                            mas[Number(i)-1][Number(j)+1] = 2;
                            $('#'+(Number(i)-1)+'-'+(Number(j)+1)).val('O');
                        } else {
                            c1_res = 0;
                            type = max(Number(c1_res), Number(c2_res), Number(c3_res), Number(c4_res));
                            move_o(type);
                        }
                    }
                    c4_res = 0;
                }
            }else{
                alert(111);
            }
        };
        
        function ves(pod){
            if(pod === 'XXXXX'){
                res = 100;
            } else if(pod === 'XXXX3'){
                res = 14;
            } else if(pod === '3XXXX'){
                res = 13;
            } else if(pod === 'XXX3X'){
                res = 12;
            } else if(pod === 'X3XXX'){
                res = 11;
            } else if(pod === '3XXX3'){
                res = 10;
            } else if(pod === '33XXX'){
                res = 9;
            } else if(pod === 'XXX33'){
                res = 8;
            } else if(pod === '3XX3X'){
                res = 7;
            } else if(pod === 'X3XX3'){
                res = 6;
            } else if(pod === '33X3X'){
                res = 5;
            } else if(pod === 'X3X33'){
                res = 4;
            } else if(pod === '33XX3'){
                res = 3;
            } else if(pod === '3XX33'){
                res = 2;
            } else if(pod === '33X33'){
                res = 0;
            };
            
            return res;
        }
        
        function max(c1, c2, c3, c4){
            //alert(1);
            if(c1 >= c2 && c1 >= c3 && c1 >= c4){
                return 'c1';
            } else if(c2 >= c1 && c2 >= c3 && c1 >= c4){
                return 'c2';
            } else if(c3 >= c2 && c3 >= c1 && c3 >= c4){
                return 'c3';
            } else{
                return 'c4';
            }
        }
    }
    
    function div(val, by){
        return (val - val % by) / by;
    }
    

});