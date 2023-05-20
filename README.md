# cloudflare-basics

Just the basics and nothing more.

- Simple Router
- Simple request body parsing
- Simple zod validation

[![NPM version](https://img.shields.io/npm/v/cloudflare-basics?color=a1b858&label=)](https://www.npmjs.com/package/cloudflare-basics)

## License

MIT

## Usage

```ts
import { Router, json } from 'cloudflare-basics'

const router = new Router()

router.get('/', ({ request }) => {
  return new Response('Hello World!')
})

router.post('/', ({ request }) => {
  const data = await request.getParams()

  return json({ data })
})
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
