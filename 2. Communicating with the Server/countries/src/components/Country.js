import React from 'react';

const Country = ({ country }) => {
    console.log("country: ", country)

    const listLang = () => country.languages.map(lang => <li key={lang.iso639_2}>{lang.name}</li>)

    return (
        <>
            <h1>{country.name}</h1>
            <p>
                capital {country.capital}<br />
                population {country.population}
            </p>

            <h2>Languages</h2>
            <ul>
                {listLang()}
            </ul>
            <img src={country.flag} alt="" width="280" />

            <h2>Weather in {country.capital}</h2>
        </>
    )
}

export default Country