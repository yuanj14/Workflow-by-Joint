import { mvc, shapes } from '@joint/plus'
import React, { useEffect } from 'react'
import '../../App.css'
import { useJointInit } from '../../global/hooks/useJointInit'
import { Temp } from '../../Temp'
export default function Events(): React.ReactElement {
  const { paper, graph, paperRef } = useJointInit()
  useEffect(() => {
    //剪枝
    if (paper === null) {
      return
    }
    solve()
    return () => {}
  }, [paper])
  const solve = () => {
    const rect1 = new shapes.standard.Rectangle()
      .position(100, 50)
      .resize(100, 100)
    const rect2 = rect1
      .clone()
      .set('position', { x: rect1.position().x + 100, y: rect1.position().y })
    graph.addCell([rect1, rect2])
    // evnetInit()
    graph.on('change:position', (cell) => {
      const center = cell.getBBox().center()
      const label = center.toString()
      cell.attr('label/text', label)
    })
  }

  const evnetInit = () => {
    const listener = new mvc.Listener()
    listener.listenTo(paper, 'element:pointerclick', (elementView) => {
      console.log('clicked on')
    })
  }

  return (
    <div>
      <h3>JointJS 事件处理</h3>
      <div ref={paperRef}></div>
      <Temp />
    </div>
  )
}
