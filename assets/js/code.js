// включать на странице, где modal--code
const container = document.querySelector('.modal__repeat');
const timerDisplay = document.querySelector('.modal__repeat span');
const inputs = document.querySelectorAll('.modal__number');
const totalTime = 30;
let timeLeft = totalTime;
let timerInterval;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    timerDisplay.textContent = formatTime(timeLeft);
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        let link = document.createElement('a');
        link.textContent = 'Получить код';
        link.classList.add('modal__link-repeat');
        link.href = '#link';
        container.append(link);
    } else {
        timeLeft--;
    }
}

function startTimerWhenActive() {
    const modalCode = document.querySelector('.modal--code');
    if (modalCode.classList.contains('modal--active')) {
        inputs[0].focus();
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
    } else {
        clearInterval(timerInterval);
        timeLeft = totalTime;
        timerDisplay.textContent = formatTime(timeLeft);
        inputs.forEach(input => input.value = '');
    }
}

const observer = new MutationObserver(startTimerWhenActive);
observer.observe(document.querySelector('.modal--code'), { attributes: true, attributeFilter: ['class'] });

inputs.forEach((input, index) => {
    input.addEventListener('input', function() {
        if (input.value.length === 1) {
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
    });

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Backspace' && input.value.length === 0) {
            if (index > 0) {
                inputs[index - 1].focus();
            }
        }
    });
});