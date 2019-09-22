import React from 'react';
import Country from './Country';

const Countries = ({ countriesData, handleShow }) => {

    const listCountries = (countryData) => {
        if (countryData.length === 1) {
            return countryData.map(country => < Country key = { country.alpha2Code } country = { country } />)
        }
        else if (countryData.length > 0 && countryData.length < 11) {
            console.log('less 11: ', countryData)
            return countryData.map(country => <li key={country.alpha2Code}>{country.name} <button type="button" id={country.alpha2Code} onClick={handleShow}>show</button></li>)
        }
        else {
            console.log('Too many matches, specify another filter')
            return 'Too many matches, specify another filter'
        }

    }

    return (
        <div>
            {listCountries(countriesData)}
        </div>
    )
}

export default Countries