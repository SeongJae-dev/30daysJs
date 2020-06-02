let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //clear any timer
    //setInterver reset
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimerLeft(seconds);
    displayEndTime(then);

    //countdown ms
    countdown = setInterval(() => {
        const secondsLeft =  Math.round((then - Date.now()) / 1000);
        if(secondsLeft <= 0 ){
            clearInterval(countdown)
            return;
        }
        displayTimerLeft(secondsLeft);
    }, 1000);
}

//화면에 타이머표시
function displayTimerLeft(seconds) {
    // floor정수반환
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

//타이머 종료후 시간 출력
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${adjustedHour}`

}

//input으로 타이머 조정
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}
//button에 이벤트 추가
buttons.forEach(button => button.addEventListener('click', startTimer))
//form으로부터 value를 가져옴
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})