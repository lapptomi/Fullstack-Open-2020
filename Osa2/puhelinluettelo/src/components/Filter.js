import React from 'react'

const Filter = ({nameFilter, handleChange}) => {
  return (
    <div>
      filter shown with
      <input value={nameFilter} onChange={handleChange} />
    </div>
  )
}

export default Filter