const COORDS = `coords`;


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
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords ===null){
        askForCoods();
    }else{

    }
}

function init(){
    loadCoords();
}

init()