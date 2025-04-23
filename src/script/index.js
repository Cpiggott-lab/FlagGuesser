import { countries } from "../assets/countries-flags.js";

// Had to pass the continent positions in JS to make it dynamic. if screen size changed we lost the placement of the containers
const continentPositions = {
  "north-america": { x: 17, y: 16 },
  "south-america": { x: 27, y: 49 },
  europe: { x: 46, y: 8 },
  asia: { x: 66, y: 20 },
  africa: { x: 48, y: 36 },
  australia: { x: 78, y: 55 },
};

class FlagGuesserGame {
  constructor(countries) {
    this.introScreen = document.getElementById("full-intro-container");
    this.gameScreen = document.getElementById("full-game-container");
    this.endScreen = document.getElementById("full-end-game-container");
    this.playButton = document.getElementById("button-play-game");
    this.playAgain = document.getElementById("button-play-again");
    this.playerInput = document.getElementById("player-input");
    this.gameLives = document.getElementById("game-lives");
    this.gameScore = document.getElementById("game-score");
    this.flagRow = document.getElementById("flag-row");
    this.highScores = document.getElementById("end-game-high-scores-list");
    this.continentBoxes = document.querySelectorAll(".continent-box");
    this.mapImage = document.getElementById("background-image");
    this.countries = countries;

    this.score = 0;
    this.lives = 5;
    this.playerName = "";
    this.usedCountries = [];

    this.playButton.addEventListener("click", () => {
      console.log("play button");
      this.startGame();
    });
    this.playAgain.addEventListener("click", () => this.startGame());
    window.addEventListener("resize", () => this.positionContinentBoxes()); // for the dynamic size
  }
  startGame() {
    this.score = 0;
    this.lives = 5;
    this.usedCountries = [];

    this.playerName = this.playerInput.value.trim() || "Player";

    this.introScreen.classList.add("hidden");
    this.endScreen.classList.add("hidden");
    this.gameScreen.classList.remove("hidden");

    this.positionContinentBoxes(); //calling the position continents method in the startGame() to have them show.
  }
  endGame() {
    this.gameScreen.classList.add("hidden");
    this.endScreen.classList.remove("hidden");
  }
  //below added to replace CSS positioning
  positionContinentBoxes() {
    const mapWidth = this.mapImage.clientWidth; //grabbing the current width in pixels of the background image.
    const mapHeight = this.mapImage.clientHeight; // same as above but for height

    //Responsive Placement
    //looping through the continent boxes set in HTML using the constructor named variable above
    this.continentBoxes.forEach((box) => {
      const id = box.id;
      const coords = continentPositions[id]; //then matching the ID pulled from HTML to the continent onject positions
      if (!coords) return;

      const left = (coords.x / 100) * mapWidth; //dynamically adjusting the width and height
      const top = (coords.y / 100) * mapHeight;

      box.style.left = `${left}px`; //applying the correct width and height here.
      box.style.top = `${top}px`;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new FlagGuesserGame(countries);
});
