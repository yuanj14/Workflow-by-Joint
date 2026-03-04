import { dia, shapes } from 'joint-plus'
import { useEffect } from 'react'
export default function Portid() {
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
      defaultConnector: { name: 'straight', args: { cornerType: 'line' } },
    })
    const port = {
      id: '12345', // set a custom ID
      label: { markup: [{ tagName: 'text', selector: 'label' }] },
      attrs: {
        portBody: {
          magnet: true,
          width: 16,
          height: 16,
          x: -8,
          y: -8,
          fill: '#03071E',
        },
        label: { text: 'port' },
      },
      markup: [{ tagName: 'rect', selector: 'portBody' }],
    }

    const element = new shapes.standard.Rectangle({
      position: { x: 275, y: 50 },
      size: { width: 90, height: 90 },
      attrs: { body: { fill: '#8ECAE6' } },
      ports: { items: [port] },
    })
    graph.addCell(element)
    element.portProp('12345', 'attrs/portBody', { fill: 'darkslateblue' })

    const portId = element.getPorts()[0].id!
    console.log(portId)

    element.portProp(portId, 'attrs/portBody/fill', 'tomato')
    return () => {}
  }, [])

  return (
    <div>
      <div id="paper"></div>
    </div>
  )
}
