import React, { Component } from 'react';
import "./memory.css"

class Memory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: 1,
      grid: [
        [2, 1, 4, 0],
        [4, 3, 5, 3],
        [1, 5, 2, 0]
      ],
      visibleGrid: [
        [true, true, true, true],
        [true, true, true, true],
        [true, true, true, true]
      ],
      previousNumber: { row: undefined, col: undefined },
      status: false,
    }
  }

  generateGrid = (grid) => {
    this.shuffleGrid(grid)
    setTimeout(() => {
      const numbers = document.querySelectorAll(".number")
      for (let i = 0; i < numbers.length; i++) {
        numbers[i].classList.add("firstRotate")
      }
      this.setState({
        visibleGrid: [
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false]
        ]
      })
    }, 1500)
  }

  shuffleGrid = (grid) => {
    const flatGrid = grid.flat()
    this.shuffleArray(flatGrid)
    const shuffledGrid = [];
    for (let i = 0; i < grid.length; i++) {
      shuffledGrid.push(flatGrid.slice(i * grid[0].length, (i + 1) * grid[0].length));
    }
    this.setState({ grid: shuffledGrid })
  }

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  showHide = (row, col) => {
    const elem = document.getElementById(`${row}${col}`)
    elem.classList.add("rotate")
    let visibleGrid = [...this.state.visibleGrid]
    let grid = [...this.state.grid]
    visibleGrid[row][col] = true;

    let clickedNumber = grid[row][col]
    let previousNumber = this.state.previousNumber

    if (previousNumber.row !== undefined) {
      if (previousNumber.row === row && previousNumber.col === col) return
      const card = document.getElementById("grid")
      card.style.pointerEvents = "none"
      const number = grid[previousNumber.row][previousNumber.col]
      if (number !== clickedNumber) {
        setTimeout(() => {
          visibleGrid[row][col] = false;
          visibleGrid[previousNumber.row][previousNumber.col] = false;
          const elem1 = document.getElementById(`${row}${col}`)
          const elem2 = document.getElementById(`${previousNumber.row}${previousNumber.col}`)
          elem1.classList.remove("rotate")
          elem2.classList.remove("rotate")
          card.style.pointerEvents = "auto"
          previousNumber.row = undefined
          previousNumber.col = undefined
          this.setState({ visibleGrid, previousNumber })
        }, 1000)
      }
      else {
        setTimeout(() => {
          const elem1 = document.getElementById(`${row}${col}`)
          const elem2 = document.getElementById(`${previousNumber.row}${previousNumber.col}`)
          elem1.style.opacity = 0
          elem2.style.opacity = 0
          previousNumber.row = undefined
          previousNumber.col = undefined
          card.style.pointerEvents = "auto"
          this.setState({ previousNumber })
        }, 500)
      }
      setTimeout(() => {
        const status = visibleGrid.flat().every(status => status)
        if (status) {
          this.setState({ status: true, grid: [] })
        }
      }, 500)
    }
    else {
      previousNumber.row = row
      previousNumber.col = col
      this.setState({ previousNumber })
    }
    this.setState({ visibleGrid })
  }

  reset = () => {
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
    this.setState({ visibleGrid, status: false }, () => this.generateGrid(grid))
  }

  render() {
    if (this.state.show === 1) {
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
            <span className="btn" onClick={() => this.setState({ show: 2 }, () => this.generateGrid(this.state.grid))}>Play</span>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='main'>
          <div className='grid' id="grid">
            {this.state.status &&
              <div className='win'>
                <h1>You Win</h1>
                <span className="btn" onClick={this.reset}>Play Again</span>
              </div>
            }
            {this.state.grid.map((row, rowIndex) => {
              return (
                <div className='row' key={rowIndex}>
                  {row.map((number, colIndex) => {
                    return (
                      <div className='number' id={`${rowIndex}${colIndex}`} key={colIndex} onClick={() => this.showHide(rowIndex, colIndex)}>
                        <span>{this.state.visibleGrid[rowIndex][colIndex] ? number : " "}</span>
                      </div>)
                  })}
                </div>
              )
            })}
            {!this.state.status && 
            <span className='btn' onClick={() => {
              this.setState({
                show: 1,
                visibleGrid: [
                  [true, true, true, true],
                  [true, true, true, true],
                  [true, true, true, true]
                ]
              })
            }}>Back</span>}
          </div>
        </div>
      );
    }
  }
}

export default Memory;
