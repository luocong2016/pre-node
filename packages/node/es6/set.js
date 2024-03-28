// Set

/* 实例属性和方法
// property //
Set<string | number>.size: number

// method -> Map.prototype.xx //
Set<string | number>.add(value: string | number): Set<string | number>
Set<string | number>.delete(value: string | number): boolean
Set<string | number>.has(value: string | number): boolean
Set<string | number>.clear(): void

// 遍历器生成函数和一个遍历方法 //
Set<string | number>.keys(): IterableIterator<string | number>
Set<string | number>.values(): IterableIterator<string | number>
Set<string | number>.entries(): IterableIterator<[string | number, string | number]>

Set<string | number>.forEach(
  callbackfn: (value: string | number, value2: string | number, set: Set<string | number>) => void,
  thisArg?: any
): void
*/

const set = new Set([0, 2, "2"])

console.log("Set size:", set.size)

console.log("---keys---")
for (let item of set.keys()) {
  console.log(item)
}

console.log("---values---")
for (let item of set.values()) {
  console.log(item)
}

console.log("---entries---")
for (let item of set.entries()) {
  console.log(item)
}

console.log("---forEach---")
set.forEach((value, key) => {
  console.log(`${key}: ${value}`)
})

set.add(3)
set.delete(3)
set.has(3)
set.clear()

console.log(set)
