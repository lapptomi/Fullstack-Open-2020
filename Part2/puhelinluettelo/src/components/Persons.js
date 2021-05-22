import React from 'react'
import Person from './Person'

const Persons = ({filteredPersons, handleDeletion}) => {
  return (
    <>
    {filteredPersons.map((person, i) => 
      <Person 
        person={person} 
        handleDeletion={handleDeletion}
        key={i}
      />
    )}
    </>
  )
}

export default Persons