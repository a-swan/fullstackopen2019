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