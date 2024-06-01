const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const shuffleGrid = (grid, setGrid) => {
  const flatGrid = grid.flat()
  shuffleArray(flatGrid)
  const shuffledGrid = [];
  for (let i = 0; i < grid.length; i++) {
    shuffledGrid.push(flatGrid.slice(i * grid[0].length, (i + 1) * grid[0].length));
  }
  setGrid(shuffledGrid)
}

export const getHtmlElement = (value) => document.getElementById(value)