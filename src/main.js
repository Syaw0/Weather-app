import "./styles/main.css"
let input = document.getElementById("header-input")
input.addEventListener("keydown" , key_handle)
function key_handle(e){
    e.key == "Enter" ? input.value = "" : null 
}


