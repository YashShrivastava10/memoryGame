import { useState } from "react"
import { getHtmlElement, initialGrid, initialVisibleGrid, shuffleGrid } from "../helper"

export type show = number
export type grid = number[][]
export type visibleGrid = boolean[][]
export type previousNumber = { row: number | undefined, col: number | undefined }

type handleNotSameClickedType = ({ 
  newVisibleGrid, 
  row, 
  col, 
  newPreviousNumber, 
  elem1, 
  elem2, 
  card 
}: { 
  newVisibleGrid: visibleGrid; 
  row: number; 
  col: number; 
  newPreviousNumber: previousNumber; 
  elem1: HTMLElement; 
  elem2: HTMLElement; 
  card: HTMLElement 
}) => void;

type handleSameClickedType = ({ 
  elem1,
  elem2,
  newPreviousNumber,
  card
}: {  
  elem1: HTMLElement; 
  elem2: HTMLElement;
  newPreviousNumber: previousNumber;
  card: HTMLElement 
}) => void;

export const useMemoryGame = () => {

  const [show, setShow] = useState<show>(1)
  const [grid, setGrid] = useState<grid>(initialGrid)
  const [visibleGrid, setVisibleGrid] = useState<visibleGrid>(initialVisibleGrid(true))
  const [previousNumber, setPreviousNumber] = useState<previousNumber>({ row: undefined, col: undefined })

  const generateGrid = (grid: grid) => {
    shuffleGrid({grid, setGrid})
    setTimeout(() => {
      const numbers = document.querySelectorAll(".number")
      for (let i = 0; i < numbers.length; i++) {
        numbers[i].classList.add("firstRotate")
      }
      setVisibleGrid(initialVisibleGrid(false))
    }, 1500)
  }

  const handleNotSameClicked: handleNotSameClickedType = ({ newVisibleGrid, row, col, newPreviousNumber, elem1, elem2, card }) => {
    newVisibleGrid[row][col] = false;
    newVisibleGrid[newPreviousNumber.row!][newPreviousNumber.col!] = false;

    elem1.classList.remove("rotate")
    elem2.classList.remove("rotate")
    card.style.pointerEvents = "auto"

    newPreviousNumber.row = undefined
    newPreviousNumber.col = undefined

    setVisibleGrid(newVisibleGrid)
    setPreviousNumber(newPreviousNumber)
  }

  const hanldeSameClicked: handleSameClickedType = ({ elem1, elem2, newPreviousNumber, card }) => {
    elem1.style.opacity = "0"
    elem2.style.opacity = "0"
    card.style.pointerEvents = "auto"

    newPreviousNumber.row = undefined
    newPreviousNumber.col = undefined

    setPreviousNumber(newPreviousNumber)
  }

  const showHide = ({row, col} : previousNumber) => {
    const elem = getHtmlElement(`${row}${col}`)

    if(!elem) return

    elem.classList.add("rotate")

    let newVisibleGrid = [...visibleGrid]
    let newGrid = [...grid]

    if(row === undefined || col === undefined) return

    newVisibleGrid[row][col] = true;

    let clickedNumber = newGrid[row][col]
    let newPreviousNumber = { ...previousNumber }

    // Check if user is making the first click
    if (newPreviousNumber.row !== undefined && newPreviousNumber.col !== undefined) {

      // If same card is clicked
      if (newPreviousNumber.row === row && newPreviousNumber.col === col) return

      const card = getHtmlElement("grid")!
      card.style.pointerEvents = "none"
      const elem1 = getHtmlElement(`${row}${col}`)!
      const elem2 = getHtmlElement(`${newPreviousNumber.row}${newPreviousNumber.col}`)!

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
          setShow(3)
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
    setShow(2)
    setVisibleGrid(initialVisibleGrid(true))
    generateGrid(initialGrid)
  }

  return { show, setShow, generateGrid, reset, grid, visibleGrid, showHide, setVisibleGrid }
}