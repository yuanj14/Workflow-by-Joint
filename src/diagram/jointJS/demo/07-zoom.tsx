import { dia, shapes, ui } from '@joint/plus'
import { useEffect } from 'react'
export default function ZoomComponent() {
  useEffect(() => {
    const namespace = shapes
    const graph = new dia.Graph({}, { cellNamespace: namespace })
    const paperEl = document.getElementById('paper')!
    const paper = new dia.Paper({
      model: graph,
      background: { color: '#F5F5F5' },
      cellViewNamespace: namespace,
      defaultRouter: { name: 'orthogonal' },
      defaultConnector: { name: 'straight', args: { cornerType: 'line' } },
    })

    const paperScroller = new ui.PaperScroller({
      paper: paper,
      scrollWhileDragging: true,
      // ✨ autoResizePaper: 让 paper 自动扩展到填充 scroller 可视区域
      autoResizePaper: true,
      // ✨ borderless: 去掉 PaperScroller 外围的黑色边框
      borderless: true,
    }).render()

    paperEl.appendChild(paperScroller.el)
    // ✨ 让 PaperScroller 填满 #paper 容器
    paperScroller.el.style.width = '100%'
    paperScroller.el.style.height = '100%'
    paperScroller.el.style.scrollbarWidth = 'none'

    paper.on('paper:pinch', (_evt, ox, oy, scale) => {
      const zoom = paperScroller.zoom()
      paperScroller.zoom(zoom * scale, {
        min: 0.2,
        max: 5,
        ox,
        oy,
        absolute: true,
      })
    })
    paper.on('paper:mousewheel', (_evt, ox, oy, delta) => {
      const zoom = paperScroller.zoom()
      paperScroller.zoom(zoom + delta * 0.1, {
        min: 0.2,
        max: 5,
        ox,
        oy,
        absolute: true,
      })
    })
    // create elements
    const rect1 = new shapes.standard.Rectangle()
    rect1.position(30, 30)
    rect1.resize(180, 50)
    rect1.addTo(graph)

    const rect2 = new shapes.standard.Rectangle()
    rect2.position(50, 50)
    rect2.resize(180, 50)
    rect2.addTo(graph)

    rect1.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 })
    rect2.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 })

    rect1.attr('label', { text: 'Hello', fill: '#353535' })
    rect2.attr('label', { text: 'World!', fill: '#353535' })

    paperScroller.centerContent()
    const toolbar = new ui.Toolbar({
      tools: [
        'separator',
        'zoomToFit',
        {
          type: 'zoomSlider',
          min: 20, // 20%
          max: 500, // 500%
          step: 10, // 每次 ±10%
        },
      ],
      references: { paperScroller: paperScroller },
    }).render()
    document.getElementById('toolbar')?.appendChild(toolbar.el)
    return () => {
      toolbar.remove()
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '50vh' }}>
      <div
        id="paper"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: '100px',
        }}
      />
      <div
        id="toolbar"
        style={{ position: 'absolute', top: '15px', right: '30px', zIndex: 99 }}
      />
    </div>
  )
}
