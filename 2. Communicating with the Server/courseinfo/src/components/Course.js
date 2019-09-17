import React from 'react'

const Header = ({ course }) => <h1> {course.name} </h1>

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

const Content = ({ parts }) => {
    console.log('inside Content', parts)
    const listParts = () => parts.map(part => <Part key={part.id} part={part} />)
    const total = parts.reduce((totalEx, partIter) => {
        console.log('inside total', totalEx, partIter)
        return totalEx + partIter.exercises
    }, 0)

    return (
        <div>
            {listParts()}
            <strong>total of {total} exercises</strong>
        </div>
    )
}

const Course = ({ course }) => (
    <div>
        <Header course={course} />
        <Content parts={course.parts} />
    </div>
)

export default Course