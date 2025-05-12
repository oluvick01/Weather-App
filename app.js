document.addEventListener('DOMContentLoaded', () => {
    const getWeatherBtn = document.querySelector('.get-weather-btn');
    const weatherInput =  document.querySelector('.weather-input');
    const weatherContent = document.querySelector('.weather-content');
    const cityName = document.querySelector('.city-name')
    const tempDisplay = document.querySelector('.temp-display');
    const description = document.querySelector('.description')
    const errorMessage = document.querySelector('.error-message')
    const API_KEY = "360335f99e3c524f4aa9a0bb90e0873f";

    getWeatherBtn.addEventListener('click', async () => {
        const city = weatherInput.value.trim();
        if (!city) return;
      try {
        const weatherData = await getWeatherData(city);
        cityName.innerHTML = weatherData.name;
        tempDisplay.innerHTML = `Temperature: ${weatherData.main.temp}`;
        description.innerHTML = `Weather: ${weatherData.weather[0].description}`
        errorMessage.classList.add('hidden')        
    
      } catch (error) {
        errorMessage.classList.remove('hidden')
        weatherContent.classList.add('hidden')
      }
     weatherInput.value = "";
        
    })

    async function getWeatherData(city) {
        try {
            const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);

           const response = url.json();

            if (!response) {
                throw new Error("Failed to fetch the data!");  
            }  
            console.log(response);
            return response;
        } catch (error) {
           errorMessage.classList.remove('hidden')
        }
        
    }
    

   
})
