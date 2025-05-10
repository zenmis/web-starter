import fs from 'fs/promises'
import express from 'express'
import serverAPI from './server/index.js'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/src/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Server API
app.use('/api', serverAPI)
app.use('/api', (_req, res) => {
  res.status(404).end()
})

// Add Vite or respective production middlewares
let vite: any
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/src', { extensions: [] }))
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/ssr.tsx')).render
    } else {
      template = templateHtml
      // @ts-ignore
      render = (await import('./ssr/index.js')).render
    }

    await render(url, res, template)
  } catch (e: any) {
    vite?.ssrFixStacktrace(e)
    console.error(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
