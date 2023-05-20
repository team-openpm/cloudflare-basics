import z from 'zod'
import { RouteOptions, ZodRouteHandler } from '../types'
import { error } from '../response'

/**
 * Creates a route handler that validates the request data and parameters using the Zod schema.
 * If validation fails, it returns a 400 json error with a detailed message.
 *
 * @param {z.Schema} schema - A Zod schema used to validate the incoming request data and parameters.
 * @param {ZodRouteHandler<Env, Schema>} callback - The main callback that will be executed after validation is successful.
 *
 * @return {ZodRouteHandler}
 *
 * @example
 * const schema = z.object({
 *   name: z.string(),
 * })
 *
 * type schemaType = z.infer<typeof schema>
 *
 * withZod<Env, schemaType>(schema, async (options) => {
 *  console.log(options.data) //=> { name: 'test' }
 *  return new Response('ok')
 * })
 *
 */
export function withZod<Env, Schema>(
  schema: z.Schema,
  callback: ZodRouteHandler<Env, Schema>
) {
  return async (options: RouteOptions<Env>) => {
    const { request } = options

    const queryParams = request.query
    const bodyParams = (await request.body()) ?? {}
    const existingParams = options.params ?? {}

    const params = {
      ...queryParams,
      ...bodyParams,
      ...existingParams,
    }

    const result = schema.safeParse(params)

    if (!result.success) {
      const firstError = result.error?.errors?.[0]

      if (firstError) {
        return error(`${firstError.path} ${firstError.message}`.toLowerCase(), {
          type: firstError.code,
          status: 400,
        })
      } else {
        return error('invalid_request')
      }
    }

    return callback({
      ...options,
      data: result.data,
    })
  }
}
