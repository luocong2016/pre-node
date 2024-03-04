import { Get } from "./http-get"
import { isNil, isString } from "lodash"

export enum RouteParamtypes {
  REQUEST,
  RESPONSE,
  NEXT,
  BODY,
  QUERY,
  PARAM,
  HEADERS,
  SESSION,
  FILE,
  FILES,
  HOST,
  IP,
}

export interface Type<T = any> extends Function {
  new (...args: any[]): T
}

export type Paramtype = "body" | "query" | "param" | "custom"

export interface ArgumentMetadata {
  readonly type: Paramtype
  readonly metatype?: Type<any> | undefined
  readonly data?: string | undefined
}

export interface PipeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R
}

export const ROUTE_ARGS_METADATA = "__routeArguments__"

export type ParamData = object | string | number

export function assignMetadata<TParamtype = any, TArgs = any>(
  args: TArgs,
  paramtype: TParamtype,
  index: number,
  data?: ParamData,
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
) {
  return {
    ...args,
    [`${paramtype}:${index}`]: {
      index,
      data,
      pipes,
    },
  }
}

const createPipesRouteParamDecorator =
  (paramtype: RouteParamtypes) =>
  (data?: any, ...pipes: (Type<PipeTransform> | PipeTransform)[]): ParameterDecorator =>
  (target, key, index) => {
    const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, key) || {}
    const hasParamData = isNil(data) || isString(data)
    const paramData = hasParamData ? data : undefined
    const paramPipes = hasParamData ? pipes : [data, ...pipes]

    Reflect.defineMetadata(
      ROUTE_ARGS_METADATA,
      assignMetadata(args, paramtype, index, paramData, ...paramPipes),
      target.constructor,
      key
    )
  }

export function Query(): ParameterDecorator
export function Query(...pipes: (Type<PipeTransform> | PipeTransform)[]): ParameterDecorator
export function Query(
  property: string,
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator
export function Query(
  property?: string | (Type<PipeTransform> | PipeTransform),
  ...pipes: (Type<PipeTransform> | PipeTransform)[]
): ParameterDecorator {
  return createPipesRouteParamDecorator(RouteParamtypes.QUERY)(property, ...pipes)
}

class Test2 {
  @Get()
  test(@Query() query) {
    console.log(query)
  }

  @Get([])
  testUsingArray(@Query() query) {}
}

const test2 = new Test2()
const path2 = Reflect.getMetadata("path", test2.test)
const pathUsingArray2 = Reflect.getMetadata("path", test2.testUsingArray)

console.log(`
path2: ${path2}
pathUsingArray2: ${pathUsingArray2}
`)
