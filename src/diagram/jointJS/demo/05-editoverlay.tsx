import { dia, shapes, ui } from '@joint/plus'
export default function EditComponent() {
  useEffect(() => {
    const namespace = shapes
    const graph = new dia.Graph({}, { cellNamespace: namespace })
    const paper = new dia.Paper({
      el: document.getElementById('paper'),
      model: graph,
      width: '50%',
      height: 300,
      background: { color: '#F5F5F5' },
      cellViewNamespace: namespace,
      defaultRouter: { name: 'orthogonal' },
      defaultConnector: { name: 'jumpover', args: { type : 'cubic'} },
    })    
    const rect1 = new shapes.standard.Rectangle()
      .position(50, 50)
      .resize(150, 50)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'guodd', fill: 'black' },
      })
      .addTo(graph)
    const rect2 = new shapes.standard.Rectangle()
      .position(50, 150)
      .resize(150, 50)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'liss', fill: 'black' },
      })
      .addTo(graph)
    paper.on('cell:pointerup', (cellView) => {
      openHalo(cellView)
    })
    function openHalo(cellView: any) {
      new ui.Halo({ cellView: cellView }).render()
    }
    return () => {}
  }, [])
  const ExplanationText = ` paper.on('cell:pointerup', (cell) => {
            openHalo(cell)
        })
        function openHalo(cell: any) {
            new ui.Halo({ cellView: cell }).render()
        }`
  return (
    <div>
      <div id="paper"></div>
      {/* <div id="stencil"></div> */}
      <h2>Edit overlay</h2>
      <p>
        Generally, user need a way to interact with elements and links beyond
        simple dragging. This can be achieved with the Halo plugin.The plugin
        renders an editing overlay component that surrounds the selected
        elements or link with button tools,where each of these tools allows the
        user to tirgger a different action on the element or link in quesiton.
        For achive this, we need <code className="inline">openHalo()</code> like
        this:
      </p>
      <pre className="code-block">
        <code className="inline">{ExplanationText}</code>
      </pre>
    </div>
  )
}
