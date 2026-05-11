import { Dimensions, PrintSettings, Colors } from '../types'
import { SVGBuilder } from '../utils/svgBuilder'

export function generateReverseTuckEnd(
  dimensions: Dimensions,
  settings: PrintSettings,
  colors: Colors
): string {
  const builder = new SVGBuilder()
  const { width, height, depth } = dimensions
  const { bleed, safeZone, glueTab } = settings

  // Calculate total dimensions
  const totalWidth = width * 2 + depth * 2 + glueTab + bleed * 2
  const totalHeight = height + depth * 2 + bleed * 2

  // Bleed box
  builder.addRect(
    0,
    0,
    totalWidth,
    totalHeight,
    { stroke: colors.bleed, fill: 'none', strokeWidth: 0.5, strokeDasharray: '2,2' }
  )

  // Safe zone
  const safeX = bleed + safeZone
  const safeY = bleed + safeZone
  const safeW = totalWidth - bleed * 2 - safeZone * 2
  const safeH = totalHeight - bleed * 2 - safeZone * 2
  builder.addRect(safeX, safeY, safeW, safeH, {
    stroke: colors.safe,
    fill: 'none',
    strokeWidth: 0.5,
    strokeDasharray: '4,4',
  })

  const startX = bleed
  const startY = bleed

  // Top flap
  builder.addRect(startX, startY, width, depth, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Top fold line
  builder.addLine(startX, startY + depth, startX + width, startY + depth, {
    stroke: colors.fold,
    strokeWidth: 0.5,
    strokeDasharray: '1,1',
  })

  // Front panel
  builder.addRect(startX, startY + depth, width, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Bottom fold line
  builder.addLine(startX, startY + depth + height, startX + width, startY + depth + height, {
    stroke: colors.fold,
    strokeWidth: 0.5,
    strokeDasharray: '1,1',
  })

  // Bottom flap
  builder.addRect(startX, startY + depth + height, width, depth, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Side panels
  const sideY = startY + depth
  builder.addRect(startX + width, sideY, depth, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })
  builder.addRect(startX + width + depth, sideY, depth, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  return builder.toSVG()
}
