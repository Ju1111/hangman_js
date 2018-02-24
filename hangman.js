function exit(){
  rl.close()
  process.exit()
}

function wrongGuessCount(word, guesses) {
  return guesses.filter(guess => word.indexOf(guess) === -1).length
}

function showGuess(word, guesses) {
 return word.split('').map(char =>
  { if (guesses.includes(char)) {
     return char
    }
    return '_'
  }).join('')
  rl.close()
}

function isWinner(word, guesses) {
  if (wrongGuessCount(word, guesses) > 6) {
    console.log('You lost!')
    exit()
  }
  if (word === showGuess(word,guesses)) {
    console.log('You won!')
    exit()
  }
}

function skipDuplicate (word, guesses, answer) {
  if (guesses.includes(answer)) {
    console.log('You have already guessed this letter wrong!')
    return true
  }
}

// read from the console
const readline = require('readline')
const rl = readline.createInterface({input:process.stdin, output:process.stdout})

function nextGuess(word, guesses) {
    isWinner(word, guesses)
    // ask for the next letter
    rl.question('next letter? ', answer => {
        console.log('player wrote:', answer)
        answer.trim()
        //wrong letter twice won't be counted the second time
        if (skipDuplicate(word, guesses, answer)) return nextGuess(word, guesses)
        guesses.push(answer[0])
        console.log(showGuess(word, guesses))
        console.log('Number of wrong guesses: ' + wrongGuessCount(word, guesses))
        nextGuess(word, guesses)
    })
}

nextGuess('sunflower', [])
