const Time = document.querySelector('h2')
const NINE_HOURS_MILLISECONDS = 32400000;


function CalculateTime(PassedTime){
    const passedSeconds = Math.floor((PassedTime % (1000 * 60)) / 1000);
    const passedMinutes = Math.floor((PassedTime % (1000 * 60 * 60)) / (1000 * 60));
    const passedHours = Math.floor((PassedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const passedDays = Math.floor(PassedTime / (1000 * 60 * 60 * 24)); 
    const passedTime = `${passedDays}d ${passedHours}h ${passedMinutes}m ${passedSeconds}s`;
    
    return passedTime;
}

function getTime() {
  // Don't delete this.
    const xmasDay = new Date("2020-12-24:00:00:00+0900");
    const nowDay = new Date();
    const PassedTime = xmasDay - nowDay;
    const timer = CalculateTime(PassedTime)
    Time.innerText = timer;

}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();