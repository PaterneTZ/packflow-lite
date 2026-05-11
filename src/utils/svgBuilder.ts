interface RectOptions {
  stroke?: string
  fill?: string
  strokeWidth?: number
  strokeDasharray?: string
}

interface LineOptions {
  stroke?: string
  strokeWidth?: number
  strokeDasharray?: string
}

interface CircleOptions {
  stroke?: string
  fill?: string
  strokeWidth?: number
}

export class SVGBuilder {
  private elements: string[] = []
  private width: number = 2000
  private height: number = 1400

  addRect(x: number, y: number, width: number, height: number, options: RectOptions = {}) {
    const {
      stroke = '#000',
      fill = 'none',
      strokeWidth = 1,
      strokeDasharray,
    } = options
    const dasharray = strokeDasharray ? ` stroke-dasharray="${strokeDasharray}"` : ''
    const rect = `<rect x="${x}" y="${y}" width="${width}" height="${height}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}"${dasharray} />`
    this.elements.push(rect)
  }

  addLine(x1: number, y1: number, x2: number, y2: number, options: LineOptions = {}) {
    const { stroke = '#000', strokeWidth = 1, strokeDasharray } = options
    const dasharray = strokeDasharray ? ` stroke-dasharray="${strokeDasharray}"` : ''
    const line = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}"${dasharray} />`
    this.elements.push(line)
  }

  addCircle(cx: number, cy: number, r: number, options: CircleOptions = {}) {
    const { stroke = '#000', fill = 'none', strokeWidth = 1 } = options
    const circle = `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="${stroke}" fill="${fill}" stroke-width="${strokeWidth}" />`
    this.elements.push(circle)
  }

  addPath(d: string, options: LineOptions = {}) {
    const { stroke = '#000', strokeWidth = 1, strokeDasharray } = options
    const dasharray = strokeDasharray ? ` stroke-dasharray="${strokeDasharray}"` : ''
    const path = `<path d="${d}" stroke="${stroke}" fill="none" stroke-width="${strokeWidth}"${dasharray} />`
    this.elements.push(path)
  }

  addText(x: number, y: number, text: string, fontSize: number = 12) {
    const textEl = `<text x="${x}" y="${y}" font-size="${fontSize}" fill="#666" font-family="Arial">${text}</text>`
    this.elements.push(textEl)
  }

  toSVG(): string {
    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <style>
            svg { background: white; }
          </style>
        </defs>
        ${this.elements.join('\n        ')}
      </svg>
    `
  }
}
