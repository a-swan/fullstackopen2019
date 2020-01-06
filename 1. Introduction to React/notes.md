# Introduction to React

## React Components
- similar to JS functions which accept inputs (properties) and return React elements
- components are written in JSX and compiles into JS
- JSX requires closed brackets
```js
<br> --> <br/>
```

## Fragments
- lets you group child elements without adding extra nodes to DOM
- short syntax can wrap elements as a root element
```
<>
    <td>Hello</td>
    <td>World</td>
</>
```

## JS Variable Definitions
**const** - defines a constant where the value can't e changed

**let** - defines a normal variable

**var** - outdated definition

## Destructuring
```
props = {
    name: 'Alex,
    age: 28
}
```
becomes
```js
const name = props.name
const age = props.age

        OR

const {name, age} = props

        OR

const Hello = ({name, age}) => {
    //component body
    //...
}
```

## Stateful Components
```
const [counter, setCounter] = useState(0)
```
- Returns two variables ```counter``` and ```setCounter``` which assign the initial value of the state, and a function that will modify the state

- When the function ```setCounter``` is called, React *rerenders the component*

>It is forbidden in React to mutate the state directly.
>
>Changing states must be done by setting the state to a new object.
>
>Pause execution of the application at any line by putting ```debugger``` at that point.