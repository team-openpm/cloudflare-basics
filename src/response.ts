/**
 * Shorthand for creating a JSON response with an error message.
 *
 * @param message error message
 * @param options {
 *  type: error type, defaults to 'invalid_request'
 *  status: status code, defaults to 400
 * }
 * @returns Response
 */

export function error(
  message: string,
  { type = 'invalid_request', status = 400 } = {}
) {
  return json({ error: { message, type } }, status)
}

/**
 * A shortcut for creating a JSON response.
 *
 * @param data An object to be JSON stringified.
 * @param status optional status code, defaults to 200
 * @returns Response
 */
export function json(data: any, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}
