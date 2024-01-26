const API_KEY = `146f978de4b0223570be6a06da22b647`
const form = document.querySelector("form");
const search = document.querySelector("#search")
const weather = document.querySelector(".weather")
const CityName = document.getElementById("cityName")
const currDate = document.getElementById("currDate")

const getWeather = async(city) =>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url)
    const data = await response.json()
    const sun = conv(data.sys.sunrise)
   return showWeather(data)
}
const conv = (timestamp) =>{
    var date = new Date(timestamp)
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}
const showWeather = (data) =>{
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        return;
    }
    CityName.innerText = data.name
    currDate.innerText = new Date().toDateString();
    document.querySelector(".sub").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">${data.weather[0].main}</img>`
    weather.innerHTML = `<h1>${data.main.temp} °C</h1>
    <div class="details">
        <div class="wind">
            <img src="wind.png" alt="" id="wind_img">
            <p>${parseInt(data.wind.speed)*3.6} km/h</p>
            <p>wind</p>
        </div>
        <div class="humidity">
            <img src="humidity.png" alt="" id="hum">
            <p>${data.main.humidity} %</p>
            <p>Humidity</p>
        </div>
        <div class="visiblity">
                    <img src="visible.png" alt="" id="visible">
                    <p>${parseInt(data.visibility)/1000} Kms</p>
                    <p>Visiblity</p>
        </div>
    </div>`
}
form.addEventListener("submit" , (e) =>{
    getWeather(search.value);
    e.preventDefault();
})
