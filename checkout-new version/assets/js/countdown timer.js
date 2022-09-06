const oneSec = 1000,
    container = document.getElementById('timer');

let dataMinutes = container.getAttribute('data-minutes'),
    dataSeconds = container.getAttribute('data-seconds'),
    timerEnd = container.getAttribute('data-timer-end'),
    timerOnEndMsg = "data-timer-end";

if (dataMinutes == '' || dataMinutes == null || dataMinutes == NaN) {
    dataMinutes = "0";
}
if (dataSeconds == '' || dataSeconds == null || dataSeconds == NaN) {
    dataSeconds = "0";
}

let minutesSpan = document.createElement('span'),
    secondsSpan = document.createElement('span'),
    separator2 = document.createElement('span'),
    separatorValue = ":",
    max = 59,
    s = parseInt(dataSeconds) > max ? max : parseInt(dataSeconds),
    m = parseInt(dataMinutes) > max ? max : parseInt(dataMinutes);

secondsSpan.classList.add('time');
minutesSpan.classList.add('time');
separator2.classList.add('separator');
separator2.textContent = separatorValue;

checkValue = (value)=>{
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
}
minutesSpan.textContent = checkValue(dataMinutes);
secondsSpan.textContent = checkValue(dataSeconds);

timer = (sv,mv)=>{

  s = parseInt(sv);
  m = parseInt(mv);
  
  if (s > 0) {
    return s -= 1;
  } else {
    s = max;
    if (m > 0) {
      return m -= 1;
    } else {
      m = max;
    }
  }
}

finished = ()=>{
  max = 0;
	let timerEnd = container.getAttribute(timerOnEndMsg);
	container.setAttribute(timerOnEndMsg, 'true');
	if (timerEnd == '' || timerEnd == null) {
		container.textContent = "timer-end";
	} else {
		container.textContent = timerEnd;
	}
}

counter = setInterval(()=>{

  if (m == 0 && s == 0) {
    clearInterval(counter, finished());
  }

  if (s >= 0) {
    timer(s,m);
    minutesSpan.textContent = checkValue(m);
    secondsSpan.textContent = checkValue(s);
  }
}, oneSec);

let children = [minutesSpan, separator2, secondsSpan];

for (child of children) {
  container.appendChild(child);
}