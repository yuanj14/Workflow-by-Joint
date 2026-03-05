import { useJointInit } from '@/hooks'
import { shapes } from '@joint/plus'
import { useEffect } from 'react'

export default function Links() {
  const { paperRef, graph, paper } = useJointInit()
  useEffect(() => {
    if (!paper || !graph) return
    // 创建源元素
    const sourceElement = new shapes.standard.Rectangle({
      position: { x: 100, y: 100 },
      size: { width: 100, height: 60 },
    })

    const targetElement = new shapes.standard.Rectangle({
      position: { x: 300, y: 100 },
      size: { width: 100, height: 60 },
      attrs: { label: { text: 'Target', fill: 'black' } },
    })
    const element3 = sourceElement.clone().set('position', { x: 100, y: 200 })
    const linkA = new shapes.standard.Link({
      source: { id: sourceElement.id },
      target: { id: targetElement.id },
      attrs: {
        line: { stroke: 'blue' },
      },
    })
    linkA.appendLabel({ attrs: { text: { text: 'to the' } } })
    const linkB = new shapes.standard.Link({
      target: { id: element3.id },
      attrs: { line: { stroke: 'red' } },
    })

    linkB.source(linkA, {
      linkAnchor: { name: 'connectionRatio', args: { ratio: 0.8 } },
    })

    graph.addCell([linkA, linkB, sourceElement, targetElement, element3])
    paper.on('cell:pointerclick', (cellView) => {
      const cell = cellView.model
      console.log(cell)
    })
  }, [paper])

  return (
    <>
      <div>Joint Links</div>
      <div ref={paperRef}></div>
    </>
  )
}
