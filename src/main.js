import "./styles/main.css"
import svg2 from "./assests/rareError.svg"
import svg1 from "./assests/searchError.svg"

let input = document.getElementById("header-input")
input.addEventListener("keydown" , key_handle)
let home = document.getElementById("home")
let loadingHead = document.getElementById("loading-con-header")
let loader = document.getElementById("loading")
let loadingCon = document.getElementById("loading-con")
let errorCon = document.getElementById("error-con")

let errorsvg1 = new Image()
errorsvg1.src = svg1 
errorsvg1.id = "error-illustration"

let img = new Image()
img.src = svg2;
img.id = "error-illustration"

console.log(img)

function key_handle(e){
    // e.key == "Enter" ? input.value = "" : null 
    if ( e.key == "Enter"){
        errorCon.style.display = "none"
        input.value = ""
        input.blur()
        loadingCon.style.display = "flex"
        home.style.animation = "fade 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
        setTimeout(()=>{home.style.display = "none"} , 600)
        loadingHead.style.animation = "scale-down-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 1s both"
        loader.style.animation = "scale-down-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s both"
        
    }
    if(e.key == "e"){
        exitAnimation()
    }
}

function exitAnimation(){
    setTimeout(()=>{loadingCon.style.display = "none"} , 600)
    loadingHead.style.animation = "fade 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
    loader.style.animation = "fade 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
    setTimeout(()=>{errorCon.style.display = "flex"} , 1200)
    errorCon.style.animation = "scale-down-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
}

errorCon.addEventListener("click" , ()=>{
    setTimeout(()=>{errorCon.style.display = "none"} , 600)
    errorCon.style.animation = "fade 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
    // errorCon.removeChild(errorCon.getElementsByTagName("svg")[0])
    // errorCon.appendChild(img)

})
loadingCon.addEventListener("click" , ()=>{exitAnimation()} )

