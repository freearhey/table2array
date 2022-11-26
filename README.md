# table2array

Node.js utility to convert HTML table to Javascript array.

## Installation

```sh
npm install table2array
```

## Usage

```js
import table2array from 'table2array'

const table = `<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Chester</td>
      <td>41</td>
    </tr>
    <tr>
      <td>Steve</td>
      <td>56</td>
    </tr>
  </tbody>
</table>`

const array = table2array(playlist)

console.log(array)
```

Output:

```json
[
  ["Name", "Age"],
  ["Chester", "41"],
  ["Steve", "56"]
]
```

## Examples

### Table with rowspan

<table border="1">
  <thead>
    <tr>
      <th>Parent</th>
      <th>Child</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">Marry</td>
      <td>Sue</td>
    </tr>
    <tr>
      <td>Steve</td>
    </tr>
    <tr>
      <td>Tom</td>
    </tr>
  </tbody>
</table>

```json
[
  ["Parent", "Child"],
  ["Marry", "Sue"],
  ["Marry", "Steve"],
  ["Marry", "Tom"]
]
```

### Table with colspan

<table>
  <thead>
    <tr>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
      <th>Saturday</th>
      <th>Sunday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="5">8:00 - 17:00</td>
      <td>10:00 - 13:00</td>
      <td>Closed</td>
    </tr>
  </tbody>
</table>

```json
[
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  [
    "8:00 - 17:00",
    "8:00 - 17:00",
    "8:00 - 17:00",
    "8:00 - 17:00",
    "8:00 - 17:00",
    "10:00 - 13:00",
    "Closed"
  ]
]
```

### Complex table

<table>
  <thead>
    <tr>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
      <th>Saturday</th>
      <th>Sunday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="4">Superlift Off-Road Adventures</td>
      <td rowspan="2" colspan="2">The American Car Prospector</td>
      <td>Formula One Drift</td>
    </tr>
    <tr>
      <td>Lund International Truck and Jeep Show</td>
      <td>Hooked On Dirt</td>
      <td colspan="2">Car Files</td>
      <td>World of Trucks</td>
    </tr>
  </tbody>
</table>

```json
[
  ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  [
    "Superlift Off-Road Adventures",
    "Superlift Off-Road Adventures",
    "Superlift Off-Road Adventures",
    "Superlift Off-Road Adventures",
    "The American Car Prospector",
    "The American Car Prospector",
    "Formula One Drift"
  ],
  [
    "Lund International Truck and Jeep Show",
    "Hooked On Dirt",
    "Car Files",
    "Car Files",
    "The American Car Prospector",
    "The American Car Prospector",
    "World of Trucks"
  ]
]
```

## Testing

```sh
npm test
```

## Contribution

If you find a bug or want to contribute to the code or documentation, you can help by submitting an [issue](https://github.com/freearhey/table2array/issues) or a [pull request](https://github.com/freearhey/table2array/pulls).

## License

[MIT](LICENSE)
