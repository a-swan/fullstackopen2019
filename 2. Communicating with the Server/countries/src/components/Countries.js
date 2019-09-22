import React from 'react'
import Country from './Country'

const Countries = ({ countriesData }) => {

    const handleShow = (event) => {
        console.log("target ID", event.target.id)
        return < Country key={countriesData[event.target.id].alpha2Code} country={countriesData[event.target.id]} />
    }

    const listCountries = () => {
        if (countriesData.length === 1) {
            return countriesData.map(country => < Country key = { country.alpha2Code } country = { country } />)
        }
        else if (countriesData.length > 0 && countriesData.length < 11) {
            console.log('less 11: ', countriesData)
            return countriesData.map(country => <li key={country.alpha2Code}>{country.name} <button type="button" id={countriesData.indexOf(country)} onClick={handleShow}>show</button></li>)
        }
        else {
            console.log('Too many matches, specify another filter')
            return 'Too many matches, specify another filter'
        }

    }

    return (
        <div>
            {listCountries()}
        </div>
    )
}

export default Countries