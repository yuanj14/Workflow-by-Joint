import { dia, shapes } from '@joint/core'
import { useEffect } from 'react'
export default function ElementComponent() {
  // Joint init
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
    // Create element
    const rectangle = new shapes.standard.Rectangle()
    rectangle.resize(100, 100)
    // 右上角坐标 rectangle
    rectangle.position(0, 0)
    rectangle.attr('root/title', '悬浮提示')
    rectangle.attr('label/text', 'Rectangle')
    rectangle.attr('body/fill', 'lightblue')
    rectangle.attr('body/stroke', '#C94A46')
    rectangle.attr('body/strokeWidth', 2)
    rectangle.addTo(graph)
    const rect2 = new shapes.standard.Rectangle()
      .position(200, 50)
      .resize(100, 40)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'JointJs', fill: 'black' },
      })
      .addTo(graph)

    // ✨ 添加点击事件监听
    paper.on('cell:pointerclick', (cellView) => {
      console.log('Clicked Element Model:', cellView.model.toJSON())
      console.log('Element:', cellView.model)
    })

    return () => {}
  }, [])

  const explanationText = `// Create element
    const rect1 = new shapes.standard.Rectangle();
    rect1.position(50, 50);
    rect1.resize(100, 40);
    // Set attributes
    rect1.attr({
        body: { stroke:'#C94A46', rx:2, ry:2 },
        label: { text: "Hello", fill: "black" },
    })
    rect1.addTo(graph);
    const rect2 = new shapes.standard.Rectangle()
            .position(200, 50)
            .resize(100, 40)
            .attr({
                body: { stroke: "#C94A46", rx: 2, ry: 2 },
                label: { text: "JointJs", fill: "black" },
            })
            .addTo(graph);`
  return (
    <div>
      <div id="paper"></div>
      <p>
        Next, Let we add our element into digram.Each element needs a position
        and a size,then to be added to the Graph like:
      </p>
      <pre className="code-block">
        <code className="block">{explanationText}</code>
      </pre>
      <p>
        Among them, <code className="inline">resize</code> property changes the
        length and width of the rectangle,and attr is used to set the properies
        of the element with a object as parameter.For the specific meaning of
        each parameter, you can ask ChatGPT to be more clear.{' '}
      </p>
    </div>
  )
}
