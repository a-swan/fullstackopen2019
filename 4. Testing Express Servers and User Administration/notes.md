# Testing Express Servers and User Administration

## Router
A router is an isolated instance of middleware and routes. You can think of it as a "mini-application", capable of performing middleware and routing functions. Every Express app has a built in app router

```
├─ modules
|   └─ schema
├─ controller
|   └─ router
├─ utils
    ├─ global variable definitions
    └─ error handling
```

## Testing
```expect(result).toBe(5)``` - is a value comparator that will compare primitive values or referential identity

```expect(result).toEqual({test:5})``` - compares recursively all properties of object

```
npx jest -t 'test title'
```

## async/await
Makes it possible to use async functions that return a promise in a way that makes the code look synchronous

```.then()``` syntax registersa  callback function when the promise returns. To make several async calls in a row, you need sequential ```.then()``` functions to chain promises

async/await allows the above chain to be reduced to a few lines

```js
const main = async () => {
    const notes = await Note.find({})
    console.log(notes)

    const response = await notes[0].remove()
    console.log('first note removed')
}

main()
```

```await``` can only be used inside of an ```async``` function

## Document vs Relational Databases
Relational dbs generally store data in separate tables, and single objects may be stored across several tables. With relational dbs, data structures are very rigid and difficult to change.

##### Blog Table
<table>
    <tr>
        <th>id</th>
        <th>title</th>
        <th>author</th>
        <th>user</th>
        <th>url</th>
        <th>likes</th>
    </tr>
    <tr>
        <td>123</td>
        <td>Blog Title</td>
        <td>Fn LastName</td>
        <td>987</td>
        <td>www.link</td>
        <td>500</td>
    </tr>
</table>

##### User Table
<table>
    <tr>
        <th>id</th>
        <th>username</th>
        <th>name</th>
    </tr>
    <tr>
        <td>987</td>
        <td>f.lastname</td>
        <td>Fn LastName</td>
    </tr>
</table>

Document databases need to make multiple queries to join or aggregate data

Doc dbs also allow the flexibility to store references in **both** dbs