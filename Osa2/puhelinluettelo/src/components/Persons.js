import React from 'react'
import Person from './Person'

const Persons = ({filteredPersons}) => {
  return (
    <>
    {filteredPersons.map((person, i) => 
      <Person person={person} key={i} />
    )}
    </>
  )
}

export default Persons