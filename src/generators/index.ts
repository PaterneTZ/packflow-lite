import { PackagingType, Dimensions, PrintSettings, Colors } from '../types'
import { generateStraightTuckEnd } from './straightTuckEnd'
import { generateReverseTuckEnd } from './reverseTuckEnd'
import { generateMailerBox } from './mailerBox'
import { generatePizzaBox } from './pizzaBox'
import { generateShippingBox } from './shippingBox'
import { generateSleeve } from './sleeve'
import { generateStandUpPouch } from './standUpPouch'

export function generatePackagingSVG(
  type: PackagingType,
  dimensions: Dimensions,
  settings: PrintSettings,
  colors: Colors
): string {
  const generators = {
    'straight-tuck-end': generateStraightTuckEnd,
    'reverse-tuck-end': generateReverseTuckEnd,
    'mailer-box': generateMailerBox,
    'pizza-box': generatePizzaBox,
    'shipping-box': generateShippingBox,
    'sleeve': generateSleeve,
    'stand-up-pouch': generateStandUpPouch,
  }

  const generator = generators[type]
  return generator(dimensions, settings, colors)
}
