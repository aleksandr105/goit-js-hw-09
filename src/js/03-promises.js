const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onRanderPromis);
let position = 1;

function onRanderPromis(e) {
  e.preventDefault();
  const delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  const amount = Number(e.target.amount.value);

  intervalId = setInterval(() => {
    if (amount === position) {
      clearInterval(intervalId);
    }

    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, delay);
}

function createPromise(position, delay) {
  return (promise = new promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }));
}
