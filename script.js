// element
const countdownEl = document.querySelector("#countdown-container h1");
const moveSound = document.querySelector('audio.move-sound');
const startSound = document.querySelector('audio.start-sound');
const stopSound = document.querySelector('audio.stop-sound');
const totalTimeEl = document.querySelector('#totalTime');

const startBtn = document.querySelector("#button button");
const column = document.querySelector(".column");
const columnInput = column.querySelector('#columnNumber');
const intervalInput = column.querySelector('#intervalTime');

const kreplinOpt = document.querySelector('#krapelin')
const pauliOpt = document.querySelector('#pauli')


const intervalTime = [15,10,10,15,15,10,25,20,10,20,25];
let totalTime = 0;
let randomTime;
let countdownInterval,time,minute = 0,second,duration = 0;

let totalColumns;
let type = "krapelin";


pauliOpt.addEventListener('click',hideInputFild);
kreplinOpt.addEventListener('click',hideInputFild);
startBtn.addEventListener('click',countdown);



function hideInputFild(e){
  if (e.target.id == "pauli") {
    type = "pauli";
    columnInput.classList.add('hide-input');
  }else if (e.target.id == "krapelin") {
    type = "krapelin";
    columnInput.classList.remove('hide-input');
  }
}


// generate random interval time
function generateInterval(){
  randomTime = Math.floor(Math.random() * intervalTime.length);
  return intervalTime[randomTime];
}

function countdown() {
  if (!columnInput.value && type == "krapelin") {
    alert('ups! anda belum menentukan jumlah kolom')
  } else {
    // hide input column
    column.classList.add('hide');
    // hide start button
    startBtn.classList.add('hide');
    // start sound on
    startSound.play();


    totalColumns = +columnInput.value || 99999999;
    time = +intervalInput.value || generateInterval();
    countdownEl.classList.remove("hide");
    countdownEl.innerText = time;
    countdownInterval = setInterval(function() {
      time--;
      duration++;
      
      minute = Math.floor(duration / 60);
      second = duration % 60;
      totalTimeEl.innerHTML = `
       <span> total waktu: <strong> ${minute} menit ${second} detik </strong></span>
      `;
      
      if (time < 1) {
        totalColumns--;
        moveSound.play();
        time = +intervalInput.value || generateInterval();
        if (totalColumns < 1) {
          // display input column
          column.classList.remove('hide');
          // display start button
          startBtn.classList.remove('hide');
          countdownEl.classList.add("hide");

          moveSound.pause();
          stopSound.play();
          clearInterval(countdownInterval);
        }
      }
      
      if (minute == 60) {
        // display input column
        column.classList.remove('hide');
        // display start button
        startBtn.classList.remove('hide');
        // hide countdown
        countdownEl.classList.add('hide');
        moveSound.pause();
        stopSound.play();
        duration = 0;
        clearInterval(countdownInterval);
      }
      
      countdownEl.innerText = time;
    
    }, 1000);
    
  }
 
}