import React from 'react'

const NumberCell = ({ rowIndex, colIndex, visibleGrid, showHide, number }) => {
  return(
    <div className='number' id={`${rowIndex}${colIndex}`}  onClick={() => showHide(rowIndex, colIndex)}>
    <span>{visibleGrid[rowIndex][colIndex] ? number : " "}</span>
  </div>
  )
}

export const Grid = ({ row, rowIndex, visibleGrid, showHide }) => {
  return (
    <div className='row' >
      {row.map((number, colIndex) =>
       <NumberCell 
        key={colIndex}
        colIndex={colIndex}
        rowIndex={rowIndex}
        visibleGrid={visibleGrid}
        showHide={showHide}
        number={number}/>
      )}
    </div>
  )
}
