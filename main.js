function getWeather() {
    var cityName = document.querySelector(".inputText").value;
    // var mydate = document.querySelector("#weather").value;
    var i = 5;
    document.querySelector("#timer").textContent = i--;
    const myInterval = setInterval(() => {
        document.querySelector("#timer").textContent = i--;
        if (i < 0) {
            document.querySelector("#timer").textContent = '';
            clearInterval(myInterval);
        }
    }, 1000);
    fetch("https://meta-weather.vercel.app/api/location/search/?query=" + cityName)
        .then(function weather(data) {
            return data.json();
        })
        .then(function weather(data) {
            if (data.length > 0) {
                var woeId = data[0].woeid;

                fetch("https://meta-weather.vercel.app/api/location/" + woeId + "/")
                    .then(function weather(data) {
                        return data.json();
                    })
                    .then(function weather(data) {
                        var cityTitle = data.title;
                        var country = data.parent.title;
                        // var date = getDate(mydate);
                        var date = data.time.split("T")[0];

                        var weatherData = data.consolidated_weather[0];
                        var generalWeather = weatherData.weather_state_name;
                        var temp = weatherData.the_temp;
                        var humidity = weatherData.humidity;
                        var wind = weatherData.wind_speed;



                        var cityElement = document.querySelector(".city-name");
                        cityElement.textContent = cityTitle;

                        var countryElement = document.querySelector(".country");
                        countryElement.textContent = country;

                        var subtitleTextElement = document.querySelector(".subtitle");
                        subtitleTextElement.textContent = date + ", " + generalWeather;

                        var tempElement = document.querySelector(".temperature");
                        tempElement.textContent = temp + "° C";

                        var humidityEl = document.querySelector("#humidity");
                        humidityEl.textContent = "humidity: " + humidity + "%";

                        var windEl = document.querySelector("#wind");
                        windEl.textContent = "wind: " + parseInt(wind) + " km/h";

                        document.querySelector("#timer").textContent = '';
                        clearInterval(myInterval);
                        document.querySelector("#test").textContent = '';
                    })
            } else {
                alert(cityName + " data is not found");

                document.querySelector("#timer").textContent = '';
                clearInterval(myInterval);
            }
        });
        return false;
}

