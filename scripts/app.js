const timer = document.querySelector(".timer");
let defaultSeconds = 100;
let totalSeconds = 0;
let running = false;
let paused = false;
let timerId;

function updateTimer(sconds) {
    //算出幾分 用padStart 在前面補上一個0
    let mins = String(Math.floor(sconds / 60)).padStart(2, "0");
    let secs = String(sconds % 60).padStart(2, "0");
    timer.textContent = `${mins}:${secs} `;

    if (sconds === 0) {
        timer.classList.add("times-up");
    } else {
        timer.classList.remove("times-up");
    }
}

function timesUp() {
    clearInterval(timerId);
    running = false;
    updateTimer(0);
    playSound();
}

// 時間到了播放聲音
function playSound() {
    const sound = new Audio("sounds/news.mp3");
    sound.play();
}

function initTimer() {
    running = true;
    totalSeconds = defaultSeconds;
    updateTimer(totalSeconds); //讓每次開始都在一樣秒數
    setUpTimer();
}
function setUpTimer() {
    timerId = setInterval(() => {
        if (totalSeconds > 1) {
            totalSeconds--;
            updateTimer(totalSeconds);
        } else {
            timesUp();
        }
    }, 1000);
}

function pausedTimer() {
    paused = true;
    clearInterval(timerId);
}

function resumeTimer() {
    paused = false;
    setUpTimer();
}

document.addEventListener("keyup", (e) => {
    // 如果沒有再跑 再往下執行
    switch (e.key) {
        case "Enter":
            if (!running) {
                initTimer();
            }
            break;
        case " ":
            // 如果計時器正在執行
            if (running) {
                if (paused) {
                    // 如果是暫時狀態就讓他重新啟動
                    resumeTimer();
                } else {
                    // 不然的話就暫停
                    pausedTimer();
                }
            }
            break;
    }
});
