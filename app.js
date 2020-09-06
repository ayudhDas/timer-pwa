;window.__TIMER_SCOPE = window.__TIMER_SCOPE || {};
(function (Global) {
    const startStopButton = document.getElementById('btn-start-stop');
    const countDownText = document.getElementById('timer-countdown');
    const resetButton = document.getElementById('btn-reset');

    const timerState = {
        timeElapsed: 0,
        isRunning: false,
    }

    let timerRef = null;

    function pauseTimer() {
        timerState.isRunning = false;
        startStopButton.innerText = 'Resume';
        resetButton.removeAttribute('disabled');
        clearInterval(timerRef);
    };

    function startTimer() {
        timerState.isRunning = true;
        startStopButton.innerText = 'Pause';
        resetButton.setAttribute('disabled', 'true');
        timerRef = setInterval(function(){
            setCountDownTimerText(timerState.timeElapsed + 1);
        }, 10);
    };

    function toggleTimerState() {
        if(timerState.isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }

    function resetTimer() {
        startStopButton.innerText = 'Start';
        setCountDownTimerText(0);
        resetButton.setAttribute('disabled', 'true');
    };

    startStopButton.addEventListener('click', function(event) {
        event.preventDefault();
        toggleTimerState();
    });

    resetButton.addEventListener('click', function(event) {
        event.preventDefault();
        resetTimer();
    });

    function formatCountdown(centisecondsPassed) {
        const mostSignificantPart = Math.floor(centisecondsPassed/100);
        const leastSignificantPart = centisecondsPassed % 100;
        return `${mostSignificantPart}:${leastSignificantPart < 10 ? '0'+leastSignificantPart : leastSignificantPart}`;
    };

    function setCountDownTimerText(newVal) {
        timerState.timeElapsed = newVal;
        countDownText.innerText = formatCountdown(newVal);
    };

})(window.__TIMER_SCOPE);