type WinProps = {
  reset: () => void
}

export const Win = ({ reset } : WinProps) => {
  return (
    <div className='win'>
      <h1>You Win</h1>
      <span className="btn" onClick={reset}>Play Again</span>
    </div>
  )
}
