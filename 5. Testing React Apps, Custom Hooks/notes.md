# Testing React Apps, Custom Hooks

## Browser Local Storage
Local Storage is a key-value database in the browser
```js
window.localStorage.setItem('key','value')
window.localStorage.getItem('key')
window.localStorage.removeItem('key')
```

Values in storage are origin specific so each web app has its own storage.

Values are stored as DOMStrings so you cannot save a JS object and must be stringified with ```JSON.stringify``` and when read it must be parsed to JS with ```JSON.parse```

## props.children
Child components are the React elements that we define between opening and closing tags of a component.

Unlike "normal" props, children is automatically added by React. If there are no child components, the array is empty.

## References to components with ref
Accessing variables from outside the compoent can be done through ```ref``` mechanism. Typically you can only interact with components by re-rendering with new props. With ```ref``` you can modify outside of typical data flow.

## Custom Hooks
Building your own hooks lets you extract component logic into reusable functions.

Custom hooks must start with the word "use"