import "reflect-metadata"

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
  let set = descriptor.set!

  // console.log(set) // [Function: set xx]

  descriptor.set = function (value: T) {
    // console.log(Reflect) // Object [Reflect] {}

    let type = Reflect.getMetadata("design:type", target, propertyKey)

    // console.log(type, target, propertyKey) // [class Point] {} start

    if (!(value instanceof type)) {
      throw new Error(`Invalid type, got ${typeof value} not ${type.name}.`)
    }

    set.call(this, value)
  }
}

class Point {
  constructor(public x: number, public y: number) {}
}

debugger

class Line {
  private _start: Point
  private _end: Point

  @validate
  set start(value: Point) {
    this._start = value
  }

  get start() {
    return this._start
  }

  @validate
  set end(value: Point) {
    this._end = value
  }

  get end() {
    return this._end
  }
}

const line = new Line()
line.start = new Point(0, 0)
// line.end = new Point(1, 1)

// @ts-ignore
// line.end = {}

// console.log(line)
