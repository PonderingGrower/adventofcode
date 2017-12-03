const assert = require('assert')

Number.prototype.between = function(a, b, inclusive=true) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return inclusive ? this >= min && this <= max : this > min && this < max
};

let range = (s, n) => [...Array(n+1).keys()].slice(s)
/**
 * Layer, Side, Numbers, Highest Number
 * L   S   N    L   H
 * 1 > 1 > 1  > 1 > 1
 * 2 > 3 > 8  > 2 > 9
 * 3 > 5 > 16 > 10 > 25
 * 4 > 7 > 24 > 26 > 49
 */
const f = sideSizeInLayer = (l) => l <= 1 ? l : f(l-1)+2
const layerFromSideSize   = (l) => l <= 1 ? l : Math.ceil(l/2)
const numbersInLayer      = (l) => l <= 1 ? l : (l-1)*8
const highestAddrInLayer  = (l) => f(l)*f(l)
const lowestAddrInLayer   = (l) => highestAddrInLayer(l-1)+1
const sideSizeFromAddr    = (a) => Math.ceil(Math.pow(a, 1/2)) + 0.0001 /* HACK */
const layerFromAddr       = (a) => layerFromSideSize(sideSizeFromAddr(a))

const calc = (addr) => {
  let layer= layerFromAddr(addr)
  let highest = highestAddrInLayer(layer)
  let lowest = lowestAddrInLayer(layer)
  let sideSize = sideSizeInLayer(layer)
  let halfSide = Math.floor(sideSize / 2)
  /* There are 8 sections with the same distances in each layer.
   * By knowing the side size we can estimate where in the corner
   * of a layer our address is, and that will give us the distance. */
  let min = highest - halfSide, max = highest, flip = true
  while (min >= lowest) {
    if (addr.between(min, max)) {
      return Math.abs(addr - min) + (layer-1)
    } else {
      if (flip) {
        max = max - (sideSize-1)
      }  else {
        min = min - (sideSize-1)
      }
      flip = !flip
    }
  }
}

assert.equal(calc(1), 0)
assert.equal(calc(12), 3)
assert.equal(calc(13), 4)
assert.equal(calc(23), 2)
assert.equal(calc(25), 4)
assert.equal(calc(1024), 31)

console.log(calc(368078))
