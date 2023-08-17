import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/middleware/zod-validation.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
})
