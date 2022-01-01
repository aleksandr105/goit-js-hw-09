const refs = {
  startRef: document.querySelector('.start'),
  stopRef: document.querySelector('.stop'),
  bodyRef: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startRef.addEventListener('click', colorStart);
refs.stopRef.addEventListener('click', colorStop);

function colorStart() {
  colorInterval = setInterval(() => {
    const color = getRandomHexColor();
    refs.bodyRef.style.backgroundColor = color;
  }, 1000);

  refs.stopRef.removeAttribute('disabled');
  refs.startRef.setAttribute('disabled', true);
}

function colorStop() {
  refs.startRef.removeAttribute('disabled');
  refs.stopRef.setAttribute('disabled', true);
  clearInterval(colorInterval);
}
