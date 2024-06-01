import React from 'react'
import { initialVisibleGrid } from '../helper'

export const Back = ({ setShow, setVisibleGrid }) => {
  return (
    <span className='btn' onClick={() => {
      setShow(1)
      setVisibleGrid(initialVisibleGrid(true))
    }}>Back</span>
  )
}
