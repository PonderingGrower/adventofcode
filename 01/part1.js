const assert = require('assert')
const fs = require('fs')

const calc = (seq, dist=1) => {
  if (typeof seq === 'string') {
    seq = seq.split('').map(Number)
  }
  let sum = 0, next;
  for (let i in seq) {
    next = Number(i)+dist
    /* we gotta' loop around if we hit the end */
    if (seq[next] === undefined) {
      next -= seq.length
    }
    if (seq[i] == seq[next]) {
      sum += seq[i]
    }
  }
  return sum
}

assert.equal(calc('1122'), 3)
assert.equal(calc('1111'), 4)
assert.equal(calc('1234'), 0)
assert.equal(calc('91212129'), 9)

/* arrow functions are just lovely */
const calc2 = (seq) => calc(seq, seq.length/2)

data = fs.readFileSync('input').slice(0, -1).toString()

console.log(calc(data))

module.exports = calc
