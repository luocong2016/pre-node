import "reflect-metadata"
import { isUndefined, isString } from "lodash"
import { Get } from "./http-get"
import { Query } from "./http-query"

export const PATH_METADATA = "path"
export const HOST_METADATA = "host"
export const SCOPE_OPTIONS_METADATA = "scope:options"
export const CONTROLLER_WATERMARK = "__controller__"
export const VERSION_METADATA = "__version__"

export const VERSION_NEUTRAL = Symbol("VERSION_NEUTRAL")

export type VersionValue = string | typeof VERSION_NEUTRAL | Array<string | typeof VERSION_NEUTRAL>

export interface VersionOptions {
  version?: VersionValue
}

export enum Scope {
  DEFAULT,
  TRANSIENT,
  REQUEST,
}

export interface ScopeOptions {
  scope?: Scope
  durable?: boolean
}

export interface ControllerOptions extends ScopeOptions, VersionOptions {
  path?: string | string[]
  host?: string | RegExp | Array<string | RegExp>
}

export function Controller(): ClassDecorator
export function Controller(prefix: string | string[]): ClassDecorator
export function Controller(options: ControllerOptions): ClassDecorator
export function Controller(
  prefixOrOptions?: string | string[] | ControllerOptions
): ClassDecorator {
  const defaultPath = "/"

  const [path, host, scopeOptions, versionOptions] = isUndefined(prefixOrOptions)
    ? [defaultPath, undefined, undefined, undefined]
    : isString(prefixOrOptions) || Array.isArray(prefixOrOptions)
    ? [prefixOrOptions, undefined, undefined, undefined]
    : [
        prefixOrOptions.path || defaultPath,
        prefixOrOptions.host,
        { scope: prefixOrOptions.scope, durable: prefixOrOptions.durable },
        Array.isArray(prefixOrOptions.version)
          ? Array.from(new Set(prefixOrOptions.version))
          : prefixOrOptions.version,
      ]

  return (target: object) => {
    Reflect.defineMetadata(CONTROLLER_WATERMARK, true, target)
    Reflect.defineMetadata(PATH_METADATA, path, target)
    Reflect.defineMetadata(HOST_METADATA, host, target)
    Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, scopeOptions, target)
    Reflect.defineMetadata(VERSION_METADATA, versionOptions, target)
  }
}

@Controller({
  version: "1.0.0",
  scope: Scope.DEFAULT,
  durable: true,
  host: "192.168.1.1",
})
class TestController {
  @Get("test")
  test(@Query("test") test: string) {
    console.log(test)
  }
}

const test = new TestController()

console.log(`
${VERSION_METADATA}: ${Reflect.getMetadata(VERSION_METADATA, TestController)},
${PATH_METADATA}: ${Reflect.getMetadata(PATH_METADATA, TestController)},
${HOST_METADATA}: ${Reflect.getMetadata(HOST_METADATA, TestController)},
${CONTROLLER_WATERMARK}: ${Reflect.getMetadata(CONTROLLER_WATERMARK, TestController)}
${SCOPE_OPTIONS_METADATA}: ${JSON.stringify(
  Reflect.getMetadata(SCOPE_OPTIONS_METADATA, TestController),
  null,
  2
)}
`)
