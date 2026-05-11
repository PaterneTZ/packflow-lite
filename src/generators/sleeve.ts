import { Dimensions, PrintSettings, Colors } from '../types'
import { SVGBuilder } from '../utils/svgBuilder'

export function generateSleeve(
  dimensions: Dimensions,
  settings: PrintSettings,
  colors: Colors
): string {
  const builder = new SVGBuilder()
  const { width, height, depth } = dimensions
  const { bleed, safeZone, glueTab } = settings

  const circumference = (width + depth) * 2
  const totalWidth = circumference + glueTab + bleed * 2
  const totalHeight = height + bleed * 2

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

  // Main panel
  builder.addRect(startX, startY, circumference, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
  })

  // Glue tab
  builder.addRect(startX + circumference, startY, glueTab, height, {
    stroke: colors.cut,
    fill: 'none',
    strokeWidth: 1,
    strokeDasharray: '2,2',
  })

  // Fold lines for reference
  const foldX1 = startX + width
  const foldX2 = startX + width + depth
  const foldX3 = startX + circumference - width

  builder.addLine(foldX1, startY, foldX1, startY + height, {
    stroke: colors.fold,
    strokeWidth: 0.5,
    strokeDasharray: '1,1',
  })
  builder.addLine(foldX2, startY, foldX2, startY + height, {
    stroke: colors.fold,
    strokeWidth: 0.5,
    strokeDasharray: '1,1',
  })
  builder.addLine(foldX3, startY, foldX3, startY + height, {
    stroke: colors.fold,
    strokeWidth: 0.5,
    strokeDasharray: '1,1',
  })

  return builder.toSVG()
}
