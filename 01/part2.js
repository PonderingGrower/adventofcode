const assert = require('assert')
const fs = require('fs')
const calc1 = require('./part1')

/* arrow functions are just lovely */
const calc = (seq) => calc1(seq, seq.length/2)

assert.equal(calc('1212'), 6)
assert.equal(calc('1221'), 0)
assert.equal(calc('123425'), 4)
assert.equal(calc('123123'), 12)
assert.equal(calc('12131415'), 4)

data = fs.readFileSync('input').slice(0, -1).toString()

console.log(calc(data))
