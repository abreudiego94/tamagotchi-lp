import * as $ from "jquery";
import *  as moment from "moment"
import {getVitalidade,getUltimaAtualizacao,getFome,getFelicidade,getEstado,saveAll} from "./classes/Criatura";
import {verificaBanco} from "./classes/Banco";

var btnFeed = document.getElementById("feed");
var btnFlush =  document.getElementById("flush");
var btnPlay = document.getElementById("play");
var btnCure = document.getElementById("cure");
var btnLight = document.getElementById("light");

btnFeed.onclick = function(){
    
}
btnFlush.onclick = function(){

}
btnPlay.onclick= function(){

}
btnCure.onclick = function(){
    
}
btnLight.onclick = function(){

}
verificaBanco();
update()

setInterval(()=>{
    update()
},5000)
function update(){
    var deltaTime =( parseInt(new Date().getTime().toString()) - parseInt(getUltimaAtualizacao()))*(0.0001);
    let estado = getEstado();
    let taxaFome,taxaVitalidade,taxaFelicidade;
    let felicidade = parseInt(getFelicidade()),fome = parseInt(getFome()),vitalidade = parseInt(getVitalidade()); 
    if(estado==='normal'){
        taxaFome = 0.5;
        taxaFelicidade = 0.4;
        taxaVitalidade = 0.3 
    }
    else if(estado==="triste"){
        taxaFome = 0.7;
        taxaFelicidade = 0.9;
        taxaVitalidade = 1 ;
    }
    else{
        taxaFome = 1;
        taxaFelicidade = 1.2;
        taxaVitalidade = 1.3 
    }
    felicidade -= (taxaFelicidade  * deltaTime)
    fome -= (taxaFome  *deltaTime)
    vitalidade -= (taxaVitalidade  *deltaTime)
    
    



    saveAll(parseInt(vitalidade.toFixed(2)),parseInt(fome.toFixed(2)),parseInt(felicidade.toFixed(2)));
    atualizaBarrasEstados(felicidade,fome,vitalidade);
}
function atualizaBarrasEstados(felicidade:number,fome:number,vitalidade:number){
    $('#vitalidade').text(vitalidade);
    $('#felicidade').text(felicidade);
    $('#fome').text(fome);
}

