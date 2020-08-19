import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationOperation, setNotificationOperation] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')


  useEffect(() => {
    personService.getAll()
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

  const showTempNotification = (operation, message) => {
    setNotificationOperation(operation)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationOperation(null)
      setNotificationMessage('')
    }, 3000)
  }
  

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const nameNotUnique = persons.find(person => 
      person.name.toLowerCase() === newName.toLowerCase())

    const personObject = {
      name: newName,
      number: newNumber
    }
    if (nameNotUnique) {
      const confirmUpdate = (
        window.confirm(`${newName} is already added to phonebook, `
        + 'replace the old number with a new one?')
      )
      if (confirmUpdate) {
        updatePerson()
      }
    } else {
      personService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          showTempNotification('addPerson', `Added ${personObject.name}`)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const updatePerson = () => {
    const personToUpdate = persons.find(p => 
      p.name.toLowerCase() === newName.toLowerCase())

    const updatedPerson = {
      name: personToUpdate.name,
      number: newNumber
    }
    personService
      .update(personToUpdate.id, updatedPerson)
      .then(() => {
        personService.getAll().then(response => {
          setPersons(response.data)
          setNewName('')
          setNewNumber('')
          showTempNotification('updatePerson', `Updated number of ${personToUpdate.name}`)
        })
      })
      .catch(error => {
        showTempNotification('error' ,`Person ${personToUpdate.name} has already been removed from server`)
        setPersons(persons.filter(p => p.id !== personToUpdate.id))
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        showTempNotification('deletePerson', `Deleted ${person.name}`)
      })
  }

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(nameFilter.toLowerCase())
  })


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        operation={notificationOperation}
        message={notificationMessage}
      />
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
      <Persons 
        filteredPersons={filteredPersons} 
        handleDeletion={deletePerson}
      />
    </div>
  )

}

export default App
