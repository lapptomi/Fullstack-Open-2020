import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const nameNotUnique = persons.find(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    )

    if (nameNotUnique) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName, 
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const filteredPersons = persons.filter(person => {
   return person.name.toLowerCase().includes(nameFilter.toLowerCase())
  })

  return (
    <div>
      <h1>Phonebook</h1>
        <Filter 
          nameFilter={nameFilter} 
          handleChange={handleFilterChange} 
        />
      <h2>add a new</h2>
        <PersonForm 
          handleSubmit={handleFormSubmit}
          name={newName}
          number={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )

}

export default App
