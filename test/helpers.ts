/* eslint-disable @typescript-eslint/no-empty-function */
import { BasicRequest } from '../src/request'

export function buildRequest(url: string, options: RequestInit) {
  return new BasicRequest(new Request(url, options))
}
export function execRoute<Env>(
  route: (arg0: {
    request: BasicRequest
    env: Env
    ctx: ExecutionContext
  }) => Promise<Response>,
  request: BasicRequest
) {
  return route({
    request,
    env: {} as Env,
    ctx: {
      waitUntil: () => {},
      passThroughOnException: () => {},
    },
  })
}
