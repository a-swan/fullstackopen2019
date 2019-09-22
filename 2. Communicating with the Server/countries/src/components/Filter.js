import React from 'react'

const Filter = ({ newFilter, handleFilter }) => (
    <div>
        find country <input value={newFilter} onChange={handleFilter} />
    </div>
    
)

export default Filter;