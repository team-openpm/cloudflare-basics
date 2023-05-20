import { BasicRequest } from './request'
import { RequestMethod, Route, RouteHandler } from './types'

export class Router<Env> {
  routes: Route<Env>[] = []

  /**
   * Handles a request by matching it against the registered routes.
   * @param request Request
   * @param env Environment
   * @param ctx Context (for Workers)
   * @returns Response
   **/
  handle(rawRequest: Request, env: Env, ctx: ExecutionContext) {
    const request = new BasicRequest(rawRequest)

    for (const route of this.routes) {
      const match = route[0](request)

      if (match) {
        return route[1]({ request, env, ctx, params: match.params })
      }
    }

    const match = this.routes.find(([matcher]) => matcher(request))

    if (match) {
      return match[1]({ request, env, ctx })
    }
  }

  /**
   * Registers a new route.
   * @param handler RouteHandler
   * @param path Path to match
   * @param method HTTP method to match
   *
   * @example
   * const router = new Router<Env>()
   *
   * router.register(async ({ request }) => {
   *  return new Response('ok')
   * }, '/test')
   */
  register(handler: RouteHandler<Env>, path: string, method?: RequestMethod) {
    const urlPattern = new URLPattern({ pathname: path })

    this.routes.push([
      (request) => {
        if (!method || request.method.toLowerCase() === method) {
          const match = urlPattern.exec({
            pathname: new URL(request.url).pathname,
          })

          if (match) {
            return { params: match.pathname.groups }
          }
        }
      },

      handler,
    ])
  }

  options(path: string, handler: RouteHandler<Env>) {
    this.register(handler, path, 'options')
  }

  head(path: string, handler: RouteHandler<Env>) {
    this.register(handler, path, 'head')
  }

  /**
   * Register a new GET route.
   * @param path
   * @param handler
   *
   * @example
   * const router = new Router<Env>()
   *
   * router.get('/test', async ({ request }) => {
   *  return new Response('ok')
   * })
   */
  get(path: string, handler: RouteHandler<Env>) {
    this.register(handler, path, 'get')
  }

  post(path: string, handler: RouteHandler<Env>) {
    this.register(handler, path, 'post')
  }

  put(path: string, handler: RouteHandler<Env>) {
    this.register(handler, path, 'put')
  }

  patch(path: string, handler: RouteHandler<Env>) {
    this.register(handler, path, 'patch')
  }

  delete(path: string, handler: RouteHandler<Env>) {
    this.register(handler, path, 'delete')
  }

  /**
   * Registers a new route for all HTTP methods.
   * @param path
   * @param handler
   */
  all(path: string, handler: RouteHandler<Env>) {
    this.register(handler, path)
  }
}
