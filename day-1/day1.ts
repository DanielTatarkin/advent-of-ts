interface Dict {
  [key: string]: string
}

const mapping: Dict = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
}

interface Result {
  index: number
  value: string
}

const find_matches = (text: string, resultList: Result[]) => {
  for (const pattern in mapping) {
    const indexOfMatch = text.indexOf(pattern)
    if (indexOfMatch == -1) continue
    resultList.push({ index: indexOfMatch, value: mapping[pattern] })
    resultList.push({ index: text.lastIndexOf(pattern), value: mapping[pattern] })
  }
}

const run_day1_solution = (input: string[]): number => {
  let sum = 0
  for (const line of input) {
    console.log(line)

    const resultList: Result[] = []
    find_matches(line, resultList)
    resultList.sort((a, b) => a.index - b.index)
    const first = resultList[0].value
    const last = resultList[resultList.length - 1].value
    console.log(`First: ${first} Last: ${last} \t Sum: ${parseInt(first + last)}`)

    sum += parseInt(first + last)
    console.log("Sum: ", sum)
    console.log(resultList)
  }

  console.log("FINAL SUM: ", sum)
  return sum
}

const testInput: string[] = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"]
const testInput2: string[] = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
]
const testInput3: string[] = ["fivetwo562five"]

const file = Bun.file("./day-1/day1-input.txt")
const text = await file.text()
const input = text.split("\n")

if (run_day1_solution(testInput) !== 142) throw `${run_day1_solution(testInput)} is not 142`
if (run_day1_solution(testInput2) !== 281) throw `${run_day1_solution(testInput2)} is not 281`
if (run_day1_solution(testInput3) !== 55) throw `${run_day1_solution(testInput3)} is not 55`
run_day1_solution(input)
