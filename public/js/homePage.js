console.log("Hawoo >.<");
var introTypeWriter = document.getElementById("intro-text-typewriter");
// Sections
var home = document.getElementById("intro");
var about = document.getElementById("about");
var portfolio = document.getElementById("portfolio");
// Tabs
var homeTab = document.getElementById("home-tab");
var aboutTab = document.getElementById("about-tab");
var portfolioTab = document.getElementById("portfolio-tab");

// Scroll Magic
var smController = new ScrollMagic.Controller();

new ScrollMagic.Scene({
    triggerElement: "#qualities", // Element
    triggerHook: 0.85, // show when scrolled 10% into view
    duration: "185%", // hide 10% before exiting view 
    offset: 60 // move trigger to center of element
})
.setClassToggle("#qualities", "visible")
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
    home.scrollIntoView({behavior: "smooth"});
});

aboutTab.addEventListener("click", () => {
    about.scrollIntoView({behavior: "smooth"});
});

portfolioTab.addEventListener("click", () => {
    portfolio.scrollIntoView({behavior: "smooth"});
});
