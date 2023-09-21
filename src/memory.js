import React, { Component } from 'react';
import "./memory.css"

class Memory extends Component {
  state = {
    grid: [
      [2, 1, 4, 0],
      [4, 3, 5, 3],
      [1, 5, 2, 0]
    ],
    visibleGrid: [
      [false,false, false, false],
      [false,false, false, false],
      [false,false, false, false]
    ],
    previousNumber: {row: undefined, col: undefined}
  }

  showHide = (row, col) => {
    let visibleGrid = [...this.state.visibleGrid]
    let grid = [...this.state.grid]
    visibleGrid[row][col] = true;

    let clickedNumber = grid[row][col]
    let previousNumber = this.state.previousNumber

    if(previousNumber.row !== undefined){
      const number = grid[previousNumber.row][previousNumber.col]
      if(number !== clickedNumber){
        setTimeout(() => {
          visibleGrid[row][col] = false;
          visibleGrid[previousNumber.row][previousNumber.col] = false;
          this.setState({visibleGrid})
          previousNumber.row = undefined
          previousNumber.col = undefined
          this.setState({previousNumber})
        }, 1000)
      }
      else{
        previousNumber.row = undefined
        previousNumber.col = undefined
        this.setState({previousNumber})
      }
      setTimeout(() => {
        const status = visibleGrid.flat().every(status => status)
        if(status)
          alert("YOU WIN")
      })
    }
    else{
      previousNumber.row = row
      previousNumber.col = col
      this.setState({previousNumber})
    }
    this.setState({visibleGrid})
  }

  render() {
    return (
      <div className='main'>
        <div className='grid'>
          {this.state.grid.map((row, rowIndex) => {
            return (
              <div className='row' key={rowIndex}>
                {row.map((number, colIndex) => {
                  return (
                  <div className='number' key={colIndex} onClick={() => this.showHide(rowIndex, colIndex)}>
                    {this.state.visibleGrid[rowIndex][colIndex] ? number : " "}
                  </div>)
                })}
              </div>)
          })}
        </div>
      </div>
    );
  }
}

export default Memory;