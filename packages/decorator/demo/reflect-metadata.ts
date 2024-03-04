// https://rbuckton.github.io/reflect-metadata/

import "reflect-metadata"

interface User {
  say(msg: string): string
}

function TypeMeta(metadataValue) {
  return Reflect.metadata("class:type", metadataValue)
}

function ReturnType(metadataValue) {
  return Reflect.metadata("return:type", metadataValue)
}

class Student implements User {
  @TypeMeta("function")
  say(name: string) {
    return `${name} say: Hi. I'm student!`
  }
}

@TypeMeta("Class")
class Senior extends Student {
  constructor(private name: string, private age: number) {
    super()
  }

  @ReturnType("Snior-string")
  say() {
    return `${this.name} say: Hi. I'm student!`
  }

  @ReturnType(Number)
  getAge() {
    return this.age
  }
}

const person = new Senior("tony", 11)

// 查询元数据
function print(key: string) {
  const classType = Reflect.getMetadata("class:type", person, key)
  console.log(`person.${key} classType`, classType)

  const returnType = Reflect.getMetadata("return:type", person, key)
  console.log(`person.${key} returnType`, returnType)

  // 不再向上的原型链查找
  const ownClassType = Reflect.getOwnMetadata("class:type", person, key)
  console.log(`person.${key} ownClassType`, ownClassType)

  console.log()
}

// print("say")
// person.say classType function
// person.say returnType Snior-string
// person.say ownClassType undefined

// print("getAge")
// person.getAge classType undefined
// person.getAge returnType [Function: Number]
// person.getAge ownClassType undefined

// 是否存在
const hasRes = Reflect.hasMetadata("class:type", person, "say")
const OwnHasRes = Reflect.hasOwnMetadata("class:type", person, "say")
console.log(hasRes, OwnHasRes)

// 删除
const deleteRes = Reflect.deleteMetadata("class:type", person, "say")
console.log(deleteRes)

print("say")
