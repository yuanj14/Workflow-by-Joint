import { dia, shapes } from '@joint/plus'
import React, { useEffect, useRef } from 'react'
import '../../App.css'
import { MyShape } from '../CustomizingShapes/Myshape' // 导入自定义形状

export default function GraphComponent(): React.ReactElement {
  // 类型化的 ref
  const graphRef = useRef<dia.Graph | null>(null)
  const paperRef = useRef<HTMLDivElement>(null)
  const paperInstanceRef = useRef<dia.Paper | null>(null)

  const namespace = { ...shapes, MyShape }

  useEffect(() => {
    const graph = new dia.Graph({}, { cellNamespace: namespace })
    graphRef.current = graph

    // 创建画布实例
    if (paperRef.current && graphRef.current) {
      const paper = new dia.Paper({
        el: paperRef.current,
        model: graph,
        width: '100%',
        height: 600,
        // gridSize: 10,
        // drawGrid: true,
        cellViewNamespace: namespace,
        background: { color: '#f5f5f5' },
      })
      paperInstanceRef.current = paper

      // 创建自定义形状实例并添加到图形中
      const myShape = new MyShape({
        position: { x: 100, y: 100 }, // 重要：设置位置
        size: { width: 150, height: 80 }, // 确保尺寸正确
      })
      // 添加到图形
      graph.addCell(myShape)

      // 添加一个标准矩形作为对比
      const standardRect = new shapes.standard.Rectangle({
        position: { x: 400, y: 100 },
        size: { width: 150, height: 80 },
        attrs: {
          body: { fill: '#e0e0e0' },
          label: { text: 'Standard Rectangle' },
        },
      })
      graph.addCell(standardRect)

      // 清理函数
      return () => {
        // paper.remove();
        // paperInstanceRef.current = null;
        // graphRef.current = null;
      }
    } else {
      console.error('namespace or paper container div is null')
    }
  }, [])

  return (
    <div>
      <h3>JointJS 图形展示</h3>
      <div ref={paperRef} />
    </div>
  )
}
