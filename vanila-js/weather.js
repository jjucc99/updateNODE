const COORDS = `coords`;
const API_KEY = `00ce6181b5eb040bf309a740835391cc`;
const weather = document.querySelector(`.weather`);

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        const windSpeed = json.wind.speed
        const cloud = json.clouds.all
        weather.innerText = `온도${temperature}, 위치${place}, 바람세기${windSpeed}, 구름${cloud}%`
    })
}

//좌표를 localStoryge에 저장하는 함수
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

//좌표을 성공적으로 가져왔을 때 동작하는 함수
function handleGeoSucess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

//좌표를 가져오지 못했을 경우 동작하는 함수
function handleGeoError(){
    console.log(`Can't access geo location.`);
}

//로컬 스토리지에 날씨가 없을 경우 불러오는 함수
function askForCoods(){
    navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError)
}


//로컬스토리지의 데이터에 따라 함수를 부르는 메인 함수
function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords ===null){
        askForCoods();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init()