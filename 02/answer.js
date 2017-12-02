const assert = require('assert')
const fs = require('fs')

const calc1 = (data) => {
  return data.reduce((sum, row) => 
    sum + Math.abs(Math.max(...row) - Math.min(...row))
  , 0)
}

data = [
  [5, 1, 9, 5],
  [7, 5, 3],
  [2, 4, 6, 8],
]
assert.equal(calc1(data), 18)

/* helper to get permutations */
const perm = (list) => {
  let rval = list.slice();
  rval[Symbol.iterator] = function* permGen () {
    for (let i=0; i < list.length; i++) {
      for (let j=0; j < list.length; j++) {
        yield [ list[i], list[j] ]
      }
    }
  }
  return rval
}

const calc2 = (data) => {
  return data.reduce((sum, row) => {
    for (let p of perm(row)) {
      if (p[0] !== p[1] && p[0] % p[1] === 0) {
        return sum + p[0] / p[1]
      }
    }
  }, 0)
}

data = [
  [5, 9, 2, 8],
  [9, 4, 7, 3],
  [3, 8, 6, 5],
]
assert.equal(calc2(data), 9)

data = fs.readFileSync('input').slice(0, -1).toString('utf8')
data = data.split('\n').map(row => row.split('\t'))

console.log(calc1(data))
console.log(calc2(data))
