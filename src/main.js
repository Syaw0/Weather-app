import "./styles/main.css"

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


// let date =  new Date()

// document.getElementById("header-date").innerHTML = `




class RequestData{
    constructor(city) {
        this.city  = city
    };
    sendRequest(){
        showupOnePage()

        loading = new LoadingPage(this.city)
        loading.showLoading()
        setTimeout(()=>{

                fetch(`http://api.weatherapi.com/v1/forecast.json?key=082140be64aa4d8f983211532220404&q=${this.city}&aqi=yes&days=10`)
                .then(response => {
                    if(response.status == 200){
                        loading.hide()
                        // information.showInformation()
                    }else{
                        console.log("error happen")
                        console.log(response)
                        error = new ErrorPage("notfound")
                        error.showError()
                    }
                    return response.json()
                })
                .then(data => {
                    information = new InformationPage(data)
                    information.headerSectionInformation()
                })
                .catch(err => {
                    if (err == "TypeError: NetworkError when attempting to fetch resource."){
                        error = new ErrorPage("internet")
                        error.showError()
                    }
                })

        },2000)
    }
}


class HomePage{
    constructor(){
        this.display = "show"
        this.homeCon = document.getElementById("home")
        this.homeContentHeader1 = document.getElementById("home-content-header1")
        this.homeContentHeader3 = document.getElementById("home-content-header3")
        this.homeIllustration = document.getElementById("home-illustration")
        this.isFrist = true

    }
    showHome(){
        this.isFrist ? null : showupOnePage()
        this.isFrist = false
        this.display = "show"

        this.homeCon.style.display = "flex"
        this.homeIllustration.style.animation = "scale-down-center 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
        this.homeContentHeader1.style.animation = "scale-down-center 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) 1s both"
        this.homeContentHeader3.style.animation = "scale-down-center 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.4s both"
    }
    hide(){
        this.display = "none"

        this.homeCon.style.animation = "fade 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both"
        setTimeout(()=>{this.homeCon.style.display = "none"} , 600)
    }
}



class LoadingPage{
    constructor(city){
        this.display = "none"

        this.cityName = city
        this.loadingCon = document.getElementById("loading-con")
        this.loadingConHeader = document.getElementById("loading-con-header")
        this.loader = document.getElementById("loading")

        this.loadingConHeader.innerHTML = `measuring the weather in <span>${this.cityName}</span> `
        // this.showLoading()
    }

    showLoading(){
        showupOnePage()
        
        this.loadingCon.style.display = "flex"
        this.loadingConHeader.style.animation = "scale-down-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 1s both"
        this.loader.style.animation = "scale-down-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.5s both"
        this.display = "show"
    }
    hide(){
        this.display = "none"

        setTimeout(()=>{this.loadingCon.style.display = "none"},1000)
        this.loadingConHeader.style.animation = "fade 0.9s cubic-bezier(0.250, 0.460, 0.450, 0.940)  both"
        this.loader.style.animation = "fade  0.9s cubic-bezier(0.250, 0.460, 0.450, 0.940)  both"
    }
}

class ErrorPage{
    constructor(error) {
        this.display = "none"

        this.erorr = error 
        this.errorCon = document.getElementById("error-con")
        this.errorShow = null
        if(error == "internet"){
            this.errorShow = document.getElementById("error-internet")
            console.log(this.errorShow)
        }else{
            this.errorShow = document.getElementById("error-notfound")
        }
        
    }

    showError(){
        showupOnePage()
        
        
        this.errorCon.style.animation = "scale-down-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 1s both"
        this.errorCon.style.display = "flex"
        this.errorShow.style.display = "flex"
        this.display = "show"
    }
    hide(){
        this.display = "none"

        this.errorCon.style.animation = "fade 1s cubic-bezier(0.250, 0.460, 0.450, 0.940)  both"
        setTimeout(()=>{this.errorCon.style.display = "none"},1000)
        setTimeout(()=>{this.errorShow.style.display = "none"},1000)

    }
}

class InformationPage{
    constructor(infos){
        this.display = "none"
        this.informations = infos
        this.informationCon = document.getElementById("information")
    }

    createInformation(){

    }

    headerSectionInformation(){
        document.getElementById("header-location-city").innerHTML = `${this.informations["location"]["name"]}`
        document.getElementById("header-location-main-city").innerHTML = `${this.informations["location"]["country"]}`
        document.getElementById("header-totalTemp").getElementsByTagName("h2")[0].innerHTML = `${this.informations["current"]["temp_c"]}&#176;`
        document.getElementById("header-date").innerHTML = `<h4>${monthNames[new Date().getMonth()]} ${new Date().getDate()} ${new Date().getFullYear()}</h4>`
        document.getElementById("minTemp").getElementsByTagName("h4")[0].innerHTML = `${this.informations["forecast"]["forecastday"][0]["day"]["mintemp_c"]}&#176;`
        document.getElementById("maxTemp").getElementsByTagName("h4")[0].innerHTML = `${this.informations["forecast"]["forecastday"][0]["day"]["maxtemp_c"]}&#176;`
        document.getElementById("header-status").getElementsByTagName("h4")[0].innerHTML = `${this.informations["current"]["condition"]["text"]}`
        this.handleIcons()
        this.showInformation()
    }


