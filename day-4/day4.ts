const solution = (input: string[]) => {
  let totalScore = 0
  const cards = input.length
  const winningCards = Array(cards).fill(1)

  for (const [i, card] of input.entries()) {
    const [game, allNumbers] = card.split(":")
    const [winningStr, numbersStr] = allNumbers.trim().split("|")

    const winning = new Set(
      winningStr
        .trim()
        .split(/\s+/)
        .map((x) => parseInt(x)),
    )
    const numbers = new Set(
      numbersStr
        .trim()
        .split(/\s+/)
        .map((x) => parseInt(x)),
    )
    const winningNumbers = [...numbers].filter((x) => winning.has(x))
    console.log(`Winning: ${Array.from(winning)}`)
    console.log(`Yours: ${Array.from(numbers)}`)
    console.log(`Match: ${winningNumbers}`)
    const winners = winningNumbers.length
    const score = Math.floor(Math.pow(2, winners - 1))

    if (score >= 1) {
      totalScore += score
      for (let _ = 0; _ < winningCards[i]; _++) {
        for (let j = i + 1; j <= (winners + i) && j < cards; j++) {
          winningCards[j] += 1
        }
      }
    }
    console.log(winningCards)
    console.log(`${game}, score: ${score} total score: ${totalScore}`)
  }
  const winningCardsCount = winningCards.reduce((a, b) => a + b, 0)
  console.log(`FINAL SCORE: ${totalScore}`)
  console.log(`FINAL COUNT OF CARDS ${winningCardsCount}`)
}

let sample = await Bun.file("./day-4/day4-sample-input.txt").text()
let input = sample.split("\n")
solution(input)

let file = await Bun.file("./day-4/day4-input.txt").text()
input = file.split("\n")
solution(input)
