import { dia, format, shapes, ui, util } from '@joint/plus'
import { useEffect } from 'react'
export default function ToolComponent() {
  useEffect(() => {
    const namespace = shapes
    const graph = new dia.Graph({}, { cellNamespace: namespace })
    const paper = new dia.Paper({
      el: document.getElementById('paper'),
      model: graph,
      width: '50%',
      height: 300,
      background: { color: '#F5F5F5' },
      cellViewNamespace: namespace,
      defaultRouter: { name: 'orthogonal' },
      defaultConnector: { name: 'straight', args: { cornerType: 'line' } },
    })

    const rect1 = new shapes.standard.Rectangle()
      .position(50, 50)
      .resize(150, 50)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'guodd', fill: 'black' },
      })
      .addTo(graph)
    const rect2 = new shapes.standard.Rectangle()
      .position(50, 150)
      .resize(150, 50)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'liss', fill: 'black' },
      })
      .addTo(graph)
    const toolbar = new ui.Toolbar({
      tools: [
        { type: 'button', name: 'json', text: 'Export JSON' },
        { type: 'button', name: 'svg', text: 'Export SVG' },
      ],
    }).render()
    document.getElementById('toolbar')?.appendChild(toolbar.el)
    toolbar.on('json:pointerclick', () => {
      const str = JSON.stringify(graph.toJSON())
      const bytes = new TextEncoder().encode(str)
      const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' })
      util.downloadBlob(blob, 'joint-plus.json')
    })
    toolbar.on('svg:pointerclick', () => {
      format.toSVG(
        paper,
        (svg: any) => {
          util.downloadDataUri(
            `data:image/svg+xml,${encodeURIComponent(svg)}`,
            'joint-plus.svg',
          )
        },
        { useComputedStyles: false },
      )
    })
    return () => {
      toolbar.remove()
    }
  }, [])

  return (
    <div>
      <div id="paper"></div>
      <div id="toolbar"></div>
    </div>
  )
}
