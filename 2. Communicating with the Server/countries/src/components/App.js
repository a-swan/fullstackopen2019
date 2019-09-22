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

    /** const getWeather = () => {
        axios.get(`http://api.weatherstack.com/current?access_key=d567b3c04e36b2866f0372601712f674&query=${country.capital}`)
            .then(response => {
                console.log("weather: ", response)
                //return <Weather temp={response.data.current.temperature} icon={response.data.current.weather_icons[0]} wind_speed={response.data.current.wind_speed} wind_direct={response.data.current.wind_dir} />
            })
    }**/

    return (
        <div>
            <Filter newFilter={newFilter} handleFilter={handleFilter} />  

            <Countries countriesData={countries} handleShow={handleShow} />
        </div>
    )
}

export default App;
