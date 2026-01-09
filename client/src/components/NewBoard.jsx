import React from 'react'
import { useParams } from 'react-router-dom'

const NewBoard = () => {

  const boardId = useParams()

  return (
    <div>NewBoard</div>
  )
}

export default NewBoard