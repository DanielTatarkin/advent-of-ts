interface GearsMap {
  [gear_loc: string]: Set<string>
}

const EMPTY_CELL = '.'
const GEAR = '*'

const isANumber = (cell: string) => !isNaN(parseInt(cell))

const run_day3_solution = (input: string[]): number => {
  let sumOfPartNumbers = 0

  const rows = input.length
  const cols = input[0].length
  const visited = new Set()
  const gearMap: GearsMap = {}

  function bfs(row: number, col: number): [boolean, string] {

    const toCheck = [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1], [0, -1], [0, 1]]
    const stack: [number[]] = [[row, col]]
    let runningNumber: string = input[row][col]
    let hasSymbol: boolean = false
    let gears = new Set<string>()
    let gear_row: number
    let gear_col: number

    while (stack.length) {
      const [row, col] = stack.pop()!

      for (let [r_row, c_col] of toCheck) {
        const rowToCheck = row + r_row
        const colToCheck = col + c_col

        if (
          (0 <= rowToCheck && rowToCheck < rows) &&
          (0 <= colToCheck && colToCheck < cols) &&
          (input[rowToCheck][colToCheck] !== EMPTY_CELL) &&
          (!visited.has(`${rowToCheck} ${colToCheck}`))
        ) {
          const cell = input[rowToCheck][colToCheck]
          if (isANumber(cell)) {
            stack.push([rowToCheck, colToCheck])
            visited.add(`${rowToCheck} ${colToCheck}`)
            runningNumber += cell
          } else {
            hasSymbol = true

            if (cell === GEAR) {
              gears.add(`${rowToCheck} ${colToCheck}`)
            }
          }
        }
      }
    }

    for (const gear of gears) {
      gearMap[gear] ? gearMap[gear].add(runningNumber) : gearMap[gear] = new Set([runningNumber])
    }

    return [hasSymbol, runningNumber]
  }

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const cell = input[row][col]
      if (!visited.has(`${row} ${col}`) && isANumber(cell)) {
        visited.add(`${row} ${col}`)
        const [hasSymbol, runningNumber] = bfs(row, col)
        if (hasSymbol) {
          sumOfPartNumbers += parseInt(runningNumber)
        }
      }
    }
  }

  console.log(`Sum of parts ${sumOfPartNumbers}`);

  let sumOfGearRatios = 0
  for (let partNumbers of Object.values(gearMap)) {
    if (partNumbers.size == 2) {
      let product = 1
      for (let partNumber of partNumbers) {
        product *= parseInt(partNumber)
      }
      sumOfGearRatios += product
    }
  }
  console.log(`Sum of gear ratios ${sumOfGearRatios}`);

  return sumOfPartNumbers
}

const testInput = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
]
if (run_day3_solution(testInput) !== 4361) throw `${run_day3_solution(testInput)} is not 4361`


const file = Bun.file("./day-3/day3-input.txt");
const text = await file.text();
const input = text.split('\n')
run_day3_solution(input)