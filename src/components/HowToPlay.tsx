import { initialGrid } from "../helper";
import { grid } from "../hooks/useMemoryGame";

type HowToPlayProps = {
  setShow: React.Dispatch<React.SetStateAction<number>>,
  generateGrid: (grid: grid) => void
}
export const HowToPlay = ({ setShow, generateGrid }: HowToPlayProps) => {
  return (
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
      <span className="btn" onClick={() => { setShow(2); generateGrid(initialGrid) }}>Play</span>
    </div>
  )
}
