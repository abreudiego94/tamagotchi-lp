
export function criaBanco(){
    localStorage.setItem("felicidade","100");
    localStorage.setItem("fome","100");
    localStorage.setItem("vitalidade","100");
    localStorage.setItem("hora",new Date().getTime().toString())
    localStorage.setItem("estado","normal")
    

}
export function verificaBanco(){
    if(!localStorage.getItem("felicidade")){
        return criaBanco();
    }
}