const select = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector(".btn");
const currentTime = document.querySelector("h1");
const content = document.querySelector(".content");

let alarTime, isAlarmSet = false,
ringtone = new Audio("./Images/ringtone.mp3");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`
    select[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`
    select[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`
    select[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    // if hour value is 0, set this value to 12
    h = h == 0 ? h = 12 : h;
    // adding 0 value before hour, minutes and seconds if this value is less than 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarTime == `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000); 

setAlarm = () => {
    if (isAlarmSet) { //if isAlarmset true
        alarTime = ""; //clear the value of alarmTime
        ringtone.pause(); //pause  the ringtone
        content.classList.remove("disable");
        setAlarmBtn.innerText = `Set Alarm`;
        return isAlarmSet = false; //return isAlarmset to false
    }

    let time = `${select[0].value}:${select[1].value} ${select[2].value}`;

    if (time.includes("Hours") || time.includes("Minutes") || time.includes("AM/PM")) {
        return alert("Please Enter a valid time to set alarm")
    }
    isAlarmSet = true;
    alarTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = `Clear Alarm`;
}

setAlarmBtn.addEventListener("click", setAlarm);