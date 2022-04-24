import "./styles/main.css"



let isFristTimetoResize = 0


window.addEventListener("resize" , ()=>{
    
    if(window.innerWidth<500){
        isFristTimetoResize = 1
        dailyInfo.style.display = "flex"
        detailInfo.style.display = "none"
        hourlyInfo.style.display = "flex"
    }
    if(window.innerWidth > 500 && isFristTimetoResize == 1){
        console.log("ss")
        dailyInfo.style.display = "none"
        detailInfo.style.display = "none"
        hourlyInfo.style.display = "flex"
        navHourly.style ="border-bottom:1px solid var(--co4) ; color:var(--co4)"
        navDaily.style ="border-bottom:none; color:var(--co2)"
        navDetail.style ="border-bottom:none ; color:var(--co2)"
        isFristTimetoResize = 0
    }
} )


let navHourly = document.getElementById("topnav-button-hourly")
let navDaily = document.getElementById("topnav-button-daily")
let navDetail = document.getElementById("topnav-button-detail")



navHourly.addEventListener("click" , navbuttonHandle)
navDaily.addEventListener("click" , navbuttonHandle)
navDetail.addEventListener("click" , navbuttonHandle)

function navbuttonHandle(e){
    let element = e.target.innerHTML.trim()
    // console.log(element.trim())
    switch(element){                            // i think i can do better for this block of code (write a function automatlicly do this)
        case "Hourly":
            dailyInfo.style.display = "none"
            detailInfo.style.display = "none"
            hourlyInfo.style.display = "flex"
            navHourly.style ="border-bottom:1px solid var(--co4) ; color:var(--co4) ;transition:0.5s all"
            navDaily.style ="border-bottom:none; color:var(--co2) ;transition:0.5s all"
            navDetail.style ="border-bottom:none ; color:var(--co2); transition:0.5s all"
            break;

        case "Daily":
            detailInfo.style.display = "none"
            hourlyInfo.style.display = "none"
            dailyInfo.style.display = "flex"
            navDaily.style ="border-bottom:1px solid var(--co4) ; color:var(--co4) ; transition:0.5s all"
            navHourly.style ="border-bottom:none; color:var(--co2);transition:0.5s all"
            navDetail.style ="border-bottom:none ; color:var(--co2);transition:0.5s all"
            break;
        
        case "Detail":
            dailyInfo.style.display = "none"
            hourlyInfo.style.display = "none"
            detailInfo.style.display = "flex"
            navDetail.style ="border-bottom:1px solid var(--co4) ; color:var(--co4);transition:0.5s all"
            navDaily.style ="border-bottom:none ; color:var(--co2);transition:0.5s all"
            navHourly.style ="border-bottom:none; color:var(--co2);transition:0.5s all"
            break;
                
    }
}


let hourlyInfo = document.getElementById("information-hourly-con")
let dailyInfo = document.getElementById("information-daily-con")
let detailInfo = document.getElementById("information-detail-con")









const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let infos = document.getElementById("information")

//horizontal scroll 

let hourlyMInfo = document.getElementById("information-hourly-mcon")
let dailyMInfo = document.getElementById("information-daily-mcon")

hourlyInfo.addEventListener("wheel", (e)=>{
    hourlyInfo.scrollLeft += e.deltaY
})

dailyInfo.addEventListener("wheel", (e)=>{
    dailyInfo.scrollLeft += e.deltaY
})


for(let i = 0 ; i != dailyMInfo.getElementsByTagName("div").length ; i++){
    dailyMInfo.getElementsByTagName("div")[i].style.animation = `slide-in-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${i*0.07}s  both`
}

for(let i = 0 ; i != hourlyMInfo.getElementsByTagName("div").length ; i++){
    hourlyMInfo.getElementsByTagName("div")[i].getElementsByTagName("h4")[0].innerHTML = `${i+1}AM`
    hourlyMInfo.getElementsByTagName("div")[i].style.animation = `slide-in-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${i*0.07}s  both`
}





let date =  new Date()
console.log(date)

document.getElementById("header-date").innerHTML = `<h4>${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}</h4>`




let input = document.getElementById("header-input")
input.addEventListener("keydown" , key_handle)
let home = document.getElementById("home")
let loadingHead = document.getElementById("loading-con-header")
let loader = document.getElementById("loading")
let loadingCon = document.getElementById("loading-con")
let errorCon = document.getElementById("error-con")




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
}

function exitAnimation(){
    setTimeout(()=>{loadingCon.style.display = "none"} , 600)
    loadingHead.style.animation = "fade 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
    loader.style.animation = "fade 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
    setTimeout(()=>{infos.style.display = "flex"} , 600)
    infos.style.animation = "scale-down-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
}

errorCon.addEventListener("click" , ()=>{
    setTimeout(()=>{infos.style.display = "none"} , 600)
    infos.style.animation = "scale-down-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"


})
loadingCon.addEventListener("click" , ()=>{exitAnimation()} )

