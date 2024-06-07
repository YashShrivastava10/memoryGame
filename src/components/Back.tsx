import React from 'react'
import { visibleGrid } from '../hooks/useMemoryGame'
import { initialVisibleGrid } from '../helper'

type setShowType = React.Dispatch<React.SetStateAction<number>>
type setVisibleGridType = React.Dispatch<React.SetStateAction<visibleGrid>>

type BackProps = {
  setShow: setShowType,
  setVisibleGrid: setVisibleGridType,
}

export const Back = ({ setShow, setVisibleGrid } : BackProps) => {
  return (
    <span className='btn' onClick={() => {
      setShow(1)
      setVisibleGrid(initialVisibleGrid(true))
    }}>Back</span>
  )
}
