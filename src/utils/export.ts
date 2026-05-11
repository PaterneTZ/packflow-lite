import { PDFDocument, PDFPage, rgb } from 'pdf-lib'
import { Dimensions, PrintSettings } from '../types'

export async function exportPDF(
  svgContent: string,
  dimensions: Dimensions,
  settings: PrintSettings
): Promise<void> {
  const pdfDoc = await PDFDocument.create()

  // Convert mm to points (1mm = 2.834645669 points)
  const mmToPt = 2.834645669
  const width = (dimensions.width + settings.bleed * 2) * mmToPt
  const height = (dimensions.height + settings.bleed * 2) * mmToPt

  const page = pdfDoc.addPage([width, height])

  // Add white background
  page.drawRectangle({
    x: 0,
    y: 0,
    width: width,
    height: height,
    color: rgb(1, 1, 1),
  })

  // Save and download
  const pdfBytes = await pdfDoc.save()
  downloadFile(pdfBytes, 'packaging-template.pdf', 'application/pdf')
}

export function exportSVG(svgContent: string, packagingType: string): void {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' })
  downloadFile(blob, `${packagingType}-template.svg`, 'image/svg+xml')
}

function downloadFile(data: Blob | Uint8Array, filename: string, mimeType: string): void {
  const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
