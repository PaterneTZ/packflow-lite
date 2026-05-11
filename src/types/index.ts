export type PackagingType =
  | 'straight-tuck-end'
  | 'reverse-tuck-end'
  | 'mailer-box'
  | 'pizza-box'
  | 'shipping-box'
  | 'sleeve'
  | 'stand-up-pouch'

export interface Dimensions {
  width: number
  height: number
  depth: number
}

export interface PrintSettings {
  bleed: number
  safeZone: number
  glueTab: number
}

export interface Colors {
  cut: string
  fold: string
  bleed: string
  safe: string
}

export interface SVGPath {
  type: 'cut' | 'fold' | 'bleed' | 'safe'
  d: string
  stroke: string
}
