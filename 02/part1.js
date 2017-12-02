const assert = require('assert')
const fs = require('fs')

const calc = (data) => {
  return data.reduce((sum, row) => 
    sum + Math.abs(Math.max(...row) - Math.min(...row))
  , 0)
}

data = [
  [5, 1, 9, 5],
  [7, 5, 3],
  [2, 4, 6, 8],
]
assert.equal(calc(data), 18)

data = fs.readFileSync('input').slice(0, -1).toString('utf8')
data = data.split('\n').map(row => row.split('\t'))

console.log(calc(data))
