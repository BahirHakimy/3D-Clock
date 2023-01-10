const zfill = (num) => (num > 9 ? num : `0${num}`);
function $(query) {
  return document.querySelector(query);
}

function flip(target) {
  const next = document.getElementById(`${target}-next`);
  const panel = document.getElementById(`${target}-panel`);
  const bottom = document.getElementById(`${target}-bottom`);
  let val = 0;
  if (target === 'hour') {
    val = next.textContent - 0 + 1 <= 12 ? next.textContent - 0 + 1 : 1;
    val = zfill(val);
  } else if (target !== 'ind') {
    val = next.textContent - 0 + 1 <= 59 ? next.textContent - 0 + 1 : 0;
    val = zfill(val);
  } else {
    val = next.textContent === 'AM' ? 'PM' : 'AM';
  }

  next.textContent = val;
  const value = val === 'AM' ? 'PM' : 'AM';
  panel.innerHTML = `<div class='parts parts-front'>${
    target !== 'ind' ? zfill(val - 1) : value
  }</div>
      <div class='parts parts-back'>${val}</div>`;
  panel.classList.toggle('flip');
  setTimeout(() => {
    panel.classList.toggle('flip');
    bottom.textContent = val;
    panel.innerHTML = '';
  }, 600);
}
function start() {
  const date = new Date();
  const time = {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    ind: date.getHours() >= 12 ? 'PM' : 'AM',
  };
  const hourValue = time.hour > 12 ? time.hour - 12 : time.hour;
  $('#hour-next').innerText = zfill(hourValue);
  $('#hour-bottom').innerText = zfill(hourValue);
  $('#minute-next').innerText = zfill(time.minute);
  $('#minute-bottom').innerText = zfill(time.minute);
  $('#second-next').innerText = zfill(time.second);
  $('#second-bottom').innerText = zfill(time.second);
  $('#ind-next').innerText = time.ind;
  $('#ind-bottom').innerText = time.ind;
  setInterval(() => {
    time.second += 1;
    if (time.second > 59) {
      time.second = 0;
      time.minute += 1;
      flip('minute');
    }
    if (time.minute > 59) {
      time.minute = 0;
      time.hour += 1;
      flip('hour');
    }
    if (time.hour > 12) {
      time.hour = 1;
    }
    if (time.hour === 11 && time.minute === 59 && time.second === 59) {
      time.ind = time.ind === 'AM' ? 'PM' : 'AM';
      flip('ind');
    }
    flip('second');
  }, 1000);
}
start();
