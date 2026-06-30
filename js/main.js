const intro = document.querySelector(".intro");
const firstSentence = document.querySelector(".intro__sentence--first");
const secondSentence = document.querySelector(".intro__sentence--second");

const showFirstSentence = 100;
const showSecondSentence = 600;
const fadeOutIntro = 3400;
const hideIntro = 4200;

window.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(() => {
    firstSentence.classList.add("is-visible");
  }, showFirstSentence);

  window.setTimeout(() => {
    secondSentence.classList.add("is-visible");
  }, showSecondSentence);

  window.setTimeout(() => {
    intro.classList.add("is-fading-out");
  }, fadeOutIntro);

  window.setTimeout(() => {
    intro.classList.add("is-hidden");
  }, hideIntro);
});
