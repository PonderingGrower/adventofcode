const assert = require('assert')
const fs = require('fs')

/* permutations can be big, so use a generator */
function* permGen () {
  for (let i in this) {
    for (let j in this) {
      yield [ this[i], this[j] ]
    }
  }
}

/* helper to get permutations */
const perm = (list) => {
  let rval = list.slice();
  rval[Symbol.iterator] = permGen
  return rval
}

/* instead of generators we could just use lambdas */
const altPerm = arr => arr.reduce(
  (rval, v) => rval.concat(arr.map(x => [v,x])), []
)

const calc = (data) => {
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
assert.equal(calc(data), 9)

data = fs.readFileSync('input').slice(0, -1).toString('utf8')
data = data.split('\n').map(row => row.split('\t'))

console.log(calc(data))
