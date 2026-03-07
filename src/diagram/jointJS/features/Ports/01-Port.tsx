import { useJointInit } from '@/hooks'
import { shapes } from '@joint/plus'
import { useEffect } from 'react'

export default function PortComponent() {
  const { paperRef, graph, paperScroller } = useJointInit(true, {
    gridSize: 1,
    defaultLink: () => new shapes.standard.Link(),
    defaultConnectionPoint: { name: 'boundary' },
  })

  useEffect(() => {
    if (!graph || !paperScroller) return

    const port = {
      label: {
        position: { name: 'left' },
        markup: [{ tagName: 'text', selector: 'label' }],
      },
      attrs: {
        portBody: {
          magnet: true,
          width: 16,
          height: 16,
          x: -8,
          y: -8,
          fill: '#03071E',
        },
        label: { text: 'port' },
      },
      markup: [{ tagName: 'rect', selector: 'portBody' }],
    }

    const model = new shapes.standard.Rectangle({
      position: { x: 275, y: 50 },
      size: { width: 90, height: 90 },
      attrs: { body: { fill: '#8ECAE6' } },
      ports: { items: [port] },
    })

    graph.addCell(model)
    paperScroller.centerContent()

    return () => {
      graph.clear()
    }
  }, [paperScroller])

  return (
    <div style={{ width: '100%', height: '320px' }}>
      <h2>PortComponent Example</h2>
      <div ref={paperRef} style={{ width: '100%', height: '260px' }} />
    </div>
  )
}
