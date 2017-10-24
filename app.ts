import * as $ from "jquery";
import *  as moment from "moment"
import {getVitalidade,getUltimaAtualizacao,getFome,getFelicidade,getEstado,saveAll,setFome,setVitalidade} from "./classes/Criatura";
import {verificaBanco,criaBanco} from "./classes/Banco";

var btnFeed = document.getElementById("feed");
var btnFlush =  document.getElementById("flush");
var btnPlay = document.getElementById("play");
var btnCure = document.getElementById("cure");
var btnLight = document.getElementById("light");

var btnMaior = document.getElementById("maior");
var btnMenor = document.getElementById("menor");
var btnReiniciar = document.getElementById('reiniciar')

var atualValor = Math.round(getRandomArbitrary(0,9));
var proximoValor = Math.round(getRandomArbitrary(0,9));
var pontos = 0
var jogadas = 0


function getRandomArbitrary(min:any, max:any) {
    return Math.random() * (max - min) + min;
}
btnFeed.onclick = function(){
    var fome = parseInt(getFome())+1;
    setFome(fome);
    atualizaBarrasEstadosPeloBanco();
}
btnFlush.onclick = function(){

}
btnPlay.onclick= function(){
    jogadas = 0
    pontos = 0;
    setTextJogo();
    exibirJogo(true);
    
}

btnCure.onclick = function(){
    var cure = parseInt(getVitalidade())+1;
    setVitalidade(cure);
    atualizaBarrasEstadosPeloBanco();
}
btnMenor.onclick = function(){
    jogar('menor')
}
btnMaior.onclick = function(){
    jogar('maior');
}
btnReiniciar.onclick = function(){
    criaBanco();
    reiniciar();
    update();
}

verificaBanco();
atualizaBarrasEstadosPeloBanco();
update();
setTextJogo();

setInterval(()=>{
    update()
},5000)
function update(){
    var deltaTime =( parseInt(new Date().getTime().toString()) - parseInt(getUltimaAtualizacao()))*(0.0001);
    let estado = getEstado();
    let taxaFome,taxaVitalidade,taxaFelicidade;
    let felicidade = parseInt(getFelicidade());
    let fome = parseInt(getFome());
    let vitalidade = parseInt(getVitalidade()); 
    if((fome<=0) || (felicidade <=0) || (vitalidade<=0)){
        exibeGameOver();
    }
    else{
        if(estado==='normal'){
            taxaFome = 0.1;
            taxaFelicidade = 0.2;
            taxaVitalidade = 0.3 
        }
        else if(estado==="triste"){
            taxaFome = 0.3;
            taxaFelicidade = 0.1;
            taxaVitalidade = 1 ;
        }
        else{
            taxaFome = 1;
            taxaFelicidade = 1.2;
            taxaVitalidade = 1.3 
        }
        felicidade -= (taxaFelicidade  * deltaTime)
        fome -= (taxaFome *deltaTime)
        vitalidade -= (taxaVitalidade  *deltaTime)
        
        saveAll(parseInt(vitalidade.toFixed(2)),parseInt(fome.toFixed(2)),parseInt(felicidade.toFixed(2)));
        //atualizaBarrasEstados(felicidade,fome,vitalidade);
        atualizaBarrasEstadosPeloBanco();
    }

}

function atualizaBarrasEstadosPeloBanco(){
    let felicidade = parseInt(getFelicidade());
    let fome  = parseInt(getFome());
    let vitalidade = parseInt(getVitalidade());
    atualizaBarrasEstados(felicidade,fome,vitalidade);
    atualizaPet(felicidade,fome,vitalidade);
}
function atualizaBarrasEstados(felicidade:number,fome:number,vitalidade:number){
    $('#vitalidade').text(vitalidade);
    $('#felicidade').text(felicidade);
    $('#fome').text(fome);
}
function atualizaPet(felicidade:number,fome:number,vitalidade:number){
    if(fome < 30){
        $("#figurepet").css("background-color","red")
    }
    else if (vitalidade < 50){
        
        $("#figurepet").css("background-color","limegreen")
    }
    else{
        $("#figurepet").css("background-color","#4ae9b8")

    }
}
function jogar(acao:any){
    jogadas  ++ ;
    
    if(proximoValor > atualValor && acao === 'maior'){
        pontos ++ ;
       
    }
    if(proximoValor <  atualValor && acao === 'menor'){
        pontos ++ ;
    }
    atualValor = proximoValor
    proximoValor = Math.round(getRandomArbitrary(0,9));
    setTextJogo();
    
    if(jogadas === 5){
        
        if(pontos > jogadas-pontos){
            alert("Voce ganhou")
        }
        else{
            alert("Voce Perdeu")
        }
        exibirJogo(false);
        
        
        
        
    }

    
} 
function setTextJogo(){
    $('#jogovalor').text(atualValor);
    $('#acertos').text(pontos);
    $('#erros').text(jogadas - pontos);

} 
function exibeGameOver(){
    $('#creatures').hide();
    $('#acoes').hide();
    $('#gameover').show();
} 
function reiniciar(){
    $('#creatures').show();
    $('#acoes').show();
    $('#gameover').hide();
}
function exibirJogo(exibi:boolean){
    if(exibi){
        return $("#jogo").fadeIn();
    }
    else{
        return $("#jogo").fadeOut(4000);
    }

    
}
