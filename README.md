# 🌍 FlagGuesser

Game URL: https://cpiggott-lab.github.io/FlagGuesser/

**FlagGuesser** is a drag-and-drop geography game where players match country flags to their correct continent. Built with vanilla JavaScript, HTML, and CSS, this game is fun, educational, and fully responsive across screen sizes.

---

## 🎮 How to Play

- Enter your name to start the game
- A row of 12 emoji flags appears at the bottom
- Drag a flag onto the correct continent on the world map
- ✅ Correct guess? Score increases
- ❌ Wrong guess? You lose a heart 💜
- Game ends when you run out of lives or use all the flags

---

## 🛠 Features

- 🗺️ **Responsive Continent Zones** – Drop zones scale with the screen size
- 🚩 **Drag and Drop Flags** – Powered by the HTML5 drag-and-drop API
- 🎯 **Score and Lives** – Live feedback as you play
- 🎨 **Stylish UI** – Retro design with neon highlights and emoji flags
- 🔄 **Replay Option** – Hit "Play Again" to restart a new round instantly
- 🌐 **Dynamic Flag Shuffling** – Every game is different

---

## 🧱 Tech Stack

- **JavaScript** – Game logic, event handling, DOM interaction
- **HTML** – Game structure, screens, and layout
- **CSS** – Styling, transitions, highlight effects

---

## 📁 Project Structure

src/
│
├── assets/
│ ├── world-map.png # Background image
│ ├── countries-flags.js # Flag data (name, emoji, continent)
│ └── continent-positions.js # Percentage-based continent positions
│
├── style/
│ └── styles.css # All game styling
│
└── script/
└── index.js # Main game class and logic

---

## 🧪 Future Plans

- 🗨️ Show the country name briefly after each drop
- 🔊 Add drag/drop sound effects and end game sounds
- 🔁 Replace only the dropped flag instead of the entire row
- 🔥 Score multiplier for correct streaks
- ⏱️ Add optional countdown before game starts
- 🥇 High score saving and display
- ⌨️ Press Enter to restart from the game over screen

---

## 🚀 Getting Started

To play locally:

1. Clone or download this repository
2. Open `index.html` in your browser
3. Drag some flags and test your skills!

---

## 📚 License

MIT – open-source and built for fun, learning, and geographic adventure.

---

## 🙌 Why This Game?

I wanted to build a lightweight, interactive learning tool that combines coding practice with something visual and satisfying. No frameworks, no dependencies — just pure DOM, drag-and-drop, and creativity.
