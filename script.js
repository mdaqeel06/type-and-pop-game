window.onload = () => {
  document.querySelector(".start-game").style.display = "block";
  document.querySelector(".popup").classList.add("visible");
};

const body = document.querySelector("body");

let missed = 0;
let score = 0;
let speed = 1000;
let bubbleIntervalId;
let speedIntervalId;

const generateRandomNumber = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

const generateRandomCharacters = () => {
  const characters = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    ";",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    ",",
  ];
  return characters[generateRandomNumber(0, characters.length - 1)];
};

const generateRandomColor = () => {
  const digits = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let color = "#";
  for (let i = 1; i <= 6; i++) {
    color += digits[generateRandomNumber(0, digits.length - 1)];
  }
  return color;
};

const startBubbleInterval = () => {
  if (bubbleIntervalId) clearInterval(bubbleIntervalId);
  bubbleIntervalId = setInterval(() => {
    const div = document.createElement("div");
    div.style.background = generateRandomColor();
    const screenWidth = window.innerWidth - 200;
    div.style.left = generateRandomNumber(0, screenWidth - 1) + "px";
    div.classList.add("bubble");
    div.innerHTML = generateRandomCharacters();

    div.addEventListener("animationend", () => {
      missed++;
      const counter = document.getElementById("heart-" + missed);
      if (counter) counter.style.color = "#ffffff";
      div.remove();
    });

    body.appendChild(div);

    if (missed === 5) {
      document.querySelectorAll(".bubble").forEach((b) => b.remove());
      document.querySelector(".game-over").style.display = "block";
      document.querySelector(".popup").classList.add("visible");
      clearInterval(bubbleIntervalId);
      clearInterval(speedIntervalId);
    }
  }, speed);
};

const play = () => {
  missed = 0;
  score = 0;
  speed = 1000;
  document.getElementById("score").innerHTML = score;

  document.querySelectorAll(".lives > *").forEach((child) => {
    child.style.color = "#f00";
  });

  document.querySelector(".start-game").style.display = "none";
  document.querySelector(".game-over").style.display = "none";
  document.querySelector(".popup").classList.remove("visible");

  startBubbleInterval();

  if (speedIntervalId) clearInterval(speedIntervalId);
  speedIntervalId = setInterval(() => {
    if (speed > 200) {
      speed -= 100;
      startBubbleInterval();
    }
  }, 30000); // 30 seconds
};

document.addEventListener("keydown", (e) => {
  const divs = document.querySelectorAll(".bubble");
  for (let div of divs) {
    if (div.textContent.trim() === e.key) {
      score++;
      div.classList.add("pop");
      document.getElementById("score").innerHTML = score;
      setTimeout(() => div.remove(), 1000);
      break;
    }
  }
});
