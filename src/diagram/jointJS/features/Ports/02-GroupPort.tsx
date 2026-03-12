import { useJointInit } from '@/hooks'
import { shapes } from '@joint/plus'
export default function GroupPortComponent() {
  const { paperRef, graph, paperScroller } = useJointInit(true, {
    gridSize: 1,
    defaultLink: () => new shapes.standard.Link(),
    defaultConnectionPoint: { name: 'boundary' },
  })
  useEffect(() => {
    if (!graph || !paperScroller) return
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
      position: { x: 200, y: 50 },
      size: { width: 200, height: 280 },
      attrs: {
        body: { fill: '#8ECAE6' },
        label: { text: 'Label Positions', fontSize: 14 },
      },
      ports: { groups: { in: portsIn, out: portsOut } },
    })

    // ✨ 11 种 label.position.name，每个端口覆盖各自的 label position
    model.addPorts([
      // ── in 组（左侧 6 个）──
      {
        group: 'out',
        attrs: { porttext: { text: 'left' } },
        label: { position: { name: 'left' } },
      },
      {
        group: 'in',
        attrs: { porttext: { text: 'right' } },
        label: { position: { name: 'right' } },
      },
      {
        group: 'in',
        attrs: { porttext: { text: 'top' } },
        label: { position: { name: 'top' } },
      },
      {
        group: 'in',
        attrs: { porttext: { text: 'bottom' } },
        label: { position: { name: 'bottom' } },
      },
      {
        group: 'in',
        attrs: { porttext: { text: 'inside' } },
        label: { position: { name: 'inside' } },
      },
      {
        group: 'in',
        attrs: { porttext: { text: 'insideOriented' } },
        label: { position: { name: 'insideOriented' } },
      },
      // ── out 组（右侧 5 个）──
      {
        group: 'out',
        attrs: { porttext: { text: 'outside' } },
        label: { position: { name: 'outside' } },
      },
      {
        group: 'out',
        attrs: { porttext: { text: 'outsideOriented' } },
        label: { position: { name: 'outsideOriented' } },
      },
      {
        group: 'out',
        attrs: { porttext: { text: 'radial' } },
        label: { position: { name: 'radial' } },
      },
      {
        group: 'out',
        attrs: { porttext: { text: 'radialOriented' } },
        label: { position: { name: 'radialOriented' } },
      },
      {
        group: 'out',
        attrs: { porttext: { text: 'manual' } },
        label: { position: { name: 'manual', args: { x: 20, y: 20 } } },
      },
    ])

    graph.addCell(model)
    console.log(model);

    return () => {}
  }, [graph, paperScroller])

  return (
    <div>
      <h2>GroupPortComponent</h2>
      <div ref={paperRef}></div>
    </div>
  )
}