    showInformation(){
        showupOnePage()
        this.display = "show"

        setTimeout(()=>{
            this.informationCon.style.display ="flex"
        } , 1000)
        this.informationCon.style.animation ="scale-down-center 1s cubic-bezier(0.250, 0.460, 0.450, 0.940)  both"

    }

    hide(){
        this.display = "none"
        this.informationCon.style.animation ="fade 0.9s cubic-bezier(0.250, 0.460, 0.450, 0.940)  both"
        setTimeout(()=>{this.informationCon.style.display ="none"},1000)
    }


    handleIcons(){
        let iconNum = this.informations['current']['condition']['icon'].split("/").slice(-1)[0].split(".")[0]
        let DayorNight = null
        this.informations['current']['condition']['icon'].search("night") == -1 ? DayorNight = "d": DayorNight = "n"
        console.log(`./assests/icons/${DayorNight}${iconNum}.svg`)
        import(`./assests/icons/${DayorNight}${iconNum}.svg`)
        .then(svg => {
            let icon = new Image()
            icon.src = svg.default
            icon.className="information-header-icon"
            document.getElementById("header-icon").innerHTML = ""
            document.getElementById("header-icon").appendChild(icon)
        })
        .catch(err => console.log(err))
    }

}




let loading = new LoadingPage()
let error = new ErrorPage()
let home = new HomePage()
let information = new InformationPage()
home.showHome()


function showupOnePage(){
    let list = [loading , error , home , information]
    for(let i = 0 ; i != list.length ; i++){
        if(list[i].display == "show"){
            list[i].hide()
        }
    }
}




let input = document.getElementById("header-input")
input.addEventListener("keydown" , key_handle)

function key_handle(e){
    if ( e.key == "Enter"){
        let request = new RequestData( e.target.value )
        request.sendRequest()
        input.value = ""
        input.blur()
    }
}


let isFristTimetoResize = 0


window.addEventListener("resize" , ()=>{
    
    if(window.innerWidth<500){
        isFristTimetoResize = 1
        dailyInfo.style.display = "flex"
        detailInfo.style.display = "flex"
        // detailInfo.style.display = "flex-box"
        hourlyInfo.style.display = "flex"
    }
    if(window.innerWidth > 500 && isFristTimetoResize == 1){
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

let detailMInfo = document.getElementById("information-detail-mcon")
let hourlyMInfo = document.getElementById("information-hourly-mcon")
let dailyMInfo = document.getElementById("information-daily-mcon")

//horizontal scroll 

hourlyInfo.addEventListener("wheel", (e)=>{
    hourlyInfo.scrollLeft += e.deltaY
})

dailyInfo.addEventListener("wheel", (e)=>{
    dailyInfo.scrollLeft += e.deltaY
})

detailInfo.addEventListener("wheel", (e)=>{
    detailInfo.scrollLeft += e.deltaY
})

//animation for items 

for(let i = 0 ; i != dailyMInfo.getElementsByTagName("div").length ; i++){
    dailyMInfo.getElementsByTagName("div")[i].style.animation = `slide-in-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${i*0.07}s  both`
}

for(let i = 0 ; i != detailInfo.getElementsByTagName("div").length ; i++){
    detailInfo.getElementsByTagName("div")[i].style.animation = `slide-in-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${i*0.07}s  both`
}

for(let i = 0 ; i != hourlyMInfo.getElementsByTagName("div").length ; i++){
    hourlyMInfo.getElementsByTagName("div")[i].getElementsByTagName("h4")[0].innerHTML = `${i+1}AM`
    hourlyMInfo.getElementsByTagName("div")[i].style.animation = `slide-in-top 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${i*0.07}s  both`
}







//detail button handle 
let detailCon = document.getElementById("information-detail-con")
let deatilButton = document.getElementById("information-detail-toggle")
let deatilExitButton = document.getElementById("information-detail-exit")


deatilButton.addEventListener("click" , ()=>{
    console.log(detailCon.clientHeight)
    if(detailCon.clientHeight < 50 ){
        detailCon.style.animation = "increse-heigth 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940)  both "
        document.getElementById("information-detail-upSvg").style.display = "none"
        document.getElementById("information-detail-downSvg").style.display = "flex"
    }else{
        detailCon.style.animation = "decrese-heigth 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940)  both "
        setTimeout(()=>{detailCon.style.animation = "none"} , 1000)
        document.getElementById("information-detail-upSvg").style.display = "flex"
        document.getElementById("information-detail-downSvg").style.display = "none"
    }
})