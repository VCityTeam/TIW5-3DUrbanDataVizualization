# Conversion
Conversion des positions EPSG:3948 en EPSG:4326 et vice versa.

## Installation
```bash
    yarn
```
Dépendances:
- proj4
- testjs

## Usage
```js
    const {from3948to4326, from4326to3948} = require("./src/conversion.js");
    const nautilus3948 = [4.865913, 45.78213];
    const nautilus4326 = from3948to4326(nautilus3948);
    const nautilus3948_calculated = from4326to3948(nautilus4326);
```

## Tests
```bash
    node test/test.js
```