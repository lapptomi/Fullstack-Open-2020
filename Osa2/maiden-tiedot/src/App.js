import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountryFilter = ({countryFilter, handleInputChange}) => {
  return (
    <div>
      find countries:
      <input
        value={countryFilter}
        onChange={handleInputChange}
      />
    </div>
  )
}

const Country = ({country, showCountryInfo}) => {
  if (showCountryInfo) {
    return (
      <div>
        <h1>{country.name}</h1>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
        <h1>Languages</h1>
          <ul>
            {country.languages.map((language, i) => 
              <li key={i}>{language.name}</li>
            )}
          </ul>
        <img src={country.flag} width="200" alt=""></img>
      </div>
    )
  } else {
    return country.name
  }
}

const CountryList = ({countries, setCountryToShow}) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length === 1) {
    return <Country country={countries[0]} showCountryInfo={true} />
  }
  return (
    <div>
      {countries.map((country, i) => 
      <p key={i}>
        <Country country={country} />
        <button onClick={() => setCountryToShow(country)}>
          show
        </button>
      </p>
      )}
    </div>
  )
}

const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countryToShow, setCountryToShow] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleInputChange = (event) => {
    setCountryToShow([])
    setCountryFilter(event.target.value)
  }
  
  const countriesToShow = countries.filter(country => {
    return country.name.toLowerCase()
      .includes(countryFilter.toLowerCase())
  })

  const handleCountryToShow = (country) => {
    setCountryToShow(countryToShow.concat(country))
  }

  return (
    <div>
      <CountryFilter 
        countryFilter={countryFilter}
        handleInputChange={handleInputChange}
      />
      <CountryList 
        countries={countryToShow.length === 1 
          ? countryToShow 
          : countriesToShow
        } 
        setCountryToShow={handleCountryToShow}
      />
    </div>
  )
}

export default App
