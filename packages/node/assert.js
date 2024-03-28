import assert from "node:assert"

const list1 = [1, 2, 3, 4, 5]
const list2 = [1, 2, 3, 4, 6]

const person1 = { name: "john", age: 18 }
const person2 = { name: "john", age: "18" }

function add(a, b) {
  return a + b
}

/* assert | assert.ok */
/* function assert(value: unknown, message?: string | Error | undefined): asserts value */
/* function assert.ok(value: unknown, message?: string | Error | undefined): asserts value */
// @demo
// assert(add(1, 2) === 4, "实际值不等于预期值报错")
// assert.ok(add(1, 2) === 4, "实际值不等于预期值报错")

/* assert.strictEqual */
/* function assert.strictEqual<T>(actual: unknown, expected: T, message?: string | Error | undefined): asserts actual is T */
// demo
// assert.strictEqual(1, "1", "严格相等")

/* assert.equal */
/* function assert.equal(actual: unknown, expected: unknown, message?: string | Error | undefined): void */
// @demo
// assert.equal(1, "1", "实际值不等于预期值报错")
// assert.equal(add(1, 2), 4, "实际值不等于预期值报错")

/* assert.notStrictEqual */
/* function assert.notStrictEqual(actual: unknown, expected: unknown, message?: string | Error | undefined): void */
// @demo
// assert.notStrictEqual(add(1, 2), 3, "实际值等于预期值报错")

/* assert.notEqual */
/* function assert.notEqual(actual: unknown, expected: unknown, message?: string | Error | undefined): void */
// @demo
// assert.notEqual(add(1, 2), 3, "实际值等于预期值报错")

/* assert.deepEqual */
/* function assert.deepEqual(actual: unknown, expected: unknown, message?: string | Error | undefined): void */
// @demo
// assert.deepEqual(list1, list2, "实际值不等于预期值报错")
// assert.deepEqual(person1, person2, "实际值不等于预期值报错")

/* assert.notDeepEqual */
/* function assert.notDeepEqual(actual: unknown, expected: unknown, message?: string | Error | undefined): void */
// @demo
// assert.notDeepEqual(list1, list1, "实际值等于预期值报错")

/* assert.throws */
/*
  function throws(block: () => unknown, message?: string | Error): void;
  function throws(block: () => unknown, error: AssertPredicate, message?: string | Error): void;
*/
assert.throws(
  function () {
    throw new Error("Wrong value")
  },
  Error,
  "不符合预期的错误类型"
)

assert.throws(
  function () {
    throw new Error("Wrong value")
  },
  /value/,
  "不符合预期的错误类型"
)

assert.throws(
  function () {
    throw new Error("Wrong value")
  },
  function (err) {
    if (err instanceof Error && /value/.test(err)) {
      return true
    }
  },
  "不符合预期的错误类型"
)
