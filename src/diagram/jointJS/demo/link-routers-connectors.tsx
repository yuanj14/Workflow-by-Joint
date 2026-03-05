import { dia, shapes } from '@joint/core'
import { useEffect } from 'react'

/**
 * ✨ Link Router & Connector 常用配置演示
 *
 * Router: 计算连线的路径（从 source 到 target）
 * Connector: 如何渲染这条路径（直线、曲线等）
 */
export default function LinkRoutersConnectors() {
  useEffect(() => {
    const namespace = shapes
    const graph = new dia.Graph({}, { cellNamespace: namespace })
    const paper = new dia.Paper({
      el: document.getElementById('paper'),
      model: graph,
      width: '100%',
      height: 600,
      background: { color: '#F5F5F5' },
      cellViewNamespace: namespace,
      defaultRouter: { name: 'orthogonal', args: { padding: 20 } },
    })

    // 共用的高亮属性
    const highlightAttr = {
      fill: 'none',
      stroke: 'transparent',
      strokeWidth: 4,
    }

    // ───────────────────────────────────────────────────────────────
    // 📝 Example 1: orthogonal + straight (Simulink 风格)
    // ───────────────────────────────────────────────────────────────
    console.group('Example 1: orthogonal + straight (Simulink风格)')
    console.log('Router: orthogonal - 正交路由，转折点形成直角')
    console.log('Connector: straight - 直线连接，cornerType 控制转折圆滑度')
    console.groupEnd()

    const elem1_1 = new shapes.standard.Rectangle({
      position: { x: 50, y: 30 },
      size: { width: 80, height: 40 },
      attrs: {
        body: { fill: '#e8f4f8', stroke: '#0288d1', strokeWidth: 2 },
        label: { text: 'Input', fontSize: 12 },
      },
    }).addTo(graph)

    const elem1_2 = new shapes.standard.Rectangle({
      position: { x: 300, y: 30 },
      size: { width: 80, height: 40 },
      attrs: {
        body: { fill: '#e8f4f8', stroke: '#0288d1', strokeWidth: 2 },
        label: { text: 'Output', fontSize: 12 },
      },
    }).addTo(graph)

    const link1 = new shapes.standard.Link({
      source: elem1_1,
      target: elem1_2,
      attrs: {
        line: {
          stroke: '#333',
          strokeWidth: 2,
          fill: 'none',
          targetMarker: { d: 'M 0 0 L 10 5 L 10 -5 Z', fill: '#333' },
        },
      },
      markup: [{ tagName: 'path', selector: 'line' }],
    })
    link1.router('orthogonal', { padding: 20 })
    link1.connector('straight', { cornerType: 'line' })
    link1.addTo(graph)

    // ───────────────────────────────────────────────────────────────
    // 📝 Example 2: orthogonal + curve (平滑风格)
    // ───────────────────────────────────────────────────────────────
    console.group('Example 2: orthogonal + curve (平滑风格)')
    console.log('Router: orthogonal - 基础正交路由')
    console.log('Connector: curve - 贝塞尔曲线，线段更平滑')
    console.groupEnd()

    const elem2_1 = new shapes.standard.Rectangle({
      position: { x: 50, y: 130 },
      size: { width: 80, height: 40 },
      attrs: {
        body: { fill: '#f3e5f5', stroke: '#7b1fa2', strokeWidth: 2 },
        label: { text: 'Start', fontSize: 12 },
      },
    }).addTo(graph)

    const elem2_2 = new shapes.standard.Rectangle({
      position: { x: 300, y: 130 },
      size: { width: 80, height: 40 },
      attrs: {
        body: { fill: '#f3e5f5', stroke: '#7b1fa2', strokeWidth: 2 },
        label: { text: 'End', fontSize: 12 },
      },
    }).addTo(graph)

    const link2 = new shapes.standard.Link({
      source: elem2_1,
      target: elem2_2,
      attrs: {
        line: {
          stroke: '#7b1fa2',
          strokeWidth: 2,
          fill: 'none',
          targetMarker: { d: 'M 0 0 L 10 5 L 10 -5 Z', fill: '#7b1fa2' },
        },
      },
      markup: [{ tagName: 'path', selector: 'line' }],
    })
    link2.router('orthogonal', { padding: 20 })
    link2.connector('curve') // 平滑曲线
    link2.addTo(graph)

    // ───────────────────────────────────────────────────────────────
    // 📝 Example 3: manhattan + smooth (地铁风格)
    // ───────────────────────────────────────────────────────────────
    console.group('Example 3: manhattan + smooth (地铁风格)')
    console.log('Router: manhattan - 同 orthogonal，别名')
    console.log('Connector: smooth - 高度光滑的贝塞尔曲线')
    console.groupEnd()

    const elem3_1 = new shapes.standard.Rectangle({
      position: { x: 50, y: 230 },
      size: { width: 80, height: 40 },
      attrs: {
        body: { fill: '#e0f2f1', stroke: '#00897b', strokeWidth: 2 },
        label: { text: 'A', fontSize: 12 },
      },
    }).addTo(graph)

    const elem3_2 = new shapes.standard.Rectangle({
      position: { x: 300, y: 230 },
      size: { width: 80, height: 40 },
      attrs: {
        body: { fill: '#e0f2f1', stroke: '#00897b', strokeWidth: 2 },
        label: { text: 'B', fontSize: 12 },
      },
    }).addTo(graph)

    const link3 = new shapes.standard.Link({
      source: elem3_1,
      target: elem3_2,
      attrs: {
        line: {
          stroke: '#00897b',
          strokeWidth: 2,
          fill: 'none',
          targetMarker: { d: 'M 0 0 L 10 5 L 10 -5 Z', fill: '#00897b' },
        },
      },
      markup: [{ tagName: 'path', selector: 'line' }],
    })
    link3.router('manhattan', { padding: 20 })
    link3.connector('smooth') // 光滑曲线
    link3.addTo(graph)

    // ───────────────────────────────────────────────────────────────
    // 📝 Simulink 风格总结
    // ───────────────────────────────────────────────────────────────
    console.group('【Simulink 风格推荐】')
    console.table({
      配置: 'orthogonal + straight',
      描述: '正交路由 + 直线连接，转折形成直角',
      特点: '清晰、工业风格',
      适用: 'Simulink、逻辑图、流程图',
    })
    console.log('')
    console.log('常用参数：')
    console.log(
      '• router("orthogonal", { padding: 20 }) - padding 控制转折距离',
    )
    console.log(
      '• connector("straight", { cornerType: "line" }) - cornerType: "line"/"neon"/"round"',
    )
    console.log('• connector("curve") - 贝塞尔曲线（推荐用于复杂图表）')
    console.log('• connector("smooth") - 完全光滑（推荐用于流程图）')
    console.groupEnd()
  }, [])

  return (
    <div id="paper" style={{ border: '1px solid #ccc', minHeight: '600px' }} />
  )
}
