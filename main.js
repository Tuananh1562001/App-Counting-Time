// Query Selectors
const eventContainer = document.querySelector('.event-container');
const formContainer = document.querySelector('.form-container');

// Event Selectors

const dayTitle = document.querySelector('#day__title');
const dayName = document.querySelector('#day__name');
const hourTitle = document.querySelector('#hour__title');
const hourName = document.querySelector('#hour__title');
const minuteTitle = document.querySelector('#minute__title');
const minuteName = document.querySelector('#minute__title');
const secondTitle = document.querySelector('#second__title');
const secondName = document.querySelector('#second__title');

// Time Selectors

const second =1000;
const minute = second * 60;
const hour   = minute * 60;
const day    = hour *24;

// countdown timer
let countdownTimer;

// FUNCTION: add hidden class
function addHiddenClass(element){
    element.classList.add('hidden');
}

// FUNCTION: remove hidden class
function removeHiddenClass(element){
    element.classList.remove('hidden');
}

// FUNCTION: check storage
function checkLocalStorage(){
    if(localStorage.getItem('eventTracker.event') === "", 
    localStorage.getItem('eventTracker.event') === "[]"){
        showForm();
    }else{
        const event = JSON.parse(localStorage.getItem('eventTracker.event'))
        showEvent(event.title, event.date);
    }
}

// FUNCITON:saveEventToLocalStorage
function saveEventToLocalStorage(title, date){
    const event = {
        title,
        date,
    };
    localStorage.setItem('eventTracker.event', JSON.stringify(event));
}

// FUCTION:deleteEventFromLocalStorage
function deleteEventFromLocalStorage(){
    localStorage.setItem('eventTracker.event', '[]')
}

// FUNCTION: startCountdownTimer
function  startCountdownTimer(title, date){
     const evenTitle =document.querySelector('.event__title');
     evenTitle.textContent = title;
     updateCountdown(date);
     countdownTimer = setInterval(() => {
         updateCountdown(date);
     }, 1000);
}

// FUNCTION: updateCountdown
function updateCountdown(date){
    const currentTime = new Date().getTime();
    const countdownTime = date - currentTime;

    // Time Math
    const newDay = Math.floor(countdownTime / day);
    const newHour = Math.floor((countdownTime % day) / hour);
    const newMinute = Math.floor((countdownTime % hour) / minute);
    const newSecond = Math.floor((countdownTime % minute) / second);

    // Update Event
    dayTitle.textContent = newDay;
    hourTitle.textContent = newHour;
    minuteTitle.textContent = newMinute;
    secondTitle.textContent = newSecond;

    if(newDay === 0 && newHour === 0 && newMinute === 0 & newSecond === 0){
        // do this for 30 seconds
        var duration = 3 * 1000;
        var end = Date.now() + duration;

        (function frame() {
        // launch a few confetti from the left edge
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        // and launch a few from the right edge
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        // keep going until we are out of time
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
        }());
            clearInterval(countdownTimer);
            setTimeout(() =>{
                showForm()
            }, 1000)
    }

}

// FUNCTION: show form
function showForm(){
    removeHiddenClass(formContainer);
    addHiddenClass(eventContainer);
    deleteEventFromLocalStorage();
    const title = document.querySelector('#title');
    title.focus;
}

// FUNCTION: show event
function showEvent(title, event){
    saveEventToLocalStorage(title, event);
    startCountdownTimer(title,event)
    removeHiddenClass(eventContainer);
    addHiddenClass(formContainer);
}

// EVENT: submit form
const form = document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title =document.querySelector('#title');
    const eventInput = document.querySelector('#event');
    const event = new Date(eventInput.value).getTime();

    // Validator
    if(title.value === '' || eventInput.value === ''){
        return alert('Please enter a title and a date');
    }
    showEvent(title.value, event);
    
    title.value = '';
    eventInput.value = '';
});

// EVENT: delete btn
const evenBtn = document.querySelector('.event__btn').addEventListener('click',showForm)

// EVENT: window load
window.addEventListener('DOMContentLoaded', checkLocalStorage);