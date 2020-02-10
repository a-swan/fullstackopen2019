import React from 'react'
import {connect} from 'react-redux'

import {filterAnec} from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        console.log('filter event: ', event.target.value)
        props.filterAnec(event.target.value)
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

// const mapStateToProps = (state) => {
//     console.log(state)

//     return{
//         anecdotes: state.anecdotes,
//         filter: state.filter
//     }
// }

const mapDispatchToProps = {
    filterAnec,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter