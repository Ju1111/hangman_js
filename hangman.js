const exit = () => {
  rl.close()
  process.exit()
}

const wrongGuessCount = (word, guesses) => {
  return guesses.filter(guess => word.indexOf(guess) === -1).length
}

const showGuess = (word, guesses) => {
 return word.split('').map(char =>
  { if (guesses.includes(char)) {
    return char
    }
    return '_'
  }).join('')
  rl.close()
}

const playAgain = () => {
  rl.question('Do you want to play again (Y/N)? ', reply => {
    if (reply === 'Y' || reply === 'y') { nextGuess(randomWord(), []) }
    else exit()
  })
}

const isWinner = (word, guesses) => {
  if (wrongGuessCount(word, guesses) > 6) {
    console.log(`You lost! The correct flower was ${ word }`)
    playAgain()
  }
  if (word === showGuess(word, guesses)) {
    console.log(`You won! I hope you like the smell of ${ word }`)
    playAgain()
  }
}

const skipDuplicate = (guesses, answer) => {
  if (guesses.includes(answer)) {
    console.log('You have already guessed this letter!')
    return true
  }
}

const printHangman = (word, guesses) => {
  switch(wrongGuessCount(word, guesses)) {
    case 1:
      console.log('|------\n|\n|\n|\n|\n|')
      break
    case 2:
      console.log('|------|\n|      O\n|\n|\n|\n|')
      break
    case 3:
      console.log('|------|\n|      O\n|      |\n|      |\n|\n|')
      break
    case 4:
      console.log('|------|\n|      O\n|     \\| \n|      |\n|\n|')
      break
    case 5:
      console.log('|------|\n|      O\n|     \\|/ \n|      |\n|\n|')
      break
    case 6:
      console.log('|------|\n|      O\n|     \\|/ \n|      |\n|     /\n|')
      break
    case 7:
      console.log('|------|\n|      O\n|     \\|/ \n|      |\n|     / \\ \n|')
      break
  }
}

// read from the console
const readline = require('readline')
const rl = readline.createInterface({ input:process.stdin, output:process.stdout })

const nextGuess = (word, guesses) => {
  isWinner(word, guesses)

  //include a welcome message
  if (guesses.length == 0) {
    console.log('Welcome to my flowers hangman. Please choose a letter to guess the first flower.');
  }

  // ask for the next letter
  rl.question('Guess a letter ', answer => {
    console.log('player wrote:', answer)
    answer.trim()
    //wrong letter twice won't be counted the second time
    if (skipDuplicate(guesses, answer)) return nextGuess(word, guesses)
    guesses.push(answer[0])
    console.log(showGuess(word, guesses))
    console.log('Number of wrong guesses: ' + wrongGuessCount(word, guesses))
    printHangman(word, guesses)
    nextGuess(word, guesses)
  })
}

const word = ['sunflower',
  'rose',
  'lotus',
  'hibiscus',
  'daisy',
  'tulip',
  'jasmine',
  'magnolia',
  'chrysanthemum',
  'orchids',
  'aster',
  'peony',
  'clover',
  'dandelion',
  'lavender',
  'chamomile',
  'lily',
  'gerbera',
  'poppy',
  ]

const randomWord = () => {
  let newWord = word[Math.floor(Math.random() * word.length)]
  return newWord
}

nextGuess(randomWord(), [])
