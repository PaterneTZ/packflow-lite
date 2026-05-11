import { Dimensions, PrintSettings, Colors } from '../types'
import { SVGBuilder } from '../utils/svgBuilder'

export function generatePizzaBox(
  dimensions: Dimensions,
  settings: PrintSettings,
  colors: Colors
): string {
  const builder = new SVGBuilder()
  const { width, height, depth } = dimensions
  const { bleed, safeZone, glueTab } = settings

  const totalWidth = width + depth * 2 + glueTab + bleed * 2
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
  builder.addRect(startX + depth, startY, width, depth, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Front
  builder.addRect(startX + depth, startY + depth, width, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Sides
  builder.addRect(startX, startY + depth, depth, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })
  builder.addRect(startX + depth + width, startY + depth, depth, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Bottom flap
  builder.addRect(startX + depth, startY + depth + height, width, depth, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Fold lines
  builder.addLine(startX + depth, startY + depth, startX + depth + width, startY + depth, {
    stroke: colors.fold,
    strokeWidth: 0.5,
    strokeDasharray: '1,1',
  })
  builder.addLine(
    startX + depth,
    startY + depth + height,
    startX + depth + width,
    startY + depth + height,
    { stroke: colors.fold, strokeWidth: 0.5, strokeDasharray: '1,1' }
  )

  return builder.toSVG()
}
