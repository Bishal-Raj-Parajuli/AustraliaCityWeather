document.querySelectorAll(".city-circle").forEach(e=>{
            
    e.addEventListener("mouseover", function() {
       window.onmousemove = function(j){
          x = j.clientX;
          y = j.clientY;
          document.getElementById('weather-detail').style.top = y-60  + 'px'
          document.getElementById('weather-detail').style.left = x+10 + 'px'
       }

       let cityName = this.getAttribute('id');

       // Show spinner
       document.getElementById("spinner").style.display = "block";
       document.getElementById("weather-detail").style.opacity = 1;

       getWeatherDetail(cityName) // Use .then() to handle the promise
          .then(data => {
             let cityDetail = data.location;
             let weatherDetail = data.current;

             let htm = `
             <div class="flex items-center justify-center">
                <div class="flex w-full max-w-xs flex-col rounded p-4">
                   <div class="text-xl font-bold">${cityDetail.name}, ${cityDetail.region}</div>
                   <div class="text-sm">${cityDetail.localtime}</div>

                   <div class="mt-6 flex flex-row items-center justify-center">
                   <div class="text-6xl font-medium">${weatherDetail.temp_c}°</div>
                   <div class="ml-6 flex flex-col items-center">
                      <div>${weatherDetail.condition.text}</div>
                      
                   </div>
                   </div>
                   <div class="mt-6 flex flex-row justify-between">
                   <div class="flex flex-col items-center">
                      <div class="text-sm font-medium">Wind</div>
                      <div class="text-sm text-gray-500">${weatherDetail.wind_kph}k/h</div>
                   </div>
                   <div class="flex flex-col items-center">
                      <div class="text-sm font-medium">Humidity</div>
                      <div class="text-sm text-gray-500">${weatherDetail.humidity}%</div>
                   </div>
                   <div class="flex flex-col items-center">
                      <div class="text-sm font-medium">Visibility</div>
                      <div class="text-sm text-gray-500">${weatherDetail.vis_km}km</div>
                   </div>
                   </div>
                </div>
             </div>
             `;
            // Clear existing content before inserting new content
        document.getElementById("city-detail").innerHTML = '';
        // Insert new HTML content
        document.getElementById("city-detail").insertAdjacentHTML('beforeend', htm);
          })
          .catch(error => {
             console.error('Error fetching weather data:', error);
          })
          .finally(() => {
          // Hide spinner regardless of success or failure
          document.getElementById("spinner").style.display = "none";
    });
    })

    e.addEventListener("mouseleave", function () {
       document.getElementById("weather-detail").style.opacity = 0;
       document.getElementById("city-detail").innerText = '';
    })
 }) 

 function getWeatherDetail(cityName) {
 const key = "61b9d61ade4e4299a79111031243103";
 const url = `https://api.weatherapi.com/v1/current.json?q=${cityName}&key=${key}`;

 return fetch(url, {
          method: "GET",
          headers: {
             "Content-Type": "application/json",
          }
    })
    .then(response => {
          if (!response.ok) {
             throw new Error('Network response was not ok');
          }
          return response.json();
    });
 }
 