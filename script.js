// element
const countdownEl = document.querySelector("#countdown-container h1");
const moveSound = document.querySelector('audio.move-sound');
const startSound = document.querySelector('audio.start-sound');
const stopSound = document.querySelector('audio.stop-sound');

const startBtn = document.querySelector("#button button");
const column = document.querySelector(".column");
const columnInput = column.querySelector('#columnNumber');

const intervalTime = [15,10,10,15,15,10,25,10,20,25];
let randomTime;
let time;
let countdownInterval;
let totalColumns;


startBtn.addEventListener('click',countdown);



// generate random interval time
function generateInterval(){
  randomTime = Math.floor(Math.random() * intervalTime.length);
  return intervalTime[randomTime];
}

function countdown() {
  if (!columnInput.value) {
    alert('ups! anda belum menentukan jumlah kolom')
  } else {
    
    // hide input column
    column.classList.add('hide');
    // hide this button
    startBtn.classList.add('hide');
    // start sound on
    startSound.play();
    
    totalColumns = +columnInput.value;

    time = generateInterval();
    countdownEl.innerText = time;
    countdownInterval = setInterval(function() {
      time--;
      if (time < 1) {
        totalColumns--;
        moveSound.play();
        time = generateInterval();
        if (totalColumns < 1) {
          // hide input column
          column.classList.remove('hide');
          // hide this button
          startBtn.classList.remove('hide');
          
          stopSound.play();
          moveSound.pause();
          moveSound.currentTime = 0;
          clearInterval(countdownInterval);

        }
      }
      countdownEl.innerText = time;
    }, 1000);

  }
}