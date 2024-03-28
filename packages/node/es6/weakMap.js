// WeakMap

/* WeakMap 与 Map 的区别
1. 只接受对象(null 除外) 和 Symbol 值作为键名，不接受其他类型的值作为键名
2. WeakMap 的键名所执行的对象，不计入垃圾回收机制
*/

/* 实例方法
// method -> Map.prototype.xx //
WeakMap<object, any>.set(key: object, value: any): WeakMap<object, any>
WeakMap<object, any>.get(key: object): any
WeakMap<object, any>.has(key: object): boolean
WeakMap<object, any>.delete(key: object): boolean
*/

const keySymbol = Symbol("key")

const wm = new WeakMap()
wm.set(keySymbol, "key")
wm.get(keySymbol)
wm.has(keySymbol)
wm.delete(keySymbol)
