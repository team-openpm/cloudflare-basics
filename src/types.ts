import { BasicRequest } from './request'

export type RouteMatcher = (
  request: BasicRequest
) => { params: Record<string, string> } | undefined

export type RouteOptions<Env> = {
  request: BasicRequest
  env: Env
  ctx: ExecutionContext
  params?: Record<string, string>
}

export type RouteHandler<Env> = (
  options: RouteOptions<Env>
) => Promise<Response>

export type ZodRouteHandler<Env, Schema> = (
  options: RouteOptions<Env> & { data: Schema }
) => Promise<Response>

export type Route<Env> = [RouteMatcher, RouteHandler<Env>]

export enum RequestMethodEnum {
  options = 'options',
  head = 'head',
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
  patch = 'patch',
}

export type RequestMethod = keyof typeof RequestMethodEnum
