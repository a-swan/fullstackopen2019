import React, { useState, useEffect } from 'react';
import Filter from './Filter'
import Countries from './Countries'
import axios from 'axios'

function App() {
    const [newFilter, setFilter] = useState('')
    const [countries, setCountries] = useState([])

    const handleFilter = (event) => {
        console.log(event.target.value)
        setFilter(event.target.value)

        console.log('test url:', `https://restcountries.eu/res/v2/name/${event.target.value}`)
        console.log('newFilter: ', newFilter)

        if (event.target.value.length > 0) {
            axios.get(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
                .then(response => {
                    console.log(response.data)
                    setCountries(response.data)
                })
        }
    }

    return (
        <div>
            <Filter newFilter={newFilter} handleFilter={handleFilter} />  

            <Countries countriesData={countries} />
        </div>
    )
}

export default App;
