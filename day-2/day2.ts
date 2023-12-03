// Red Green Blue
// unknown number of cubes of each color
// figure out number of cubes
// 
// 1. random cubes will be shown a few times per game

// ONLY 12 red cubes, 13 green cubes, and 14 blue cubes
interface CubeCount {
  red: number,
  green: number,
  blue: number,
}


const isSetValid = (set: string, leastCubes: CubeCount) => {
  const colors = set.split(',')
  let isValid = true
  for (const color of colors) {
    console.log(color);

    let [numOfCubes, colorName] = color.trim().split(' ')
    const cubeCount = parseInt(numOfCubes)
    console.log(`numOfCubes: ${numOfCubes} colorName: ${colorName}`);
    if (
      (colorName === "red" && cubeCount > 12) ||
      (colorName === "green" && cubeCount > 13) ||
      (colorName === "blue" && cubeCount > 14)
    ) {
      isValid = false
    }

    if (colorName === "red") leastCubes.red = Math.max(leastCubes.red, cubeCount)
    if (colorName === "green") leastCubes.green = Math.max(leastCubes.green, cubeCount)
    if (colorName === "blue") leastCubes.blue = Math.max(leastCubes.blue, cubeCount)
  }
  return isValid
}

const isGameValid = (sets: string[], leastCubes: CubeCount) => {
  let isValid = true
  for (const set of sets) {
    console.log(set);
    if (!isSetValid(set, leastCubes)) {
      isValid = false
    }
  }
  return isValid
}


const run_day2_solution = (input: string[]) => {
  let sumOfValidGameIds = 0
  let sumOfPowerOfCubes = 0

  for (const game of input) {
    console.log(game);
    const [gameInfo, sets] = game.split(':')
    const gameId = parseInt(gameInfo.split(' ')[1])

    const leastCubes: CubeCount = {
      red: -1,
      green: -1,
      blue: -1,
    }

    if (isGameValid(sets.trim().split(';'), leastCubes)) {
      sumOfValidGameIds += gameId
    }
    sumOfPowerOfCubes += leastCubes.red * leastCubes.green * leastCubes.blue
  }
  console.log(`Sum of valid games: ${sumOfValidGameIds}`);
  console.log(`Sum of power of cubes: ${sumOfPowerOfCubes}`);
  return sumOfValidGameIds
}


const testInput = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
]
if (run_day2_solution(testInput) !== 8) throw `${run_day2_solution(testInput)} is not 8`


const testInput2 = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 13 red, 2 green",
]
if (run_day2_solution(testInput2) !== 3) throw `${run_day2_solution(testInput2)} is not 3`

const file = Bun.file("./day-2/day2-input.txt");
const text = await file.text();
const input = text.split('\n')
run_day2_solution(input)


const testInput3 = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
]
run_day2_solution(testInput3)