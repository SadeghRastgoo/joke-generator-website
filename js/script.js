"use strict";

const jokeEl = document.querySelector(".joke");
const toastEl = document.querySelector(".toast");
const ratingEl = document.querySelector(".rating");
const ratingItemsEl = document.querySelectorAll(".rating-item");
const jokeTransitionEl = document.querySelector(".joke__transition");
const text2SpeechBtn = document.querySelector(".text-to-speech-btn");
const generateBtn = document.querySelector(".generate-btn");

const text2Speech = new SpeechSynthesisUtterance();

const init = () => {
  for (const el of ratingItemsEl) {
    toastEl.classList.add("toast--hidden");
    ratingEl.classList.remove("rating--hidden");
    el.classList.remove("rating-item--active");
  }
};

ratingItemsEl.forEach((el) => {
  el.addEventListener("click", () => {
    ratingEl.classList.add("rating--hidden");
    el.classList.add("rating-item--active");
    toastEl.classList.remove("toast--hidden");
    setTimeout(function () {
      toastEl.classList.add("toast--hidden");
    }, 5000);
  });
});

const generateNewJoke = () => {
  axios
    .get("https://icanhazdadjoke.com/slack")
    .then(function (response) {
      jokeEl.textContent = response.data.attachments[0].text;
    })
    .catch(function (error) {
      console.log(error);
    });
  jokeTransitionEl.classList.toggle("joke__transition--active");
  init();
};

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    generateNewJoke();
  }
});
generateBtn.addEventListener("click", generateNewJoke);

text2SpeechBtn.addEventListener("click", () => {
  text2Speech.text = jokeEl.textContent;
  window.speechSynthesis.speak(text2Speech);
});
