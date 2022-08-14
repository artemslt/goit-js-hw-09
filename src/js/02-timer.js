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
};

// refs.startBtn.disabled = true;

// refs.startBtn.addEventListener('click', stratTimer);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      refs.startBtn.disabled = true;
      return Notiflix.Notify.warning('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
  },
};
const fp = flatpickr('#datetime-picker', options);

// function stratTimer() {
//   const time = fp.selectedDates[0].getTime();

//   setInterval(() => {
//     const currentTime = Date.now();
//     const ms = time - currentTime;
//     const { days, hours, minutes, seconds } = convertMs(ms);
//     refs.days.textContent = addLeadingZero(days);
//     refs.hours.textContent = addLeadingZero(hours);
//     refs.minutes.textContent = addLeadingZero(minutes);
//     refs.seconds.textContent = addLeadingZero(seconds);
//     refs.startBtn.disabled = true;
//   }, 1000);
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return value.toString().padStart(2, 0);
// }
