import *  as moment from "moment";

export function getVitalidade(){
    return localStorage.getItem("vitalidade");
}
export function getFelicidade(){
    return localStorage.getItem("felicidade");
}
export function getFome(){
    return localStorage.getItem("fome");
}
export function getUltimaAtualizacao(){
    return localStorage.getItem("hora");
}
export function getEstado (){
    return localStorage.getItem("estado")
}

export function setEstado(estado : string){
    localStorage.setItem("estado",estado); 
}

export function setVitalidade(vitalidade : number){
    localStorage.setItem("vitalidade",vitalidade.toString());
}
export function setFome(fome : number){
    localStorage.setItem("fome",fome.toString());
}

export function setFelicidade(felicidade : number){
    localStorage.setItem("felicidade",felicidade.toString());
}

export function setTempo(){
    localStorage.setItem("hora",new Date().getTime().toString());
}

export function saveAll(vitalidade : number, fome : number, felicidade : number){
    setFelicidade(felicidade);
    setFome(fome);
    setVitalidade(vitalidade);
    setTempo();
}