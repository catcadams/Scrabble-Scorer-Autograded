// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
const specialChar = [
  ".",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "<",
  ">",
  "?",
  "/",
  ";",
  ":",
  ",",
];
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function initialPrompt() {
  const userWord = input.question(
    "Let's play some scrabble! Enter a word to score: "
  );
  for (let index = 0; index < userWord.length; index++) {
    if (
      nums.includes(userWord[index]) ||
      specialChar.includes(userWord[index])
    ) {
      console.log("Invalid Input");
      return initialPrompt();
    }
  }
  return userWord;
}

const newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0;

let simpleScorer = (word) => {
  let score = word.length;
  return score;
};

let vowelBonusScorer = (word) => {
  const vowels = ["a", "e", "i", "o", "u"];
  const userWord = word.toLowerCase().split("");
  const userVowels = [];
  for (let index = 0; index < userWord.length; index++) {
    for (let index1 = 0; index1 < vowels.length; index1++) {
      if (vowels.includes(userWord[index])) {
        userVowels.push(userWord[index]);
        userWord.splice(index, 1);
      }
    }
  }
  const score = userVowels.length * 3 + userWord.length;
  return score;
};

let scrabbleScorer = (word) => {
  word = word.toLowerCase();
  let score = 0;
  for (let index = 0; index < word.length; index++) {
    score += newPointStructure[word[index]];
  }
  return score;
};

const simpleScore = {
  name: "Simple Score",
  description: "Each letter is worth 1 point",
  scorerFunction: simpleScorer,
};
const bonusVowels = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: vowelBonusScorer,
};
const scrabbleScore = {
  name: "Scrabble",
  description: "The traditional scoring algorithm",
  scorerFunction: scrabbleScorer,
};
const scoringAlgorithms = [simpleScore, bonusVowels, scrabbleScore];

function scorerPrompt(word) {
  console.log("Which scoring algorithm would you like to use? \n");
  for (let index = 0; index < scoringAlgorithms.length; index++) {
    console.log(
      `${index + 1} - ` +
        scoringAlgorithms[index].name +
        ": " +
        scoringAlgorithms[index].description
    );
  }
  const userInput = input.question("\nEnter 1, 2, or 3: ");
  console.log(`\nScore for '${word}':`);
  if (userInput === "1") {
    console.log(scoringAlgorithms[0].scorerFunction(word));
  } else if (userInput === "2") {
    console.log(scoringAlgorithms[1].scorerFunction(word));
  } else if (userInput === "3") {
    console.log(scoringAlgorithms[2].scorerFunction(word));
  } else {
    console.log("Invalid input.");
    return scorerPrompt(initialPrompt());
  }
}

function transform(oldPointStructure) {
  const newPointStructure = {};
  for (const pointValue in oldPointStructure) {
    for (let index = 0; index < oldPointStructure[pointValue].length; index++) {
      newPointStructure[oldPointStructure[pointValue][index].toLowerCase()] =
        Number(pointValue);
    }
  }
  return newPointStructure;
}

function runProgram() {
  scorerPrompt(initialPrompt());
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
