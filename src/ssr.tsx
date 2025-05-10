import { renderToPipeableStream } from 'react-dom/server'
import { Response } from 'express'
import { Writable } from 'stream'
import App from './App'

class HtmlWritable extends Writable {
  private chunks: any[] = []
  private html = ''

  getHtml() {
    return this.html
  }

  _write(chunk: any, _encoding: BufferEncoding, callback: (error?: Error | null) => void) {
    this.chunks.push(chunk)
    callback()
  }

  _final(callback: (error?: Error | null) => void) {
    this.html = Buffer.concat(this.chunks).toString()
    callback()
  }
}

export function render(_url: string, res: Response, template: string) {
  const writable = new HtmlWritable()

  writable.on('finish', () => {
    const html = template.replace(`<!--app-html-->`, writable.getHtml())
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  })

  const stream = renderToPipeableStream(
    <App />,
    {
      onShellReady() {
        stream.pipe(writable)
      }
    }
  )
}
