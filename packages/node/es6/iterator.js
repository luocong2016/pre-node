// Iterator

function makeIterator(arr) {
  let nextIndex = 0

  return {
    [Symbol.iterator]() {
      return arr
    },
    next() {
      return nextIndex < arr.length ? { value: arr[nextIndex++] } : { done: true }
    },
    map(fn) {
      return arr.map(fn)
    },
    forEach(fn) {
      let item
      do {
        item = this.next()
        fn(item)
      } while (item?.done !== true && item !== undefined)
    },
    values() {
      return arr.values()
    },
    entries() {
      return arr.entries()
    },
  }
}

const it = makeIterator(["a", "b"])

it.forEach((value) => console.log(value))
console.log("map:", it)

for (let item of it.values()) {
  console.log(item)
}

for (let item of it.entries()) {
  console.log(item)
}

const obj = {
  a: 1,
  b: 2,
  c: 3,
}

function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]]
  }
}
for (let [key, value] of entries(obj)) {
  console.log(key, "->", value)
}
