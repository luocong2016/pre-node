import "reflect-metadata"


export enum RequestMethod {
  GET = 0,
  POST,
  PUT,
  DELETE,
  PATCH,
  ALL,
  OPTIONS,
  HEAD,
  SEARCH,
}

export interface RequestMappingMetadata {
  path?: string | string[]
  method?: RequestMethod
}

const PATH_METADATA = "path"
const METHOD_METADATA = "method"

export const RequestMapping = (metadata: RequestMappingMetadata): MethodDecorator => {
  const pathMetadata = metadata[PATH_METADATA]
  const path = pathMetadata && pathMetadata.length ? pathMetadata : "/"
  const requestMethod = metadata[METHOD_METADATA] || RequestMethod.GET

  return (target: object, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value)
    Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value)
    return descriptor
  }
}

const createMappingDecorator =
  (method: RequestMethod) =>
  (path?: string | string[]): MethodDecorator => {
    return RequestMapping({
      [PATH_METADATA]: path,
      [METHOD_METADATA]: method,
    })
  }

export const Get = createMappingDecorator(RequestMethod.GET)
export const Post = createMappingDecorator(RequestMethod.POST)
export const Delete = createMappingDecorator(RequestMethod.DELETE)
export const Put = createMappingDecorator(RequestMethod.PUT)
export const Patch = createMappingDecorator(RequestMethod.PATCH)
export const Options = createMappingDecorator(RequestMethod.OPTIONS)
export const Head = createMappingDecorator(RequestMethod.HEAD)
export const All = createMappingDecorator(RequestMethod.ALL)
export const Search = createMappingDecorator(RequestMethod.SEARCH)

/* Test */
class Test {
  @Search("test")
  public static test() {}

  @Search(["foo", "bar"])
  public static testUsingArray() {}
}

const path = Reflect.getMetadata("path", Test.test)
const method = Reflect.getMetadata("method", Test.test)
const pathUsingArray = Reflect.getMetadata("path", Test.testUsingArray)
const methodUsingArray = Reflect.getMetadata("method", Test.testUsingArray)

console.log(`
path: ${path}
method: ${method}
pathUsingArray: ${pathUsingArray}
methodUsingArray: ${methodUsingArray}
`)
