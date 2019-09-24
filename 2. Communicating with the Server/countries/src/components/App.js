import React, { useState } from 'react';
import Filter from './Filter';
import Countries from './Countries';
import axios from 'axios';

function App() {
    const [newFilter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    const handleFilter = (event) => {
        console.log(event.target.value)
        setFilter(event.target.value)

        console.log('url:', `https://restcountries.eu/res/v2/name/${event.target.value}`)

        if (event.target.value.length > 0) {
            axios.get(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
                .then(response => {
                    console.log(response.data)
                    setCountries(response.data)
                })
        }
    }

    const handleShow = (event) => {
        console.log(event.target.value)

        setFilter(countries.filter(country => country.alpha2Code === event.target.id)[0].name)
        setCountries(countries.filter(country => country.alpha2Code === event.target.id))
    }

    return (
        <div>
            <Filter newFilter={newFilter} handleFilter={handleFilter} />  

            <Countries countriesData={countries} handleShow={handleShow} />
        </div>
    )
}

export default App;
