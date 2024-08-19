import personService from '../services/persons'

const Persons = ({ personsToShow, setPersons }) => {

  const deletePerson = id => {
    const person = personsToShow.find(p => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)

    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`${person.name} was already removed from server`)
          setPersons(prevPersons => prevPersons.filter(p => p.id !== id))
          console.log(error)
        })
    }
  }

  return (
    <ul>
      {personsToShow.map(person => 
        <li key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </li>
      )}
    </ul>
  )
}

export default Persons
