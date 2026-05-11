import { useRef, useState, WheelEvent, MouseEvent } from 'react'
import { PackagingType, Dimensions, PrintSettings } from '../types'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { exportSVG, exportPDF } from '../utils/export'

interface SVGViewerProps {
  svgContent: string
  zoom: number
  setZoom: (zoom: number) => void
  pan: { x: number; y: number }
  setPan: (pan: { x: number; y: number }) => void
  packagingType: PackagingType
  dimensions: Dimensions
  settings: PrintSettings
}

export default function SVGViewer({
  svgContent,
  zoom,
  setZoom,
  pan,
  setPan,
  packagingType,
  dimensions,
  settings,
}: SVGViewerProps) {
  const svgRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newZoom = Math.max(0.1, Math.min(5, zoom * delta))
    setZoom(newZoom)
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  return (
    <div className="flex-1 flex flex-col bg-dark border-r border-dark-tertiary">
      {/* Toolbar */}
      <div className="border-b border-dark-tertiary px-4 py-3 flex items-center justify-between bg-dark-secondary">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(Math.max(0.1, zoom - 0.2))}
            className="btn-secondary p-2"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-400 w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(Math.min(5, zoom + 0.2))}
            className="btn-secondary p-2"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <div className="w-px h-6 bg-dark-tertiary mx-2" />
          <button onClick={handleReset} className="btn-secondary p-2" title="Reset View">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportSVG(svgContent, packagingType)}
            className="btn-primary"
          >
            Export SVG
          </button>
          <button
            onClick={() => exportPDF(svgContent, dimensions, settings)}
            className="btn-primary"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div
        ref={svgRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex-1 overflow-hidden bg-gradient-to-br from-dark-secondary via-dark to-dark-secondary cursor-grab active:cursor-grabbing"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(139, 92, 246, .05) 25%, rgba(139, 92, 246, .05) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, .05) 75%, rgba(139, 92, 246, .05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(139, 92, 246, .05) 25%, rgba(139, 92, 246, .05) 26%, transparent 27%, transparent 74%, rgba(139, 92, 246, .05) 75%, rgba(139, 92, 246, .05) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '50px 50px',
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
          className="inline-block"
        >
          <div dangerouslySetInnerHTML={{ __html: svgContent }} />
        </div>
      </div>
    </div>
  )
}
