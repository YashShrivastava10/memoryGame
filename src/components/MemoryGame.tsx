import "../memory.css"
import { useMemoryGame } from "../hooks/useMemoryGame";
import { Win } from "./Win";
import { Back } from "./Back";
import { HowToPlay } from "./HowToPlay";
import { Grid } from "./Grid";

export const MemoryGame = () => {

  const { show, setShow, generateGrid, reset, grid, visibleGrid, showHide, setVisibleGrid } = useMemoryGame()

  return (
    <div className="main">
      {show === 1 ?
        <HowToPlay setShow={setShow} generateGrid={generateGrid} /> :
        <div className='grid' id="grid">
          {show === 2 ?
            <>
              {grid.map((row, rowIndex) =>
                <Grid key={rowIndex} row={row} rowIndex={rowIndex} visibleGrid={visibleGrid} showHide={showHide}/>
              )}
              <Back setShow={setShow} setVisibleGrid={setVisibleGrid} />
            </> :
            <Win reset={reset} />
          }
        </div>
      }
    </div>
  )
}