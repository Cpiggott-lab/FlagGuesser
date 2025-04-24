import { countries } from "../assets/countries-flags.js";
import { continentPositions } from "../assets/continent-positions.js";

class FlagGuesserGame {
  constructor(countries) {
    //adding all the elements
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
    //basic game operation stuff
    this.score = 0;
    this.lives = 5;
    this.playerName = "";
    this.usedCountries = [];

    this.playButton.addEventListener("click", () => this.startGame());
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
    this.dropZones(); //to let the continent highlighting work again after adding drag and drop
    this.displayFlags(); //calling the adding flag method to show in HTML
    this.updateGameInfo(); //So the hearts appear at game start
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
  //filtering through flags comparing to unused flags.
  filterUnusedFlags() {
    const filteredFlags = [];
    this.countries.forEach((unusedFlag) => {
      let isUsed = false;
      this.usedCountries.forEach((usedFlag) => {
        if (unusedFlag.name === usedFlag) {
          isUsed = true;
        }
      });
      if (!isUsed) {
        filteredFlags.push(unusedFlag);
      }
    });
    return filteredFlags;
  }
  //finding random flag.
  randomFlag() {
    const availableFlags = this.filterUnusedFlags();
    if (availableFlags.length === 0) {
      //if there are no more flags in teh array to endGame()
      this.endGame();
      return null;
    }
    const randomFlags = Math.floor(Math.random() * availableFlags.length);
    const selectedFlag = availableFlags[randomFlags];

    this.currentFlag = selectedFlag;
    return selectedFlag;
  }
  displayFlags() {
    const availableFlags = this.filterUnusedFlags();
    //if the array is empty all flags are used. So game over.
    if (availableFlags.length === 0) {
      this.endGame();
      return;
    }
    // Randomly shuffles array. Subtracting 0.5 gives both negative/positive values, letting .sort() order randomly. Without it returns the same thing everytime.
    const shuffled = availableFlags.sort(() => Math.random() - 0.5);
    const flagChoices = shuffled.slice(0, 12);

    this.flagRow.innerHTML = ""; //clearing flag row.
    flagChoices.forEach((flag) => {
      const flagElement = document.createElement("div");
      flagElement.textContent = flag.emoji; //addin the flag emoji to the div.
      flagElement.classList.add("flag-emoji"); //adding the css class for styling

      flagElement.setAttribute("draggable", true); //actually making it draggable thing.
      flagElement.dataset.country = flag.name; //saving the flag to check the country name to the continent name
      //the magic part of making it draggable with event listener
      flagElement.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", flag.name);
      });

      this.flagRow.appendChild(flagElement); //finally adding it to the row.
    });
  }
  // to fix the drop zones that broke after adding drag
  dropZones() {
    this.continentBoxes.forEach((zone) => {
      //fixes dragover highlight
      zone.addEventListener("dragover", (event) => {
        event.preventDefault(); //needed to allow drop
        zone.classList.add("highlighted");
      });
      //remove highlight after out of box
      zone.addEventListener("dragleave", () => {
        zone.classList.remove("highlighted");
      });
      //removing after drop. otherwise it stays
      zone.addEventListener("drop", (event) => {
        event.preventDefault(); // it tries to open the file on drop so need to stop that
        zone.classList.remove("highlighted");

        const droppedCountry = event.dataTransfer.getData("text/plain"); //grabbing the name of the coutnry dragged

        //calling the country from the list and comparing it to the dropped country. grabbing the country.
        const countryData = this.countries.find(
          (country) =>
            country.name.toLowerCase() === droppedCountry.toLowerCase()
        );

        if (!countryData) return;

        const correct = countryData.continent.toLowerCase() === zone.id;

        //calling the zones that we looped through which allows us to style them
        if (correct) {
          this.score++;
          zone.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
        } else {
          this.lives--;
          zone.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
        }
        this.updateGameInfo();
        this.usedCountries.push(countryData.name);

        //gives a delay on the zone color otherwise you cant see it, and the flags come too fast.
        setTimeout(() => {
          zone.style.backgroundColor = "";
          this.displayFlags();
        }, 600);
        if (this.lives <= 0) this.endGame();
      });
    });
  }
  endGame() {
    this.gameScreen.classList.add("hidden");
    this.endScreen.classList.remove("hidden");
  }
  updateGameInfo() {
    this.gameScore.textContent = `score ${this.score}`;
    this.gameLives.innerHTML = "💜".repeat(this.lives);
  }
} //ending bracket of class.

document.addEventListener("DOMContentLoaded", () => {
  new FlagGuesserGame(countries);
});

//FEATURES
//need to add high scores.
//Need to add popup window that add the country name.. probably need to add it to drop zones. To call the and push it with backticks into the element. create the element also.. Styles used shared styles probably but will have different positioning.
//replace only the used flag not the whole flagRow...
//maybe a start countdown.
//score multiplier for streaks.
//Maybe sound affects
//add eventlistener for the mainscreen to press enter to play again.

//BUGS
//need to fix bugs.
//FIXED But watch - bug with the flags sometimes registering wrong when dropped on a continent they belong to... Looks to be only south america, and mexico for north america.
