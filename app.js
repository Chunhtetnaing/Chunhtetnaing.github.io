const gridContainer = document.querySelector(".grid-container");
let firstCard, secondCard;
let score = 0;
let lockBoard = false;
document.querySelector(".score").textContent = score;

// fetch("./data/cards.json")
//   .then((res) => res.json())
//   .then((data) => {
//     cards = [...data, ...data];
//     shuffleCards();
//     generateCards();
//     console.log(cards);
//   });

let cards = [
  {
    image: "./assets/chili.png",
    name: "chili",
  },
  {
    image: "./assets/grapes.png",
    name: "grapes",
  },
  {
    image: "./assets/lemon.png",
    name: "lemon",
  },
  {
    image: "./assets/orange.png",
    name: "orange",
  },
  {
    image: "./assets/pineapple.png",
    name: "pineapple",
  },
  {
    image: "./assets/strawberry.png",
    name: "strawberry",
  },
  {
    image: "./assets/chili.png",
    name: "chili",
  },
  {
    image: "./assets/grapes.png",
    name: "grapes",
  },
  {
    image: "./assets/lemon.png",
    name: "lemon",
  },
  {
    image: "./assets/orange.png",
    name: "orange",
  },
  {
    image: "./assets/pineapple.png",
    name: "pineapple",
  },
  {
    image: "./assets/strawberry.png",
    name: "strawberry",
  },
];
shuffleCards();
generateCards();

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  console.log(cards.length);
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex = currentIndex - 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
        <div class="front">
          <img class="front-image" src=${card.image} />
        </div>
        <div class="back"></div>
      `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  // console.log(firstCard.dataset.name);
  // console.log(secondCard.dataset.name);
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disappearCards() : unflipCards();
}

function disappearCards() {
  setTimeout(() => {
    firstCard.style.visibility = "hidden";
    secondCard.style.visibility = "hidden";
    resetBoard();
  }, 500);
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelectorAll(".score");
}
