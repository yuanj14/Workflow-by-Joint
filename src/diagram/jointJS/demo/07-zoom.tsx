import { shapes, ui } from '@joint/plus'
import { useEffect, useRef } from 'react'
import { useJointInit } from '@/hooks'

export default function ZoomComponent() {
  const { paperRef, graph, paper, paperScroller } = useJointInit(true)
  const toolbarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!graph || !paper || !paperScroller) return

    // ✨ 缩放事件
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

    // ✨ 创建元素
    const rect1 = new shapes.standard.Rectangle()
    rect1.position(30, 30)
    rect1.resize(180, 50)
    rect1.addTo(graph)

    const rect2 = new shapes.standard.Rectangle()
    rect2.position(50, 50)
    rect2.resize(180, 50)
    rect2.addTo(graph)

    rect1.attr('label', { text: 'Hello', fill: '#353535' })
    rect2.attr('label', { text: 'JointJS', fill: '#353535' })

    paperScroller.centerContent()

    // ✨ Toolbar
    const toolbar = new ui.Toolbar({
      tools: [
        'separator',
        'zoomToFit',
        { type: 'zoomSlider', min: 20, max: 500, step: 10 },
      ],
      references: { paperScroller },
    }).render()
    toolbarRef.current?.appendChild(toolbar.el)

    return () => {
      toolbar.remove()
    }
  }, [graph, paper, paperScroller])

  return (
    <div style={{ position: 'relative', width: '100%', height: '50vh' }}>
      <div
        ref={paperRef}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: '100px',
        }}
      />
      <div
        ref={toolbarRef}
        style={{ position: 'absolute', top: '15px', right: '30px', zIndex: 99 }}
      />
    </div>
  )
}
