import { visibleGrid, previousNumber } from '../hooks/useMemoryGame'

type GridProps = {
  row: number[],
  rowIndex: number,
  visibleGrid: visibleGrid,
  showHide: ({ row, col }: previousNumber) => void
}

type NumberCellProps = {
  rowIndex: number,
  colIndex: number,
  visibleGrid: visibleGrid,
  showHide: ({ row, col}: previousNumber) => void,
  number: number
}

const NumberCell = ({ rowIndex, colIndex, visibleGrid, showHide, number } : NumberCellProps) => {
  return(
    <div className='number' id={`${rowIndex}${colIndex}`}  onClick={() => showHide({row: rowIndex, col: colIndex})}>
    <span>{visibleGrid[rowIndex][colIndex] ? number : " "}</span>
  </div>
  )
}

export const Grid = ({ row, rowIndex, visibleGrid, showHide }: GridProps) => {
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
