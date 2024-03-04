import { isString } from "lodash"

function print(val) {
  if (isString(val)) {
    console.log(val.split(""))
  } else {
    console.log(val.a)
  }
}

print({ a: 1 })
print("2,4")
