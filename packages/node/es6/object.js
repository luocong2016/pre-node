const obj = {
  a: 1,
  b: 2,
  [Symbol.iterator]() {
    let index = 0
    const keys = Object.keys(this)

    return {
      next() {
        if (index < keys.length) {
          return {
            done: false,
            value: obj[keys[index++]],
          }
        }
        return { done: true, value: undefined }
      },
    }
  },
}

console.log(obj)

const [a, b] = obj
console.log(a, b)

/* 闭包 */
