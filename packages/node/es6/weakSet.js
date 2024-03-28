// WeakSet

/* WeakSet 与 Set 的区别
1. 只能是对象和 Symbol 值，而不能是其他类型的值
2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用
*/

/* 实例方法
// method -> Map.prototype.xx //

*/
const numArr = [1, 2]
const strArr = ["3", "4"]
const obj = { a: 2 }

const ws = new WeakSet([numArr, strArr])

ws.add(obj)
ws.delete(numArr)

console.log(ws.has(obj))
console.log(ws.has(numArr))

