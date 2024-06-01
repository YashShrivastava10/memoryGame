import { useState } from "react"
import { getHtmlElement, shuffleGrid } from "./helper"

const initialGrid = [
  [2, 1, 4, 0],
  [4, 3, 5, 3],
  [1, 5, 2, 0]
]

const initialVisibleGrid = (value) => [
  [value, value, value, value],
  [value, value, value, value],
  [value, value, value, value]
]

export const useMemoryHook = () => {

  const [show, setShow] = useState(1)
  const [grid, setGrid] = useState(initialGrid)
  const [visibleGrid, setVisibleGrid] = useState(initialVisibleGrid(true))
  const [previousNumber, setPreviousNumber] = useState({ row: undefined, col: undefined })
  const [status, setStatus] = useState(false)

  const generateGrid = (grid) => {
    shuffleGrid(grid, setGrid)
    setTimeout(() => {
      const numbers = document.querySelectorAll(".number")
      for (let i = 0; i < numbers.length; i++) {
        numbers[i].classList.add("firstRotate")
      }
      setVisibleGrid(initialVisibleGrid(false))
    }, 1500)
  }

  const handleNotSameClicked = ({ newVisibleGrid, row, col, newPreviousNumber, elem1, elem2, card }) => {
    newVisibleGrid[row][col] = false;
    newVisibleGrid[newPreviousNumber.row][newPreviousNumber.col] = false;

    elem1.classList.remove("rotate")
    elem2.classList.remove("rotate")
    card.style.pointerEvents = "auto"

    newPreviousNumber.row = undefined
    newPreviousNumber.col = undefined

    setVisibleGrid(newVisibleGrid)
    setPreviousNumber(newPreviousNumber)
  }

  const hanldeSameClicked = ({ elem1, elem2, newPreviousNumber, card }) => {
    elem1.style.opacity = 0
    elem2.style.opacity = 0
    card.style.pointerEvents = "auto"

    newPreviousNumber.row = undefined
    newPreviousNumber.col = undefined

    setPreviousNumber(newPreviousNumber)
  }

  const showHide = (row, col) => {
    const elem = getHtmlElement(`${row}${col}`)
    elem.classList.add("rotate")

    let newVisibleGrid = [...visibleGrid]
    let newGrid = [...grid]

    newVisibleGrid[row][col] = true;

    let clickedNumber = newGrid[row][col]
    let newPreviousNumber = { ...previousNumber }

    // Check if user is making the first click
    if (newPreviousNumber.row !== undefined) {

      // If same card is clicked
      if (newPreviousNumber.row === row && newPreviousNumber.col === col) return

      const card = getHtmlElement("grid")
      card.style.pointerEvents = "none"
      const elem1 = getHtmlElement(`${row}${col}`)
      const elem2 = getHtmlElement(`${newPreviousNumber.row}${newPreviousNumber.col}`)

      const number = newGrid[newPreviousNumber.row][newPreviousNumber.col]

      // If clickedNumber is not equals to previousClickedNumber
      if (number !== clickedNumber) {
        setTimeout(() => {
          handleNotSameClicked({ newVisibleGrid, row, col, newPreviousNumber, elem1, elem2, card })
        }, 1000)
      }
      else {
        setTimeout(() => {
          hanldeSameClicked({ elem1, elem2, newPreviousNumber, card })
        }, 500)
      }

      setTimeout(() => {
        const allRevealed = newVisibleGrid.flat().every(status => status)
        if (allRevealed) {
          setStatus(true)
          setGrid([])
        }
      }, 500)
    }

    else {
      newPreviousNumber.row = row
      newPreviousNumber.col = col
      setPreviousNumber(newPreviousNumber)
    }
    
    setVisibleGrid(newVisibleGrid)
  }

  const reset = () => {
    setStatus(false)
    setVisibleGrid(initialVisibleGrid(true))
    generateGrid(initialGrid)
  }

  return { show, setShow, generateGrid, status, reset, grid, visibleGrid, showHide, setVisibleGrid }
}