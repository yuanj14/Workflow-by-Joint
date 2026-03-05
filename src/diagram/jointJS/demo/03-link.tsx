import { dia, shapes } from '@joint/core'
import { useEffect } from 'react'
export default function LinkComponent() {
  useEffect(() => {
    const namespace = shapes
    const graph = new dia.Graph({}, { cellNamespace: namespace })
    const paper = new dia.Paper({
      el: document.getElementById('paper'),
      model: graph,
      width: '100%',
      height: 300,
      background: { color: '#F5F5F5' },
      cellViewNamespace: namespace,
    })
    // ✨ 自定义Rectangle markup，添加highlight层用于选中蓝色高亮
    const highlightAttr = {
      ref: 'body',
      width: 'calc(w)',
      height: 'calc(h)',
      rx: 4,
      ry: 4,
      fill: 'none',
      stroke: 'transparent',
      strokeWidth: 4,
    }

    const rect1 = new shapes.standard.Rectangle({
      position: { x: 50, y: 50 },
      size: { width: 100, height: 40 },
      attrs: {
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'Source', fill: 'black' },
        highlight: highlightAttr,
      },
      markup: [
        { tagName: 'rect', selector: 'highlight' },
        { tagName: 'rect', selector: 'body' },
        { tagName: 'text', selector: 'label' },
      ],
    }).addTo(graph)

    const rect2 = new shapes.standard.Rectangle({
      position: { x: 100, y: 250 },
      size: { width: 100, height: 40 },
      attrs: {
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'Source', fill: 'black' },
        highlight: highlightAttr,
      },
    }).addTo(graph)

    const link = new shapes.standard.Link({
      source: rect1,
      target: rect2,
      markup: [
        { tagName: 'path', selector: 'wrapper' },
        { tagName: 'path', selector: 'outline' },
        { tagName: 'path', selector: 'line' },
      ],
      attrs: {
        wrapper: {
          fill: 'none',
          cursor: 'pointer',
          stroke: 'transparent',
          strokeWidth: 10,
        },
        outline: {
          connection: true,
          fill: 'none',
          pointerEvents: 'none',
          stroke: 'transparent',
          strokeWidth: 4,
          strokeLinejoin: 'round',
          strokeLinecap: 'butt',
          targetMarker: {
            type: 'path',
            d: 'M 0 0 L 10 5 L 10 -5 Z',
            fill: 'transparent',
            stroke: 'transparent',
            strokeWidth: 4,
          },
        },
        line: {
          fill: 'none',
          stroke: '#333',
          strokeWidth: 1,
          targetMarker: { d: 'M 0 0 L 10 5 L 10 -5 Z', fill: '#333' },
        },
      },
    })
    // 📌 router - 路由算法（如何计算连线路径）
    // orthogonal: 正交路由（直角转折） ✨ Simulink 风格
    // manhattan: 同 orthogonal
    // metro: 地铁线风格（更平滑）
    link.router('orthogonal', { padding: 10 })

    // 📌 connector - 连接器（路径的渲染方式）
    // straight: 直线连接
    link.connector('straight')
    link.connector('straight', { cornerType: 'cubic', cornerRadius: 20 })
    link.connector('jumpover', { type: 'gap' })
    link.addTo(graph)

    let selectedCell: dia.CellView | null = null

    function clearSelection() {
      if (!selectedCell) return
      if (selectedCell.model.isLink?.()) {
        selectedCell.model.attr('outline/stroke', 'transparent')
        selectedCell.model.attr('outline/targetMarker/fill', 'transparent')
        selectedCell.model.attr('outline/targetMarker/stroke', 'transparent')
      } else {
        selectedCell.model.attr('highlight/stroke', 'transparent')
      }
      selectedCell = null
    }

    paper.on('cell:pointerclick', (cellView) => {
      console.log('Clicked Element Model:', cellView.model.toJSON())
      console.log('Element:', cellView.model)

      // 移除之前的高亮
      clearSelection()

      // Link高亮
      if (cellView.model.isLink?.()) {
        selectedCell = cellView
        cellView.model.attr('outline/stroke', '#1890FF')
        cellView.model.attr('outline/targetMarker/fill', '#1890FF')
        cellView.model.attr('outline/targetMarker/stroke', '#1890FF')
      }
      // Element高亮
      else if (cellView.model.isElement?.()) {
        selectedCell = cellView
        cellView.model.attr('highlight/stroke', '#1890FF')
      }
    })

    // 点击空白区域移除高亮
    paper.on('blank:pointerclick', () => {
      clearSelection()
    })

    return () => {}
  }, [])
  const ExplanationText = `const rect1 = new shapes.standard.Rectangle()
            .position(50, 50)
            .resize(100, 40)
            .attr({
                body: { stroke: '#C94A46', rx: 2, ry: 2 },
                label: { text: 'Source', fill: "balck" }
            })
            .addTo(graph)
        const rect2 = new shapes.standard.Rectangle()
            .position(200, 50)
            .resize(100, 40)
            .attr({
                body: { stroke: '#C94A46', rx: 2, ry: 2 },
                label: { text: 'Source', fill: "balck" }
            })
            .addTo(graph)
        const link = new shapes.standard.Link()
            .source(rect1)
            .target(rect2)
            .router('orthogonal')
            .connector('straight', {  cornerType: 'line' })
            .addTo(graph)
            .appendLabel({
                attrs : {
                    text : {
                        text : 'to'
                    }
                }
            })`
  return (
    <div>
      <div id="paper"></div>
      <h2>Linke Component example</h2>
      <p>
        As a next step,let we connect two elements with a{' '}
        <code className="inline">linke</code>
        We need to specify two elements as the source and target in a link
        instance,and we also need to make it clear that the Link belong to our
        Graph Model(Data/Controller layout).
      </p>
      <p>
        Finally, A better way to code elements in JointJs called `Method
        Chaining`. In combination with the above, we have sample code as
        follows:{' '}
      </p>
      <pre className="code-block">
        <code className="block">{ExplanationText}</code>
      </pre>
    </div>
  )
}
