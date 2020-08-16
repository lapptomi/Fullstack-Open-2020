import React from 'react'

const Person = ({person, handleDeletion}) => {
  const confirmDeletion = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      handleDeletion(person.id)
    }
  }

  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => confirmDeletion()}>
        delete
      </button>
    </p>
  )
}

export default Person