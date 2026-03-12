import { useJointInit } from '@/hooks'
import { dia, shapes } from '@joint/plus'
import { useEffect } from 'react'

export default function Temp() {
  const { paperRef, graph, paper, paperScroller } = useJointInit(true, {
    gridSize: 1,
    defaultLink: () => new shapes.standard.Link(),
    defaultConnectionPoint: { name: 'boundary' },
  })

  useEffect(() => {
    if (!graph || !paper || !paperScroller) return

    // ✨ 使用标准 Rectangle + 自定义 ports 配置
    const sumBlock = new shapes.standard.Rectangle({
      position: { x: 200, y: 150 },
      size: { width: 120, height: 100 },
      attrs: {
        body: { fill: '#FFD60A', stroke: '#000', strokeWidth: 2 },
        label: {
          text: 'Sum Block',
          textVerticalAnchor: 'top',
          refY: '50%',
          refY2: 10,
          cursor: 'text',
        },
      },
      ports: {
        items: [
          { id: 'in1', group: 'in' },
          { id: 'in2', group: 'in' },
          { id: 'out', group: 'out' },
        ],
        groups: {
          in: {
            position: 'left',
            label: { position: 'outside' },
            attrs: {
              portBody: { r: 6, fill: '#003049', stroke: '#000', magnet: true },
            },
          },
          out: {
            position: 'right',
            attrs: {
              portBody: { r: 6, fill: '#FB5607', stroke: '#000', magnet: true },
            },
          },
        },
      },
    })

    graph.addCell(sumBlock)

    // 📝 用 paper.on 监听，通过 data-selector 区分 body / label
    paper.on(
      'element:pointerdown',
      (elementView: dia.ElementView, evt: dia.Event) => {
        const target = evt.target as SVGElement
        // ✨ 用原生 querySelector 替代 findNode，JointJS 在 DOM 上标记 data-selector
        const labelNode = elementView.el.querySelector<SVGElement>(
          '[joint-selector="label"]',
        )
        const isLabel = labelNode?.contains(target)

        if (isLabel) {
          // ✨ 禁用拖拽，pointerup 时恢复
          elementView.setInteractivity({ elementMove: false })

          console.log('✨ 点击了 Label Text:', labelNode?.textContent)
        } else {
          console.log('✨ 点击了 Body')
        }
      },
    )
    paperScroller.centerContent()
    return () => {
      graph.clear()
    }
  }, [graph, paper, paperScroller])

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <h2 style={{ margin: '16px 0 0 16px' }}>SumBlock Experiment</h2>
      <div ref={paperRef} style={{ flex: 1 }} />
    </div>
  )
}
