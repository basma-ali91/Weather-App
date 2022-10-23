let nameOfday = document.getElementById("nameOfDay");
let dateOfday = document.getElementById("dateOfDay");
let coutry = document.getElementById("contoury");
let temp_day = document.getElementById("today-temp");
let todayIcon = document.getElementById("today-icon");
let todayDesc = document.getElementById("today-desc");
let humidty = document.getElementById("humidty");
let wind = document.getElementById("wind");
let compass = document.getElementById("compass");
let date = new Date();
let nameofNextDay = document.getElementsByClassName("nameOfNextDay");
let dateofNextDay = document.getElementsByClassName("dateOfNextDay");
let nextDayIcon = document.getElementsByClassName("img-icon");
let maxDegree = document.getElementsByClassName("max-degree");
let minDegree = document.getElementsByClassName("min-degree");
let nextDesc = document.getElementsByClassName("nextday-Desc")
let nameofMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Augs", "Sep", "Oct", "Nov", "Dec"];
let weekDays = ["Sunday", "Monday", "tuseday", "WensDday", "Thursday", "Friday", "Saturday",]
let responseDate = [];
let search = document.getElementById("searchBar");

// *********************get data from api****************

async function getweather(current_city) {
    let apiUrl = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7c9e27a92e624fe186290715222010&q=${current_city}&days=3&aqi=no&alerts=no`);
    responseDate = await apiUrl.json();
    console.log(responseDate);
    displayTodayWeather();
    displayNextDayWeather();
}

getweather("cairo");

// ******************display weather status*************

function displayTodayWeather() {
    let apidate = responseDate.forecast.forecastday[0].date; //21-10-222
    let dateComponant = apidate.split("-");
    let current_day = dateComponant[2]; //اليوم مثلا 21
    console.log(apidate);
    dateOfday.innerHTML = `${current_day} - ${nameofMonth[date.getMonth()]}`;//
    nameOfday.innerHTML = `${weekDays[date.getDay()]}`;
    coutry.innerHTML = responseDate.location.name;
    temp_day.innerHTML = Math.round(responseDate.current.temp_c);
    todayIcon.setAttribute("src", `https:${responseDate.current.condition.icon}`);
    todayDesc.innerHTML = responseDate.current.condition.text;
    humidty.innerHTML = responseDate.current.humidity;
    wind.innerHTML = responseDate.current.wind_kph;
    compass.innerHTML = responseDate.current.wind_dir;
}

// ****************get nameOfNextday**************

function getNextday(apinextdate) {
    let d = new Date(apinextdate);
    return weekDays[d.getDay()]
}

// *******************get nameOfMonth************

function getTheMonth(apinextdate){
 let m =new Date(apinextdate)
 return  nameofMonth[m.getMonth()]
}

// ******************display nextdayWeather*****************

function displayNextDayWeather() {
    for (let i = 0; i < nameofNextDay.length; i++) {
        let apinextdate = responseDate.forecast.forecastday[i + 1].date; //22-10-2022 && 23-10-2022
        let dateComponant = apinextdate.split("-");
        let next_day = dateComponant[2];
        console.log(next_day);
        nameofNextDay[i].innerHTML = getNextday(apinextdate);
        dateofNextDay[i].innerHTML = `${next_day}- ${getTheMonth(apinextdate)}`;
        maxDegree[i].innerHTML = Math.round(responseDate.forecast.forecastday[i + 1].day.maxtemp_c);
        minDegree[i].innerHTML = Math.round(responseDate.forecast.forecastday[i + 1].day.mintemp_c);
        nextDayIcon[i].setAttribute("src", `https:${responseDate.forecast.forecastday[i + 1].day.condition.icon}`);
        nextDesc[i].innerHTML = responseDate.forecast.forecastday[i + 1].day.condition.text;
    }
}

// *****************search by country********************


search.addEventListener("keyup", function () {
    current_city = search.value;
    getweather(current_city)
})

$(document).ready(function(){
    $("#loading .loader").hide(1000,()=>{
        $("#loading").fadeOut(1000,()=>{
            $("body").css("overflow-y","auto")
        })
    })
})


// *****************arrow *************

let AboutOffset = $("#about").offset().top;
$(window).scroll(function(){
    let wScroll =$(window).scrollTop();

     if(wScroll > AboutOffset -100){
        $(".none").fadeIn(1000);
     }
     else{
        $(".none").fadeOut(1000);
     }
})
