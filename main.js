class Card {
  _open = false;
  _success = false;

  constructor(cardNumber, action) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.textContent = cardNumber;
    this.number = cardNumber;

    this.card.addEventListener('click', () => {
      if (this.open === false && this.success === false) {
        this.open = true;
        action(this);
      };
    })

    document.getElementById('game__container').append(this.card);
  }

  set open(value) {
    this._open = value;
    value ? this.card.classList.add('open') : this.card.classList.remove('open');
  };
  get open() {
    return this._open;
  };
  set success(value) {
    this._success = value;
    value ? this.card.classList.add('success') : this.card.classList.remove('open');
  };
  get success() {
    return this._success;
  };
}

function createNumbersArray(count) {
  const pairArr = [];

  for (let i = 1; i <= count; i++) {
    pairArr.push(i);
    pairArr.push(i);
  };
  return pairArr;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startGame(count) {
  let numbersArray = createNumbersArray(count);
  let shuffleArray = shuffle(numbersArray);
  let cardArray = [];
  let cardOne = null;
  let cardTwo = null;

  for (const card of shuffleArray) {
    cardArray.push(new Card(card, flipCard));
  }

  function flipCard(card) {

    if (cardOne !== null && cardTwo !== null) {
      if (cardOne.number !== cardTwo.number) {
        cardOne.open = false;
        cardTwo.open = false;
        cardOne = null;
        cardTwo = null;
      }
    }

    if (cardOne === null) {
      cardOne = card;
    } else if (cardTwo === null) {
        cardTwo = card;
    }

    if (cardOne !== null && cardTwo !== null) {
      if (cardOne.number === cardTwo.number) {
        cardOne.success = true;
        cardTwo.success = true;
        cardOne = null;
        cardTwo = null;
      }
    }

    if (document.querySelectorAll('.card.success').length === cardArray.length) {
      document.getElementById('game__container').innerHTML = '';

      numbersArray = [];
      shuffleArray = []
      cardArray = [];
      cardOne = null;
      cardTwo = null;

      const winText = document.createElement('div');
      const restartButton = document.createElement('button');
      restartButton.classList.add('card');
      winText.classList.add('card');
      restartButton.classList.add('start-button');
      winText.classList.add('win-text');
      winText.textContent = 'YOU WON! CONGRATULATIONS!';
      restartButton.textContent = 'RESTART';

      document.getElementById('game__container').append(winText);
      document.getElementById('game__container').append(restartButton);

      restartButton.addEventListener('click', () => {
        winText.remove();
        restartButton.remove();
        startGame(8);
      })


    }
  }
}

function chooseDifficulty() {
  const startButton = document.createElement('button');

  startButton.classList.add('card');
  startButton.classList.add('start-button');
  startButton.textContent = 'START';
  document.getElementById('game__container').append(startButton);

  startButton.addEventListener('click', () => {
    startButton.remove();
    startGame(8);
  })
}

chooseDifficulty();

// TODO добавить уровни сложностей и таймер
