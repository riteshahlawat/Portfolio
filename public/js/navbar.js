var home = document.getElementById("intro");
var about = document.getElementById("about");
var portfolio = document.getElementById("portfolio");
var bodyRect = document.body.getBoundingClientRect();
var header = document.querySelector("header");

var homeTab = document.getElementById("home-tab");
var aboutTab = document.getElementById("about-tab");
var portfolioTab = document.getElementById("portfolio-tab");

window.onscroll = () => {
    let currentScrollPos = window.pageYOffset;
    // About section
    let aboutPos = about.offsetTop - header.clientHeight;
    // Portfolio section
    let portfolioPos = portfolio.offsetTop - header.clientHeight;

    if (currentScrollPos < 1) {
        document.querySelector("header").style.backgroundColor = "transparent";
    } else {
        document.querySelector("header").style.backgroundColor = "#F0F6F7FF";
    }

    if (currentScrollPos >= 0 && currentScrollPos < aboutPos) {
        homeTab.classList.add("header-tab-focus");
        aboutTab.classList.remove("header-tab-focus");
        portfolioTab.classList.remove("header-tab-focus");

    } else if (currentScrollPos >= aboutPos && currentScrollPos < portfolioPos) {
        homeTab.classList.remove("header-tab-focus");
        aboutTab.classList.add("header-tab-focus");
        portfolioTab.classList.remove("header-tab-focus");

    } else {
        // currentScrollPos >= portfolioPos
        homeTab.classList.remove("header-tab-focus");
        aboutTab.classList.remove("header-tab-focus");
        portfolioTab.classList.add("header-tab-focus");
    }
}