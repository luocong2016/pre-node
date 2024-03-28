const p1 = Promise.resolve("p1")
const p2 = Promise.resolve("p2")

const pf = Promise.resolve("pf").finally(() => {
  return "pff"
})

const pErr = Promise.reject("报错了")

Promise.race([p1, p2, pf, pErr])
  .then((result) => console.log("Promise.race: ", result))
  .catch((e) => console.log("error: ", e))

Promise.all([p1, p2, pf])
  .then((result) => console.log("Promise.all: ", result))
  .catch((e) => console.log("error: ", e))

Promise.allSettled([p1, p2, pf, pErr])
  .then((result) => console.log("Promise.allSettled: ", result))
  .catch((e) => console.log("error: ", e))

// Promise.any()
// Promise.try()
