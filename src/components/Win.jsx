export const Win = ({ reset }) => {
  return (
    <div className='win'>
      <h1>You Win</h1>
      <span className="btn" onClick={reset}>Play Again</span>
    </div>
  )
}
