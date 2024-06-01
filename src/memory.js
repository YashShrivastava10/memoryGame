import React, { useState } from 'react';
import "./memory.css"

export const Memory = () => {
  const [show, setShow] = useState(1)
  const [grid, setGrid] = useState([
    [2, 1, 4, 0],
    [4, 3, 5, 3],
    [1, 5, 2, 0]
  ])
  const [visibleGrid, setVisibleGrid] = useState([
    [true, true, true, true],
    [true, true, true, true],
    [true, true, true, true]
  ])
  const [previousNumber, setPreviousNumber] = useState({ row: undefined, col: undefined })
  const [status, setStatus] = useState(false)

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const shuffleGrid = (grid) => {
    const flatGrid = grid.flat()
    shuffleArray(flatGrid)
    const shuffledGrid = [];
    for (let i = 0; i < grid.length; i++) {
      shuffledGrid.push(flatGrid.slice(i * grid[0].length, (i + 1) * grid[0].length));
    }
    setGrid(shuffledGrid)
  }

  const generateGrid = (grid) => {
    shuffleGrid(grid)
    setTimeout(() => {
      const numbers = document.querySelectorAll(".number")
      for (let i = 0; i < numbers.length; i++) {
        numbers[i].classList.add("firstRotate")
      }
      setVisibleGrid([
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false]
      ])
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
    const grid = [
      [2, 1, 4, 0],
      [4, 3, 5, 3],
      [1, 5, 2, 0]
    ]
    const visibleGrid = [
      [true, true, true, true],
      [true, true, true, true],
      [true, true, true, true]
    ]
    setStatus(false)
    setVisibleGrid(visibleGrid)
    generateGrid(grid)
  }

  if (show === 1) {
    return (
      <div className='main'>
        <div className='howToPlay'>
          <h2>How To Play</h2>
          <div>
            <ol>
              <li>The game starts with all cards face down.</li>
              <li>For the first few seconds, all cards are briefly revealed, showing their numbers.</li>
              <li>After 0.7 seconds, the cards are turned face down again.</li>
              <li>You, as the player, start your turn and can click on two cards to reveal their numbers.</li>
              <li>If the two cards have matching numbers, you have made a successful match, and those two cards are removed from the grid.</li>
              <li>If the two cards do not match, they are turned face down again, and you continue your turn.</li>
              <li>Your goal is to match all pairs by using your memory.</li>
            </ol>
          </div>
          <span className="btn" onClick={() => {setShow(2); generateGrid(grid)}}>Play</span>
        </div>
      </div>
    )
  }

  else{
    return (
      <div className='main'>
        <div className='grid' id="grid">
          {status &&
            <div className='win'>
              <h1>You Win</h1>
              <span className="btn" onClick={reset}>Play Again</span>
            </div>
          }
          {grid.map((row, rowIndex) => {
            return (
              <div className='row' key={rowIndex}>
                {row.map((number, colIndex) => {
                  return (
                    <div className='number' id={`${rowIndex}${colIndex}`} key={colIndex} onClick={() => showHide(rowIndex, colIndex)}>
                      <span>{visibleGrid[rowIndex][colIndex] ? number : " "}</span>
                    </div>)
                })}
              </div>
            )
          })}
          {!status && 
          <span className='btn' onClick={() => {
            setShow(1)
            setVisibleGrid([
              [true, true, true, true],
              [true, true, true, true],
              [true, true, true, true]
            ])
          }}>Back</span>}
        </div>
      </div>
    );
  }
}