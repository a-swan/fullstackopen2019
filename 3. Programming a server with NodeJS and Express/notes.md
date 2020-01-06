# Programming a Server with NodeJS and Express

## NPM Scripts
Scripts in ```package.json``` can simplify compilation commands
>Windows Issue:
>PowerShell has an issue scripting unix commands (cp, rm) that are executed in command linke with VSCode

## REST ([RE]presentational [S]tate [T]ransfer)
An architectural style meant for building scalable web apps

Every resource in RESTful thinking has a unique address associated with it

>## Difference between ```==``` and ```===```
>```===``` takes variable type into consideration
>```==`` makes type correction
>```js
>0 == false //true
>0 === false // false
>2 == "2" //true
>2 === "2" //false
>```

## CORS ([C]ross-[O]rigin [R]esource [S]haring)
A mechanisim that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served

By default JS code that runs in a browser can only communicate with a server in the same origin. Two different ports are two different origins.