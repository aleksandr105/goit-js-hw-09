const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onRanderPromis);

function onRanderPromis(e) {
  e.preventDefault();
  let delay = Number(e.target.delay.value);
  let step = Number(e.target.step.value);
  let amount = Number(e.target.amount.value);
  let position = 0;
  intervalId = setInterval(() => {
    if (position >= amount) {
      clearInterval(intervalId);
      return;
    }
    position += 1;

    setTimeout(() => {
      delay += step;
    }, 0);

    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, step);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
