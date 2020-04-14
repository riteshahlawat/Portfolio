// Firebase

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCwI93qxmuAN3mQ3-3HWEKg_b4Oktm_a9c",
  authDomain: "portfolio-da18d.firebaseapp.com",
  databaseURL: "https://portfolio-da18d.firebaseio.com",
  projectId: "portfolio-da18d",
  storageBucket: "portfolio-da18d.appspot.com",
  messagingSenderId: "143588271727",
  appId: "1:143588271727:web:6e2cc12ec0e7f5a65acf9a",
  measurementId: "G-92MJJL0XQM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

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
    duration: 0,
    offset: 250,
  })
    .setClassToggle(introText, "visible")
    .reverse(false)
    .addTo(smController);
}
// Intro header text transition
var introDividers = document.querySelectorAll(".section-intro-divider");
for (let i = 0; i < introDividers.length; i++) {
  let introDiv = introDividers[i];
  new ScrollMagic.Scene({
    triggerElement: introDiv,
    triggerHook: 1,
    duration: 0,
    offset: 185,
  })
    .setClassToggle(introDiv, "visible")
    .reverse(false)
    .addTo(smController);
}

// Quality card transition
var qualityCards = document.querySelectorAll(".hex-wrap");
for (let i = 0; i < qualityCards.length; i++) {
  let card = qualityCards[i];
  new ScrollMagic.Scene({
    triggerElement: "#qualities", // Element
    triggerHook: 0.85, // show when scrolled 10% into view
    duration: 0, // hide 10% before exiting view
    offset: 180, // move trigger to center of element
  })
    .setClassToggle(card, "visible")
    .reverse(false)
    .addTo(smController);
}
// Quality card text transition
var qualityCardTexts = document.querySelectorAll(".quality-title");
for (let i = 0; i < qualityCardTexts.length; i++) {
  let text = qualityCardTexts[i];
  new ScrollMagic.Scene({
    triggerElement: "#qualities", // Element
    triggerHook: 0.85, // show when scrolled 10% into view
    duration: 0, // hide 10% before exiting view
    offset: 280, // move trigger to center of element
  })
    .setClassToggle(text, "visible")
    .reverse(false)
    .addTo(smController);
}
// Who Am I (Profile photo and Description)
new ScrollMagic.Scene({
  triggerElement: "#who-am-i",
  triggerHook: 0.85,
  duration: 0,
  offset: 170,
})
  .setClassToggle("#who-am-i", "visible")
  .reverse(false)
  .addTo(smController);

// Skills

// Bring entire container into view
new ScrollMagic.Scene({
  triggerElement: "#skills-container",
  triggerHook: 0.85,
  duration: 0,
  offset: 170,
})
  .setClassToggle("#skills-container", "visible")
  .reverse(false)
  .addTo(smController);

new ScrollMagic.Scene({
  triggerElement: "#projects",
  triggerHook: 0.7,
  duration: 0,
  offset: 170,
})
  .setClassToggle("#projects", "visible")
  .reverse(false)
  .addTo(smController);

// Gets individual rows filled
var rowFilled = document.querySelectorAll(".skill-row-filled");
for (let i = 0; i < rowFilled.length; i++) {
  let row = rowFilled[i];
  new ScrollMagic.Scene({
    triggerElement: "#skills-container",
    triggerHook: 0.85,
    duration: 0,
    offset: 170,
  })
    .setClassToggle(row, "visible")
    .reverse(false)
    .addTo(smController);
}

// TypeWriter
var typewriter = new Typewriter(introTypeWriter, {
  strings: ["Student", "Full-Stack Developer", "Mobile Developer"],
  loop: true,
  delay: 30,
  autoStart: true,
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
var projects = [];

// React

class Projects extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    projects: [
      {
        name: "App",
        technologies: "React",
        description: "It's just an app.",
        url: "https://www.google.ca/",
        picture: "https://www.google.ca/",
      },
    ],
  };

  componentDidMount() {
    let tempProjects = [];
    db.collection("Projects")
      .orderBy("priority")
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          tempProjects.push(doc.data());
        });
        this.setState({ projects: tempProjects });
      });
  }

  render() {
    return this.state.projects.map((project, index) => (
      <Project
        picture={this.state.projects[index].picture}
        name={this.state.projects[index].name}
        technologies={this.state.projects[index].technologies}
        description={this.state.projects[index].description}
        url={this.state.projects[index].url}
      />
    ));
  }
}

class Project extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        target="_blank"
        href={`${this.props.url}`}
        className="project-image"
        style={{ backgroundImage: `url(${this.props.picture})` }}
      >
        <div className="project">
          <div className="project-data">
            <div className="project-title">
              <div className="project-title-div">{this.props.name}</div>
            </div>
            <div className="project-technologies">
              <div className="project-technologies-div">
                {this.props.technologies}
              </div>
            </div>
            <div className="project-center-divider"></div>
            <div className="project-description">
              <div className="project-description-div">
                {this.props.description}
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

ReactDOM.render(<Projects />, document.getElementById("projects"));
