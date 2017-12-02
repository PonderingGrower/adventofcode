const assert = require('assert')
const fs = require('fs')

const calc1 = (seq, dist=1) => {
  if (typeof seq === 'string') {
    seq = seq.split('').map(Number)
  }
  let sum = 0, next;
  for (let i = 0; i < seq.length; i++) {
    next = i+dist
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

assert.equal(calc1('1122'), 3)
assert.equal(calc1('1111'), 4)
assert.equal(calc1('1234'), 0)
assert.equal(calc1('91212129'), 9)

/* arrow functions are just lovely */
const calc2 = (seq) => calc1(seq, seq.length/2)

assert.equal(calc2('1212'), 6)
assert.equal(calc2('1221'), 0)
assert.equal(calc2('123425'), 4)
assert.equal(calc2('123123'), 12)
assert.equal(calc2('12131415'), 4)

data = fs.readFileSync('input').slice(0, -1).toString()

console.log(calc1(data))
console.log(calc2(data))
