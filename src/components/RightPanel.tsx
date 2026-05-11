import { Colors } from '../types'
import { Palette } from 'lucide-react'

const COLOR_LABELS = {
  cut: 'Cut Lines',
  fold: 'Fold Lines',
  bleed: 'Bleed Area',
  safe: 'Safe Zone',
}

interface RightPanelProps {
  colors: Colors
  setColors: (colors: Colors) => void
}

export default function RightPanel({ colors, setColors }: RightPanelProps) {
  return (
    <div className="w-80 bg-dark-secondary border-l border-dark-tertiary overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-dark-tertiary">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Palette className="w-5 h-5 text-orange" />
          Colors & Structure
        </h2>
      </div>

      {/* Color Pickers */}
      <div className="p-6 space-y-6">
        {(Object.keys(colors) as Array<keyof Colors>).map((key) => (
          <div key={key}>
            <label className="label-text block mb-3">
              {COLOR_LABELS[key]}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors[key]}
                onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                className="w-12 h-12 rounded-lg cursor-pointer border border-dark-tertiary"
              />
              <div className="flex-1">
                <input
                  type="text"
                  value={colors[key]}
                  onChange={(e) => setColors({ ...colors, [key]: e.target.value })}
                  className="input-field text-sm font-mono"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Information Section */}
      <div className="p-6 border-t border-dark-tertiary">
        <h3 className="text-sm font-semibold text-gray-300 mb-4">Legend</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.cut }} />
            <span className="text-gray-400">Cut lines for precision cutting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.fold }} />
            <span className="text-gray-400">Fold lines for assembly</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.bleed }} />
            <span className="text-gray-400">Bleed area for printing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.safe }} />
            <span className="text-gray-400">Safe zone for content</span>
          </div>
        </div>
      </div>
    </div>
  )
}
