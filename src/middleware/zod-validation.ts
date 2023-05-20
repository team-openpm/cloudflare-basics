import z from 'zod'
import { RouteOptions } from '../types'
import { error } from '../response'

type RouteHandler<Env, Schema> = (
  options: RouteOptions<Env> & { data: Schema }
) => Promise<Response>

export function withZod<Env, Schema>(
  schema: z.Schema,
  callback: RouteHandler<Env, Schema>
) {
  return async (options: RouteOptions<Env> & { data: Schema }) => {
    const { request } = options

    const queryParams = request.query
    const bodyParams = await request.getParams()
    const existingParams = options.params || {}

    if (!bodyParams) {
      return error('Invalid request')
    }

    const params = {
      ...queryParams,
      ...bodyParams,
      ...existingParams,
    }

    const result = schema.safeParse(params)

    if (!result.success) {
      return error(result.error.message)
    }

    callback(options)
  }
}
