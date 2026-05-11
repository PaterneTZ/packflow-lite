import { Dimensions, PrintSettings, Colors } from '../types'
import { SVGBuilder } from '../utils/svgBuilder'

export function generateShippingBox(
  dimensions: Dimensions,
  settings: PrintSettings,
  colors: Colors
): string {
  const builder = new SVGBuilder()
  const { width, height, depth } = dimensions
  const { bleed, safeZone, glueTab } = settings

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

  const startX = bleed
  const startY = bleed

  // Top flap
  builder.addRect(startX, startY, width, depth, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Left panel
  builder.addRect(startX, startY + depth, depth, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Front panel
  builder.addRect(startX + depth, startY + depth, width, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Right panel
  builder.addRect(startX + depth + width, startY + depth, depth, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Back panel
  builder.addRect(startX + depth * 2 + width, startY + depth, width, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Bottom flap
  builder.addRect(startX, startY + depth + height, width, depth, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Glue tab
  builder.addRect(startX + depth * 2 + width * 2, startY + depth, glueTab, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
    strokeDasharray: '2,2',
  })

  // Fold lines
  builder.addLine(startX, startY + depth, startX + width, startY + depth, {
    stroke: colors.fold,
    strokeWidth: 0.5,
    strokeDasharray: '1,1',
  })
  builder.addLine(
    startX,
    startY + depth + height,
    startX + width,
    startY + depth + height,
    { stroke: colors.fold, strokeWidth: 0.5, strokeDasharray: '1,1' }
  )

  return builder.toSVG()
}
