const selectionButtons = document.querySelectorAll("[data-selection]");
const finalColumn = document.querySelector("[data-final-column]");
const computerScoreSpan = document.querySelector("[data-computer-score]");
const yourScoreSpan = document.querySelector("[data-your-score]");

const SELECTIONS = [
  {
    name: "rock",
    emoji: "✊",
    beats: "scissors",
  },
  {
    name: "paper",
    emoji: "✋",
    beats: "rock",
  },
  {
    name: "scissors",
    emoji: "✌",
    beats: "paper",
  },
];

// determine which button select
selectionButtons.forEach((selectionButton) => {
  //  iterable DOM elements!
  // node list
  selectionButton.addEventListener("click", (e) => {
    const selectionName = selectionButton.dataset.selection; // dataset read-only property of the HTMLElement interface provides read/write access to custom data attributes (data-*) on elements.selection;
    const selection = SELECTIONS.find(
      (selection) => selection.name === selectionName
    ); // find method select first element if condition matches elemet in array
    makeSelection(selection);
  });
});

//determine whether you or computer win
function makeSelection(selection) {
  // function dec. is hoisted
  console.log("player selection:", selection);

  const computerSelection = randomSelection();
  console.log("computer selection:", computerSelection);
  const yourWinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);

  addSelectionResult(computerSelection, computerWinner);
  addSelectionResult(selection, yourWinner);

  if (yourWinner) incrementScore(yourScoreSpan);
  if (computerWinner) incrementScore(computerScoreSpan);
}

// indicate score
function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

// adding winner element
function addSelectionResult(selection, winner) {
  const div = document.createElement("div"); //
  div.innerText = selection.emoji;
  div.classList.add("result-selection");
  if (winner) div.classList.add("winner");
  finalColumn.after(div);
}

// indicate winner
function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name; // check who winner as regards computer selection or your selection object's property
}

// determine computer select which one
function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
}
