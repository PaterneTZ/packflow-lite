import { PackagingType, Dimensions, PrintSettings } from '../types'
import { Package, Layers3 } from 'lucide-react'

const PACKAGING_TYPES: { value: PackagingType; label: string }[] = [
  { value: 'straight-tuck-end', label: 'Straight Tuck End' },
  { value: 'reverse-tuck-end', label: 'Reverse Tuck End' },
  { value: 'mailer-box', label: 'Mailer Box' },
  { value: 'pizza-box', label: 'Pizza Box' },
  { value: 'shipping-box', label: 'Shipping Box' },
  { value: 'sleeve', label: 'Sleeve' },
  { value: 'stand-up-pouch', label: 'Stand-up Pouch' },
]

interface SidebarProps {
  packagingType: PackagingType
  setPackagingType: (type: PackagingType) => void
  dimensions: Dimensions
  setDimensions: (dims: Dimensions) => void
  settings: PrintSettings
  setSettings: (settings: PrintSettings) => void
}

export default function Sidebar({
  packagingType,
  setPackagingType,
  dimensions,
  setDimensions,
  settings,
  setSettings,
}: SidebarProps) {
  return (
    <div className="w-80 bg-dark-secondary border-r border-dark-tertiary overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-dark-tertiary">
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-6 h-6 text-orange" />
          <h1 className="text-2xl font-bold">PackFlow</h1>
        </div>
        <p className="text-sm text-gray-400">Professional Packaging Templates</p>
      </div>

      {/* Packaging Type Section */}
      <div className="p-6 border-b border-dark-tertiary">
        <h2 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <Layers3 className="w-4 h-4" />
          Packaging Type
        </h2>
        <select
          value={packagingType}
          onChange={(e) => setPackagingType(e.target.value as PackagingType)}
          className="input-field mb-2"
        >
          {PACKAGING_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dimensions Section */}
      <div className="p-6 border-b border-dark-tertiary">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Dimensions (mm)</h2>
        <div className="space-y-4">
          <div>
            <label className="label-text block mb-2">Width</label>
            <input
              type="number"
              value={dimensions.width}
              onChange={(e) => setDimensions({ ...dimensions, width: parseFloat(e.target.value) })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text block mb-2">Height</label>
            <input
              type="number"
              value={dimensions.height}
              onChange={(e) => setDimensions({ ...dimensions, height: parseFloat(e.target.value) })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text block mb-2">Depth</label>
            <input
              type="number"
              value={dimensions.depth}
              onChange={(e) => setDimensions({ ...dimensions, depth: parseFloat(e.target.value) })}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Print Settings Section */}
      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">Print Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="label-text block mb-2">Bleed (mm)</label>
            <input
              type="number"
              value={settings.bleed}
              onChange={(e) => setSettings({ ...settings, bleed: parseFloat(e.target.value) })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text block mb-2">Safe Zone (mm)</label>
            <input
              type="number"
              value={settings.safeZone}
              onChange={(e) => setSettings({ ...settings, safeZone: parseFloat(e.target.value) })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label-text block mb-2">Glue Tab (mm)</label>
            <input
              type="number"
              value={settings.glueTab}
              onChange={(e) => setSettings({ ...settings, glueTab: parseFloat(e.target.value) })}
              className="input-field"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
