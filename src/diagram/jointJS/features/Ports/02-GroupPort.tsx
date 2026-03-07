import { useJointInit } from '@/hooks'
import { dia, shapes } from '@joint/plus'
export default function GroupPortComponent() {
  useEffect(() => {
    const { paperRef, graph, paperScroller } = useJointInit(true, {
      gridSize: 1,
      defaultLink: () => new shapes.standard.Link(),
      defaultConnectionPoint: { name: 'boundary' },
    })

    const portsIn = {
      //端口位置
      markup: [{ tagName: 'circle', selector: 'portBody' }],
      attrs: { portBody: { magnet: true, r: 10 } },
      label: {
        position: {
          name: 'left',
          // args: { y: 6 }
        },
        markup: [{ tagName: 'text', selector: 'porttext' }],
      },
    }

    const portsOut = {
      position: { name: 'right' },
      attrs: { portBody: { magnet: true, r: 10, fill: '#E6A502' } },
      label: {
        position: { name: 'right' },
        markup: [{ tagName: 'text', selector: 'porttext' }],
      },
      markup: [{ tagName: 'circle', selector: 'portBody' }],
    }

    const model = new shapes.standard.Rectangle({
      position: { x: 275, y: 50 },
      size: { width: 90, height: 90 },
      attrs: {
        body: { fill: '#8ECAE6' },
        label: { text: 'Model', fontSize: 16, y: -10 },
      },
      ports: { groups: { in: portsIn, out: portsOut } },
    })

    model.addPorts([
      { group: 'in', attrs: { porttext: { text: 'in1' } } },
      { group: 'in', attrs: { porttext: { text: 'in2' } } },
      { group: 'in', attrs: { porttext: { text: 'in2' } } },
      { group: 'out', attrs: { porttext: { text: 'out' } } },
      { group: 'out', attrs: { porttext: { text: 'out' } } },
      { group: 'out', attrs: { porttext: { text: 'out' } } },
    ])

    graph.addCell(model)

    return () => {}
  }, [])

  return (
    <div>
      <h2>GroupPortComponent</h2>
      <div id="paper"></div>
    </div>
  )
}
