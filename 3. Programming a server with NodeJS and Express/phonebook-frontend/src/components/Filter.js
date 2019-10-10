import React from 'react'

const Filter = ({ filterValue, handleFilter }) => {
    return(
        <div>
            filter: <input value={filterValue} onChange={handleFilter} />
        </div>
    )
}

export default Filter