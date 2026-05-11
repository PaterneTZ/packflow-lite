# PackFlow Lite

> The simplest and fastest packaging template generator for graphic designers.

## Vision

PackFlow Lite is a modern tool that enables designers to automatically generate professional packaging templates without the need to manually construct die-lines.

The product is:
- **Ultra simple** – Just 3 steps: choose, enter, export
- **Fast** – Generate templates in seconds
- **Modern** – Premium UI inspired by Figma, Framer, Adobe
- **Stable** – Print-ready exports
- **Workflow-focused** – Solves real design problems

## Features

✅ **7 Packaging Types**
- Straight Tuck End
- Reverse Tuck End
- Mailer Box
- Pizza Box
- Shipping Box
- Sleeve
- Stand-up Pouch

✅ **Professional Templates**
- Automatic cut lines
- Fold lines
- Bleed area
- Safe zones
- Glue tabs

✅ **Dynamic SVG Viewer**
- Zoom & Pan
- Grid background
- Real-time preview
- Smooth transitions

✅ **Print-Ready Exports**
- SVG export (Illustrator-compatible)
- PDF export with proper dimensions

✅ **Customizable Colors**
- Edit cut, fold, bleed, and safe zone colors
- Color picker interface
- Hex value editing

## Tech Stack

- **React 18** – UI framework
- **TypeScript** – Type safety
- **Vite** – Build tool
- **Tailwind CSS** – Styling
- **SVG** – Vector graphics
- **pdf-lib** – PDF export

## Installation

```bash
# Clone the repository
git clone https://github.com/PaterneTZ/packflow-lite.git
cd packflow-lite

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Usage

1. **Choose a packaging type** – Select from the left sidebar
2. **Enter dimensions** – Width, height, depth in millimeters
3. **Adjust settings** – Bleed, safe zone, glue tab
4. **Customize colors** – Edit line colors in the right panel
5. **Export** – Download as SVG or PDF

## Architecture

```
src/
├── components/          # React components
│   ├── Sidebar.tsx     # Left sidebar with controls
│   ├── SVGViewer.tsx   # Central SVG canvas
│   └── RightPanel.tsx  # Right panel with colors
├── generators/         # Geometry engines
│   ├── straightTuckEnd.ts
│   ├── reverseTuckEnd.ts
│   ├── mailerBox.ts
│   ├── pizzaBox.ts
│   ├── shippingBox.ts
│   ├── sleeve.ts
│   └── standUpPouch.ts
├── utils/             # Utilities
│   ├── svgBuilder.ts  # SVG generation
│   └── export.ts      # Export functions
├── types/             # TypeScript types
├── App.tsx            # Main app component
└── main.tsx           # Entry point
```

## Design System

### Colors
- **Dark**: `#0a0a0a`
- **Dark Secondary**: `#1a1a1a`
- **Dark Tertiary**: `#2a2a2a`
- **Violet**: `#8b5cf6`
- **Violet Light**: `#a78bfa`
- **Orange**: `#f97316`
- **Orange Light**: `#fb923c`

### Typography
- **Font**: Inter, system-ui, sans-serif
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

## Performance

- Lightweight – ~45KB gzipped
- No unnecessary dependencies
- Optimized SVG generation
- Instant preview updates

## Future Roadmap

- [ ] Adobe Illustrator plugin
- [ ] Custom templates
- [ ] Template library
- [ ] Batch export
- [ ] Team collaboration features
- [ ] Cloud storage

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

## License

MIT

## Support

For issues, questions, or feature requests, please create a GitHub issue.
