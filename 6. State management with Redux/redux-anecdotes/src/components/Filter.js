import React from 'react'

import {filterAnec} from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        console.log('filter event: ', event.target.value)
        props.store.dispatch(filterAnec(event.target.value))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter