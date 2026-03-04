import { dia, shapes } from '@joint/core'
import { useEffect } from 'react'
import '../../css/text.css'
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
    const rect1 = new shapes.standard.Rectangle()
      .position(50, 50)
      .resize(100, 40)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'Source', fill: 'balck' },
      })
      .addTo(graph)
    const rect2 = new shapes.standard.Rectangle()
      .position(100, 250)
      .resize(100, 40)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'Source', fill: 'balck' },
      })
      .addTo(graph)
    // appendLabel return label[] can only as the last one property
    const link = new shapes.standard.Link()
      .source(rect1)
      .target(rect2)
      .addTo(graph)
      //link algorithm
      .router('orthogonal')
      //link style
      .connector('straight', { cornerType: 'line' })
      .appendLabel({ attrs: { text: { text: 'to' } } })
    // const link = new shapes.standard.Link();
    // link.source(rect1);
    // link.target(rect2);
    // // 先设置 router 和 connector
    // link.router('orthogonal');
    // link.connector('straight', { cornerType: 'line' });
    // link.addTo(graph);
    // link.appendLabel({
    //     attrs: {
    //         text: {
    //             text: 'to the'
    //         }
    //     }
    // });
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
