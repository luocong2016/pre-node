import "reflect-metadata"

function Type(metadataValue) {
  return Reflect.metadata("design:type", metadataValue)
}

function ParamTypes(...metadataValue) {
  return Reflect.metadata("design:paramtypes", metadataValue)
}

function ReturnType(metadataValue) {
  return Reflect.metadata("design:returntype", metadataValue)
}

interface Base {
  add(x: number, y: number): number
}

@ParamTypes(String, Number)
class Person implements Base {
  constructor(private name: string, private age: number) {}

  @Type(String)
  say() {
    return `name: ${this.name}, age: ${this.age}`
  }

  @Type(Function)
  @ParamTypes(Number, Number)
  @ReturnType(Number)
  add(x: number, y: number) {
    return x + y
  }
}

const person = new Person("lutz", 18)

console.log(person.add(1, 2))

const paramTypes = Reflect.getMetadata("design:paramtypes", person, "add")

console.log(paramTypes)
