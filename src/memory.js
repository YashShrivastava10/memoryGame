import "./memory.css"
import { useMemoryHook } from './useMemory';

export const Memory = () => {
  
  const { show, setShow, generateGrid, status, reset, grid, visibleGrid, showHide, setVisibleGrid } = useMemoryHook()

  if (show === 1) {
    return (
      <div className='main'>
        <div className='howToPlay'>
          <h2>How To Play</h2>
          <div>
            <ol>
              <li>The game starts with all cards face down.</li>
              <li>For the first few seconds, all cards are briefly revealed, showing their numbers.</li>
              <li>After few seconds, the cards are turned face down again.</li>
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