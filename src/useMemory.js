import { useState } from "react"
import { shuffleGrid } from "./helper"

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

  const showHide = (row, col) => {
    const elem = document.getElementById(`${row}${col}`)
    elem.classList.add("rotate")
    let newVisibleGrid = [...visibleGrid]
    let newGrid = [...grid]
    newVisibleGrid[row][col] = true;

    let clickedNumber = newGrid[row][col]
    let newPreviousNumber = { ...previousNumber }

    if (newPreviousNumber.row !== undefined) {
      if (newPreviousNumber.row === row && newPreviousNumber.col === col) return
      const card = document.getElementById("grid")
      card.style.pointerEvents = "none"
      const number = newGrid[newPreviousNumber.row][newPreviousNumber.col]
      if (number !== clickedNumber) {
        setTimeout(() => {
          newVisibleGrid[row][col] = false;
          newVisibleGrid[newPreviousNumber.row][newPreviousNumber.col] = false;
          const elem1 = document.getElementById(`${row}${col}`)
          const elem2 = document.getElementById(`${newPreviousNumber.row}${newPreviousNumber.col}`)
          elem1.classList.remove("rotate")
          elem2.classList.remove("rotate")
          card.style.pointerEvents = "auto"
          newPreviousNumber.row = undefined
          newPreviousNumber.col = undefined
          setVisibleGrid(newVisibleGrid)
          setPreviousNumber(newPreviousNumber)
        }, 1000)
      }
      else {
        setTimeout(() => {
          const elem1 = document.getElementById(`${row}${col}`)
          const elem2 = document.getElementById(`${newPreviousNumber.row}${newPreviousNumber.col}`)
          elem1.style.opacity = 0
          elem2.style.opacity = 0
          newPreviousNumber.row = undefined
          newPreviousNumber.col = undefined
          card.style.pointerEvents = "auto"
          setPreviousNumber(newPreviousNumber)
        }, 500)
      }
      setTimeout(() => {
        const status = newVisibleGrid.flat().every(status => status)
        if (status) {
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