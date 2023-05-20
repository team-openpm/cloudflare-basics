import { describe, it, expect } from 'vitest'
import { Router } from './router'

import 'urlpattern-polyfill'

describe('router', () => {
  type Env = {
    foo: string
  }

  it('handles routes', async () => {
    const router = new Router<Env>()

    router.register(async ({ request }) => {
      expect(request.url.href).toBe('https://example.com/test')
      return new Response('ok')
    }, '/test')

    const response = await router.handle(
      new Request('https://example.com/test'),
      { foo: 'bar' },
      {} as any
    )

    expect(response?.status).toBe(200)
  })

  it('handles post routes', async () => {
    const router = new Router<Env>()

    router.post('/test', async ({ request }) => {
      expect(request.url.href).toBe('https://example.com/test')
      return new Response('ok')
    })

    const response = await router.handle(
      new Request('https://example.com/test', { method: 'POST' }),
      { foo: 'bar' },
      {} as any
    )

    expect(response?.status).toBe(200)
  })
})
