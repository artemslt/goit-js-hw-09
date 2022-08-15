// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  timerBox: document.querySelector('.timer'),
  fields: document.querySelectorAll('.field'),
};

refs.timerBox.style.display = 'flex';
refs.timerBox.style.fontSize = '50px';
refs.timerBox.style.color = 'tomato';
refs.timerBox.style.justifyContent = 'space-around';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      refs.startBtn.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
  },
};
const fp = flatpickr('#datetime-picker', options);

const timer = {
  ms: null,
  timerId: null,

  stratTimer() {
    const selectedTime = fp.selectedDates[0].getTime();
    console.log('selectedTime', selectedTime);
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      console.log('timerId ~ currentTime', currentTime);
      this.ms = selectedTime - currentTime;
      console.log('timerId ~ ms', this.ms);
      const { days, hours, minutes, seconds } = convertMs(this.ms);

      refs.days.textContent = addLeadingZero(days);
      refs.hours.textContent = addLeadingZero(hours);
      refs.minutes.textContent = addLeadingZero(minutes);
      refs.seconds.textContent = addLeadingZero(seconds);
      refs.startBtn.disabled = true;
      if (this.ms > 0 && this.ms < 1000) {
        clearInterval(this.timerId);
        return Notiflix.Notify.warning('Timer is over!');
      }
    }, 1000);
  },
};

// function stratTimer() {
//   const selectedTime = fp.selectedDates[0].getTime();
//   console.log('selectedTime', selectedTime);
//   const timerId = setInterval(() => {
//     const currentTime = Date.now();
//     console.log('timerId ~ currentTime', currentTime);
//     const ms = selectedTime - currentTime;
//     console.log('timerId ~ ms', ms);
//     const { days, hours, minutes, seconds } = convertMs(ms);

//     refs.days.textContent = addLeadingZero(days);
//     refs.hours.textContent = addLeadingZero(hours);
//     refs.minutes.textContent = addLeadingZero(minutes);
//     refs.seconds.textContent = addLeadingZero(seconds);
//     refs.startBtn.disabled = true;

//     if (ms < 0) {
//       clearInterval(timerId);
//       ms = 0;
//     }
//   }, 1000);
// }

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', timer.stratTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
