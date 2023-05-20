export function error(message: string) {
  return json({ error: message }, 400)
}

export function json(data: any, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  })
}
