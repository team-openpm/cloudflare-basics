export function parseCookie(cookieString: string): Record<string, string> {
  const cookies = cookieString.split(';')
  const result: Record<string, string> = {}

  for (const cookie of cookies) {
    const [name, value] = cookie.split('=')
    result[name.trim()] = decodeURIComponent(value)
  }

  return result
}

interface StringifyOptions {
  value: string
  maxage: number
  expires: Date
  samesite: 'Lax' | 'Strict' | 'None'
  secure: boolean
  httponly: boolean
  domain: string
  path: string
}

export function stringifyCookie(
  name: string,
  value: string,
  options: Partial<StringifyOptions> = {}
): string {
  let str = name + '=' + encodeURIComponent(value)

  if (options.expires) {
    str += '; Expires=' + new Date(options.expires).toUTCString()
  }

  if (options.maxage != null && options.maxage >= 0) {
    str += '; Max-Age=' + (options.maxage | 0)
  }

  if (options.domain) {
    str += '; Domain=' + options.domain
  }

  if (options.path) {
    str += '; Path=' + options.path
  }

  if (options.samesite) {
    str += '; SameSite=' + options.samesite
  }

  if (options.secure || options.samesite === 'None') {
    str += '; Secure'
  }

  if (options.httponly) {
    str += '; HttpOnly'
  }

  return str
}
