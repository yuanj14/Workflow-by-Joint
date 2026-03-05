import '@joint/plus/joint-plus.css'
import { useState } from 'react'
import PaperDemo from './demo/01-paper'
import ElementDemo from './demo/02-element'
import LinkDemo from './demo/03-link'
import PaletteDemo from './demo/04-palette'
import EditOverlayDemo from './demo/05-editoverlay'
import ToolbarDemo from './demo/06-toolbar'
import ZoomDemo from './demo/07-zoom'
import PropertyEditDemo from './demo/08-propertyedit'

const demos = [
  { key: '01-paper', label: '01 - Paper', Component: PaperDemo },
  { key: '02-element', label: '02 - Element', Component: ElementDemo },
  { key: '03-link', label: '03 - Link', Component: LinkDemo },
  { key: '04-palette', label: '04 - Palette', Component: PaletteDemo },
  {
    key: '05-editoverlay',
    label: '05 - Edit Overlay',
    Component: EditOverlayDemo,
  },
  { key: '06-toolbar', label: '06 - Toolbar', Component: ToolbarDemo },
  { key: '07-zoom', label: '07 - Zoom', Component: ZoomDemo },
  {
    key: '08-propertyedit',
    label: '08 - Property Edit',
    Component: PropertyEditDemo,
  },
]

export default function JointJSViewer() {
  const [activeDemoKey, setActiveDemoKey] = useState(demos[0].key)
  const activeDemo =
    demos.find((demo) => demo.key === activeDemoKey) ?? demos[0]
  const ActiveDemoComponent = activeDemo.Component

  return (
    <div style={{ padding: '32px', fontFamily: 'Inter, sans-serif' }}>
      <div
        style={{
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
        <label style={{ fontWeight: 600 }}>Select demo:</label>
        <select
          value={activeDemoKey}
          onChange={(event) => setActiveDemoKey(event.target.value)}
          style={{
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            background: 'white',
          }}>
          {demos.map((demo) => (
            <option key={demo.key} value={demo.key}>
              {demo.label}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '16px',
          padding: '24px',
          background: 'white',
          boxShadow: '0 12px 24px rgba(15, 15, 15, 0.08)',
        }}>
        <ActiveDemoComponent />
      </div>
    </div>
  )
}
