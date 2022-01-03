import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  timerEl: document.querySelector('.timer'),
  startEl: document.querySelector('[data-start]'),
  dayEl: document.querySelector('[data-days]'),
  hourEl: document.querySelector('[data-hours]'),
  minuteEl: document.querySelector('[data-minutes]'),
  secondEl: document.querySelector('[data-seconds]'),
};

refs.startEl.setAttribute('disabled', true);

let selectedTime = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    const date = new Date();
    const currentTime = date.getTime();
    console.log(selectedDates);
    if (selectedTime < currentTime) {
      refs.startEl.setAttribute('disabled', true);
      alert('Please choose a date in the future');
      return;
    }
    refs.startEl.removeAttribute('disabled');
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

class Clock {
  constructor() {
    refs.startEl.addEventListener('click', this.start.bind(this));
  }

  update() {
    const date = new Date();
    const currentTime = date.getTime();
    const counterTime = selectedTime - currentTime;
    const convertTime = convertMs(counterTime);

    const { days, hours, minutes, seconds } = convertTime;
    refs.dayEl.textContent = `${days.toString().padStart(2, 0)}`;
    refs.hourEl.textContent = `${hours.toString().padStart(2, 0)}`;
    refs.minuteEl.textContent = `${minutes.toString().padStart(2, 0)}`;
    refs.secondEl.textContent = `${seconds.toString().padStart(2, 0)}`;

    if (counterTime <= 999) {
      this.stop();
    }
  }

  start() {
    this.counterStop = setInterval(this.update.bind(this), 1000);
    refs.startEl.setAttribute('disabled', true);
    refs.inputEl.setAttribute('disabled', true);
  }

  stop() {
    clearInterval(this.counterStop);
    refs.inputEl.removeAttribute('disabled');
  }
}

const onClock = new Clock();
