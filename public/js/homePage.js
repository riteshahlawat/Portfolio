console.log("Hawoo >.<");
var introTypeWriter = document.getElementById("intro-text-typewriter");
// Sections
var header = document.querySelector("header");

var home = document.getElementById("intro");
var about = document.getElementById("about");
var portfolio = document.getElementById("portfolio");
// Tabs
var homeTab = document.getElementById("home-tab");
var aboutTab = document.getElementById("about-tab");
var portfolioTab = document.getElementById("portfolio-tab");

// Scroll Magic
var smController = new ScrollMagic.Controller();


// Intro header transition
var introTexts = document.querySelectorAll(".section-intro-text");

for (let i = 0; i < introTexts.length; i++) {
  let introText = introTexts[i];
  new ScrollMagic.Scene({
    triggerElement: introText,
    triggerHook: 1,
    duration: "180%",
    offset: 250
  })
    .setClassToggle(introText, "visible")
    .reverse(true)
    .addTo(smController);
}
// Intro header text transition
var introDividers = document.querySelectorAll(".section-intro-divider");
for (let i = 0; i < introDividers.length; i++) {
  let introDiv = introDividers[i];
  new ScrollMagic.Scene({
    triggerElement: introDiv,
    triggerHook: 1,
    duration: "180%",
    offset: 185
  })
    .setClassToggle(introDiv, "visible")
    .reverse(true)
    .addTo(smController);
}

// Quality card transition
var qualityCards = document.querySelectorAll(".hex-wrap");
for (let i = 0; i < qualityCards.length; i++) {
  let card = qualityCards[i];
  new ScrollMagic.Scene({
    triggerElement: "#qualities", // Element
    triggerHook: 0.85, // show when scrolled 10% into view
    duration: "180%", // hide 10% before exiting view
    offset: 180 // move trigger to center of element
  })
    .setClassToggle(card, "visible")
    .reverse(true)
    .addTo(smController);
}
// Quality card text transition
var qualityCardTexts = document.querySelectorAll(".quality-title");
for (let i = 0; i < qualityCardTexts.length; i++) {
  let text = qualityCardTexts[i];
  new ScrollMagic.Scene({
    triggerElement: "#qualities", // Element
    triggerHook: 0.85, // show when scrolled 10% into view
    duration: "180%", // hide 10% before exiting view
    offset: 280 // move trigger to center of element
  })
    .setClassToggle(text, "visible")
    .reverse(true)
    .addTo(smController);
}

new ScrollMagic.Scene({
  triggerElement: "#who-am-i",
  triggerHook: 0.85,
  duration: "",
  offset: 170
})
    .setClassToggle("#who-am-i", "visible")
    .reverse(false)
    .addTo(smController);

// TypeWriter
var typewriter = new Typewriter(introTypeWriter, {
  strings: ["Student", "Full-Stack Developer", "Mobile Developer"],
  loop: true,
  delay: 30,
  autoStart: true
});
// Tab listeners
homeTab.addEventListener("click", () => {
  home.scrollIntoView({ behavior: "smooth" });
});

aboutTab.addEventListener("click", () => {
  about.scrollIntoView({ behavior: "smooth" });
});

portfolioTab.addEventListener("click", () => {
  portfolio.scrollIntoView({ behavior: "smooth" });
});
