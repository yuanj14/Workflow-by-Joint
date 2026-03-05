import { dia, shapes } from '@joint/core'
import { useEffect } from 'react'

/**
 * ✨ 验证 markup、selector、attrs 三者的关系
 * 
 * 核心概念：
 * 1. markup - 定义 SVG 结构（虚拟 DOM）
 * 2. selector - 是 markup 中元素的 ID/引用标识（不是 CSS className）
 * 3. attrs - 针对 selector 的属性/样式映射（相当于为特定选择器的元素赋予属性）
 */
export default function ConceptValidation() {
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
    })

    const elem1 = new shapes.standard.Rectangle({
      position: { x: 50, y: 50 },
      size: { width: 150, height: 80 },
      markup: [
        { tagName: 'rect', selector: 'body' },      // 根据 selector 名称，在 attrs 中查找对应配置
        { tagName: 'text', selector: 'label' },
      ],
      // 📌 step 2: 定义 attrs（属性映射）
      attrs: {
        // key: 'body' 对应 markup 中 selector: 'body' 的 rect 元素
        body: {
          fill: '#ff6b6b',
          stroke: '#c92a2a',
          strokeWidth: 2,
          rx: 4,
          // 这些是 SVG 属性，不是 CSS！
          width: 'calc(w/2)',    // JointJS 特殊计算
          height: 'calc(h)',
        },
        // key: 'label' 对应 markup 中 selector: 'label' 的 text 元素
        label: {
          text: 'Element 1',
          fill: 'white',
          fontSize: 14,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          x: 'calc(0.5*w)',
          y: 'calc(0.5*h)',
        },
      },
    }).addTo(graph)

    const elem3 = new shapes.standard.Rectangle({
      position: { x: 50, y: 290 },
      size: { width: 150, height: 100 },
      markup: [
        { tagName: 'rect', selector: 'body' },        // 主体
        { tagName: 'circle', selector: 'dot' },       // 装饰点
        { tagName: 'text', selector: 'desc' },        // 描述
      ],
      attrs: {
        dot: {
          cx: 'calc(w - 10)',
          cy: 10,
          r: 5,
          fill: '#f38181',
        },
        title: {
          text: 'Multi-Layer',
          fontWeight: 'bold',
          x: 'calc(0.5*w)',
          y: 25,
          textAnchor: 'middle',
        },
        desc: {
          text: '2th',
          x: 'calc(0.5*w)',
          y: 'calc(0.5*h )',
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
        },
      },
    }).addTo(graph)
  }, [])

  return <div id="paper" style={{ border: '1px solid #ccc' }} />
}
