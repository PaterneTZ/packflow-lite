import { Dimensions, PrintSettings, Colors } from '../types'
import { SVGBuilder } from '../utils/svgBuilder'

export function generateStraightTuckEnd(
  dimensions: Dimensions,
  settings: PrintSettings,
  colors: Colors
): string {
  const builder = new SVGBuilder()
  const { width, height, depth } = dimensions
  const { bleed, safeZone, glueTab } = settings

  // Calculate total dimensions
  const totalWidth = width * 2 + depth * 2 + glueTab + bleed * 2
  const totalHeight = height + depth + bleed * 2

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

  // Main body
  const startX = bleed
  const startY = bleed

  // Bottom flap (depth)
  builder.addLine(startX, startY + height, startX + depth, startY + height, {
    stroke: colors.fold,
    strokeWidth: 0.5,
    strokeDasharray: '1,1',
  })

  // Left panel
  builder.addRect(startX, startY, depth, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Front panel
  builder.addRect(startX + depth, startY, width, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Right panel
  builder.addRect(startX + depth + width, startY, depth, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Back panel
  builder.addRect(startX + depth * 2 + width, startY, width, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Glue tab
  builder.addRect(startX + depth * 2 + width * 2, startY, glueTab, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
    strokeDasharray: '2,2',
  })

  // Top flap (depth)
  builder.addLine(startX, startY, startX + depth, startY, {
    stroke: colors.fold,
    strokeWidth: 0.5,
    strokeDasharray: '1,1',
  })

  return builder.toSVG()
}
