# cloudflare-basics

Just the basics and nothing more.

- Simple Router
- Simple request body parsing
- Simple zod validation

[![NPM version](https://img.shields.io/npm/v/cloudflare-basics?color=a1b858&label=)](https://www.npmjs.com/package/cloudflare-basics)

# Requirements

- Requires Node 18.x
- Technically built for Cloudflare Workers, but you can use it in Node.js too

## Usage

```ts
import { Router, json } from 'cloudflare-basics'

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const router = new Router()

    router.get('/', async ({ request }) => {
      return new Response('Hello World!')
    })

    router.post('/books', async ({ request }) => {
      const data = await request.getParams()

      return json({ data })
    })

    router.get('/books/:id', async ({ params }) => {
      const bookId = params?.id

      return json({ bookId })
    })

    return (
      router.handle(request, env, ctx) ??
      new Response('Not Found', { status: 404 })
    )
  },
}
```

## Zod Validation

```ts
const schema = z.object({
  name: z.string(),
})

type schemaType = z.infer<typeof schema>

const MyRoute = withZod<Env, schemaType>(schema, async (options) => {
  console.log(options.data) //=> { name: 'test' }
  return new Response('ok')
})

router.post('/', MyRoute)
```

## License

MIT
