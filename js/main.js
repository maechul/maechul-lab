const intro = document.querySelector(".intro");
const hero = document.querySelector(".hero");
const firstSentence = document.querySelector(".intro__sentence--first");
const secondSentence = document.querySelector(".intro__sentence--second");

const showFirstSentence = 200;
const showSecondSentence = 800;
const fadeOutIntro = 4000;
const hideIntro = 5000;

window.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(() => {
    firstSentence.classList.add("is-visible");
  }, showFirstSentence);

  window.setTimeout(() => {
    secondSentence.classList.add("is-visible");
  }, showSecondSentence);

  window.setTimeout(() => {
    intro.classList.add("is-fading-out");
    hero.classList.add("is-visible");
  }, fadeOutIntro);

  window.setTimeout(() => {
    intro.classList.add("is-hidden");
  }, hideIntro);
});
