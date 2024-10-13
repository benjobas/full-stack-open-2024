import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] =useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.find(person => person.name === newName)

    if (nameExists) { 
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (confirmUpdate) {
        const updatedPerson = {...nameExists, number: newNumber }
        personService
          .update(nameExists.id, updatedPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(person => person.id !== nameExists.id ? person : {...returnedPerson, number: newNumber}))
            console.log(newNumber)
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${newName} successfully`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch((error) => {
            console.log(error);
            setNewName('')
            setNewNumber('')
            setMessage(`Error: ${error.response.data.error}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const newPerson= {
        name: newName, number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName} successfully`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        }).catch(error => {
          console.log(error)
          setNewName('')
          setNewNumber('')
          setMessage(`Error: ${error.response.data.error}`)
          setTimeout(() => {
            setMessage(null)
          }, 6000)
        })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <Persons 
        personsToShow={personsToShow} 
        setPersons={setPersons} 
      />
    </div>
  )
}

export default App
