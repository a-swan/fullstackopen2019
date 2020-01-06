# Communicating with the Server

## Map
Calls a provided callback function once for each element in an array and constructs the new results into an array

>React uses a key attribute to efficiently update components. Using unique keys it knows which to mutate and which to keep at original state

```js
const rows = () => notes.map(note => <li key={note.id}>{note.content}</li>)

//...

<ul>
    {rows()}
</ul>
```

When mapping components, the key value is set at component call

```js
const listCourses = () => courses.map(course => <Course key={course.id} course={course} />)

//...

<div>
    {listCourses()}
</div>
```

## Array.reduce()
```js
const totalExercises = courses.parts.reduce((totalExer,partIter) => {return totalExer + partIter.exercises}, 0)
```

### Array.reduce((```accumulator```, ```currentValue```), ```initValue```)

**accumulator** - aggregates callbacaks returns value

**currentValue** - current element being processed in the array

**initValue** - initial value of accumulator. If none provided index 0 is used to set accumulator, and is skipped

## Controlled Components
HTML form elements maintain their own state, and since React states are only updated with ```setState()```, you need to reroute HTML state changes to defer to React

```js
<input type="text" value={this.state.value} onChange={handleChange} />
```

## JavaScript Conditional Operator (?)
```
condition ? conditionTrue : conditionFalse
```

## Node Package Manager
```package.json``` file defines npm scripts for an application, dependencise of an app, and much more

```npm install ___ --save``` - installs library and adds it as a dependency
>may be redundant in newer npm versions

```npm update``` - updates dependencies in ```package.json```

```npm install``` - installs all dependencies

```npm install --save-dev ___``` - installs library as a development dependency. These libraries are not installed or used in production builds

## React Effect Hooks
Lets you perform side effects in functions components. For example loading data

```js
useEffect(()=>{
    axios.get('http:db.json')
        .then(response => {
            setState(response.data)
        })
},[])
```

## Promises
An Object representing the eventual completion or failure of an async operation

Promises have three distinct states
1) **pending** - final value is not available yet
2) **fulfilled** - operation has completed successfully
3) **rejected** - error prevented final value from being determined

---
### Filter Snipet
```js
const dataToFilter = showAll === '' ? data : data.filter(data => data.name.includes(showAll))
//toUpperCase
```