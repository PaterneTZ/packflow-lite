import { useState } from 'react'
import Sidebar from './components/Sidebar'
import SVGViewer from './components/SVGViewer'
import RightPanel from './components/RightPanel'
import { PackagingType } from './types'
import { generatePackagingSVG } from './generators'

function App() {
  const [packagingType, setPackagingType] = useState<PackagingType>('straight-tuck-end')
  const [dimensions, setDimensions] = useState({ width: 200, height: 100, depth: 50 })
  const [settings, setSettings] = useState({
    bleed: 3,
    safeZone: 10,
    glueTab: 20,
  })
  const [colors, setColors] = useState({
    cut: '#FF0000',
    fold: '#0000FF',
    bleed: '#00FF00',
    safe: '#FFFF00',
  })
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })

  const svgContent = generatePackagingSVG(packagingType, dimensions, settings, colors)

  return (
    <div className="flex h-screen bg-dark text-white">
      {/* Left Sidebar */}
      <Sidebar
        packagingType={packagingType}
        setPackagingType={setPackagingType}
        dimensions={dimensions}
        setDimensions={setDimensions}
        settings={settings}
        setSettings={setSettings}
      />

      {/* Center SVG Viewer */}
      <SVGViewer
        svgContent={svgContent}
        zoom={zoom}
        setZoom={setZoom}
        pan={pan}
        setPan={setPan}
        packagingType={packagingType}
        dimensions={dimensions}
        settings={settings}
      />

      {/* Right Panel */}
      <RightPanel colors={colors} setColors={setColors} />
    </div>
  )
}

export default App
