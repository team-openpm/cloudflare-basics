import { parseCookie } from './cookie'
import { RequestMethod, RequestMethodEnum } from './types'
import { enumFromString } from './utils/enum'
import { toObject } from './utils/to-object'

export class BasicRequest {
  url: URL

  constructor(public request: Request) {
    this.url = new URL(request.url)
  }

  /**
   * Returns the request method as a lowercase string.
   */
  get method(): RequestMethod {
    return enumFromString<RequestMethodEnum>(
      RequestMethodEnum,
      this.request.method.toLowerCase()
    )
  }

  /**
   * Returns the cookies sent by the client.
   */
  get cookies(): Record<string, string> {
    const cookieString = this.headers.get('cookie')

    if (!cookieString) {
      return {}
    }

    return parseCookie(cookieString)
  }

  /**
   * Returns the query parameters sent by the client.
   */
  get query() {
    return toObject(this.url.searchParams)
  }

  get headers() {
    return this.request.headers
  }

  get origin() {
    return this.url.origin
  }

  /**
   * A helper to parse the request body.
   * @returns {Promise<T>} The parsed request body as an object.
   */
  async getParams<T>(): Promise<T | undefined> {
    const ct = this.contentType
    const rq = this.request

    if (!rq.body || !ct) {
      return
    }

    if (~ct.indexOf('application/json')) {
      return rq.json() as Promise<T>
    }

    if (~ct.indexOf('multipart/form-data')) {
      return rq.formData().then(toObject) as Promise<T>
    }

    if (~ct.indexOf('application/x-www-form-urlencoded')) {
      return rq.formData().then(toObject) as Promise<T>
    }

    return
  }

  /**
   * Returns the content type of the request.
   */
  get contentType() {
    return this.request.headers.get('content-type')
  }
}
