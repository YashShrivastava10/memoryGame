import { grid } from "./hooks/useMemoryGame"

type shuffledGridProps = {
  grid: grid,
  setGrid: React.Dispatch<React.SetStateAction<grid>>
}

export const initialGrid = [
  [2, 1, 4, 0],
  [4, 3, 5, 3],
  [1, 5, 2, 0]
]

export const initialVisibleGrid = (value: boolean) => [
  [value, value, value, value],
  [value, value, value, value],
  [value, value, value, value]
]

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const shuffleGrid = ({grid, setGrid} : shuffledGridProps) => {
  const flatGrid = grid.flat()
  shuffleArray(flatGrid)
  const shuffledGrid = [];
  for (let i = 0; i < grid.length; i++) {
    shuffledGrid.push(flatGrid.slice(i * grid[0].length, (i + 1) * grid[0].length));
  }
  setGrid(shuffledGrid)
}

export const getHtmlElement = (value: string) => document.getElementById(value)