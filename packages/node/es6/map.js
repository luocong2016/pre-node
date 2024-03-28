// Map

/* 实例属性和方法
// property //
Map<string, string>.size: number

// method -> Map.prototype.xx //
Map<string, string>.set(key: string, value: string): Map<string, string>
Map<string, string>.get(key: string): string | undefined
Map<string, string>.has(key: string): boolean
Map<string, string>.delete(key: string): boolean
Map<string, string>.clear(): void

// 遍历器生成函数和一个遍历方法 //
Map<string, string>.keys(): IterableIterator<string>
Map<string, string>.values(): IterableIterator<string>
Map<string, string>.entries(): IterableIterator<[string, string]>

Map<string, string>.forEach(
  callbackfn: (value: string, key: string, map: Map<string, string>) => void,
  thisArg?: any
): void
*/

const map = new Map([
  ["N", "No"],
  ["Y", "Yes"],
])

const o = {
  msg: "Hello World",
}

console.log("MapSize: ", map.size)

map.set(o, "content")
map.get(o)
map.has(o)

console.log("---遍历器生成函数---")
console.log(map.keys())
console.log(map.values())
console.log(map.entries())

console.log("---遍历方法---")
map.forEach((value, key) => {
  console.log("Key: %s, Value: %s", key, value)
})

map.delete(o)
console.log("MapSize: ", map.size)

map.clear()
console.log("MapSize: ", map.size)

console.log("---数据结构相互转换---")

/* 转换
Map <-> Object
Map <-> Array
*/
// Map -> Object
function strMap2Obj(strMap) {
  const obj = Object.create(null)
  for (let [k, v] of strMap) {
    obj[k] = v
  }
  return obj
}

console.log(
  "strMap2Obj: ",
  strMap2Obj(
    new Map([
      ["yes", true],
      ["no", false],
    ])
  )
)

// Object -> Map
function obj2StrMap(obj) {
  const strMap = new Map()
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k])
  }
  return strMap
}

console.log("obj2StrMap: ", obj2StrMap({ a: 1, b: 2 }))

// Map -> JSON
function strMap2Json(strMap) {
  return JSON.stringify(strMap2Obj(strMap))
}

console.log(
  "strMap2Json: ",
  strMap2Json(
    new Map([
      ["yes", true],
      ["no", false],
    ])
  )
)

// JSON -> Map
function json2StrMap(jsonStr) {
  return obj2StrMap(JSON.parse(jsonStr))
}
console.log("json2StrMap: ", json2StrMap('{ "yes": true, "no": false }'))

// Map -> Array
const myMap = new Map([
  [true, 7],
  [{ foo: 3 }, ["abc"]],
])
console.log("map -> array(...扩展符): ", [...myMap])

// Array -> Map
console.log(
  "array -> map",
  new Map([
    [true, 7],
    [{ foo: 3 }, ["abc"]],
  ])
)
