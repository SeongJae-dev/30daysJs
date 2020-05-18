// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build function
//toggle 버튼 클릭시 play and pause
function togglePlay (){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

//버튼 상태 변경
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon
}


//skip 버튼 dataset 값으로 스킵
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

//
function handleRangeUpdate(){
    video[this.name] = this.value;
}

//progressbar로 영상 이동
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

//스크럼 mouse 이벤트로 영상 재생
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

//event add
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);

toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button => button.addEventListener(
    'click',skip
))

ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('click',handleRangeUpdate));

let mousedown = false;

progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',() => mousedown && scrub(e));
progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mouseup', ()=> mousedown = true);