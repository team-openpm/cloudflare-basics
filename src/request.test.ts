import { describe, it, expect } from 'vitest'
import { BasicRequest } from './request'

describe('request', () => {
  it('parses query params', () => {
    const request = new BasicRequest(
      new Request('https://example.com/test?foo=bar')
    )

    expect(request.query).toEqual({ foo: 'bar' })
  })

  it('parses cookies', () => {
    const request = new BasicRequest(
      new Request('https://example.com/test', {
        headers: {
          cookie: 'foo=bar',
        },
      })
    )

    expect(request.cookies).toEqual({ foo: 'bar' })
  })

  it('parses headers', () => {
    const request = new BasicRequest(
      new Request('https://example.com/test', {
        headers: {
          'content-type': 'application/json',
        },
      })
    )

    expect(request.headers.get('content-type')).toBe('application/json')
  })

  it('parses origin', () => {
    const request = new BasicRequest(
      new Request('https://example.com/test', {
        headers: {
          'content-type': 'application/json',
        },
      })
    )

    expect(request.origin).toBe('https://example.com')
  })

  it('parses json', async () => {
    const request = new BasicRequest(
      new Request('https://example.com/test', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ foo: 'bar' }),
      })
    )

    expect(await request.body()).toEqual({ foo: 'bar' })
  })

  it('parses forms', async () => {
    const request = new BasicRequest(
      new Request('https://example.com/test', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: 'foo=bar',
      })
    )

    expect(await request.body()).toEqual({ foo: 'bar' })
  })
})
