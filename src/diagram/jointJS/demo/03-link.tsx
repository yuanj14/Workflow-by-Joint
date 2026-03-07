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
      fill: 'none',
      stroke: 'transparent',
      strokeWidth: 2,
    }

    const rect1 = new shapes.standard.Rectangle({
      position: { x: 50, y: 50 },
      size: { width: 100, height: 40 },
      attrs: {
        body: { strokeWidth:0, rx: 2, ry: 2 },
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
          connection: true, // 绑定 link 的真实路径
          fill: 'none',
          pointerEvents: 'none',
          stroke: 'transparent',
          strokeWidth: 3,
          strokeLinejoin: 'round',
          strokeLinecap: 'butt',
          targetMarker: {
            type: 'path',
            d: 'M 0 0 L 10 5 L 10 -5 Z',
            fill: 'transparent',
            stroke: 'transparent',
            strokeWidth: 3,
          },
        },
        line: {
          fill: 'none',
          stroke: '#333',
          strokeWidth: 0.5,
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
    link.connector('jumpover', { type: 'gap' })
    link.connector('straight', { cornerType: 'cubic', cornerRadius: 20 })
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
        console.log('Element:', cellView.model)
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
  return (
    <>
      <div id="paper"></div>
    </>
  )
}
