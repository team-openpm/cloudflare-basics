/**
 *
 *  Parses a cookie string and returns an object containing the key-value pairs.
 *  @param {string} cookieString - A string containing the cookies in the "key=value; key2=value2" format.
 *  @returns {Record<string, string>} - An object containing the key-value pairs of the cookies.
 *  @example
 *  const cookieString = "name=John; age=25; city=New York";
 *  parseCookie(cookieString) //=> { name: "John", age: "25", city: "New York" }
 **/
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

/**
 *
 *  Stringifies a cookie, including its name, value, and options.
 *  @param {string} name - The name of the cookie.
 *  @param {string} value - The value of the cookie.
 *  @param {Partial} [options={}] - An object containing optional cookie attributes:
 *  @param {string} options.value - The value of the cookie.
 *  @param {number} options.maxage - The maximum age of the cookie (in seconds).
 *  @param {Date} options.expires - The expiration date of the cookie.
 *  @param {'Lax' | 'Strict' | 'None'} options.samesite - The SameSite attribute of the cookie.
 *  @param {boolean} options.secure - Whether the cookie should be sent only over HTTPS.
 *  @param {boolean} options.httponly - Whether the cookie should be HTTP-only.
 *  @param {string} options.domain - The domain of the cookie.
 *  @param {string} options.path - The path of the cookie.
 *  @returns {string} The stringified cookie.
 *
 *  @example
 *
 *  stringifyCookie('name', 'John', {
 *    maxage: 60 * 60 * 24 * 365, // 1 year
 *  }) //=> "name=John; Max-Age=31536000"
 *
 **/
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
