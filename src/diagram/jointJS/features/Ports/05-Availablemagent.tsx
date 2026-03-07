import { useJointInit } from '@/hooks'
import { dia, linkTools, shapes } from '@joint/plus'

export default function MarkComponent() {
  const { paperRef, graph, paper } = useJointInit(false, {
    gridSize: 1,
    linkPinning: false,
    defaultConnectionPoint: { name: 'boundary' },
    validateConnection(cellViewS, _magnetS, cellViewT, magnetT) {
      if (cellViewS === cellViewT) return false
      return !!magnetT && magnetT.getAttribute('port-group') === 'in'
    },
    validateMagnet(_cellView, magnet) {
      return magnet.getAttribute('magnet') !== 'passive'
    },
    markAvailable: true,
  })

  useEffect(() => {
    if (!graph || !paper) return

    const portsIn = {
      position: { name: 'left' },
      attrs: {
        portBody: {
          magnet: 'passive',
          r: 10,
          fill: '#023047',
          stroke: '#023047',
        },
      },
      label: {
        position: { name: 'left', args: { y: 6 } },
        markup: [
          { tagName: 'text', selector: 'label', className: 'label-text' },
        ],
      },
      markup: [{ tagName: 'circle', selector: 'portBody' }],
    }

    const portsOut = {
      position: { name: 'right' },
      attrs: {
        portBody: { magnet: true, r: 10, fill: '#E6A502', stroke: '#023047' },
      },
      label: {
        position: { name: 'right', args: { y: 6 } },
        markup: [
          { tagName: 'text', selector: 'label', className: 'label-text' },
        ],
      },
      markup: [{ tagName: 'circle', selector: 'portBody' }],
    }

    const model = new shapes.standard.Rectangle({
      position: { x: 125, y: 50 },
      size: { width: 90, height: 90 },
      attrs: {
        root: { magnet: false },
        body: { fill: '#8ECAE6' },
        label: { text: 'Model', fontSize: 16, y: -10 },
      },
      ports: { groups: { in: portsIn, out: portsOut } },
    })

    model.addPorts([
      { group: 'in', attrs: { label: { text: 'in1' } } },
      { group: 'in', attrs: { label: { text: 'in2' } } },
      { group: 'out', attrs: { label: { text: 'out' } } },
    ])

    const model2 = model.clone().translate(300, 0).attr('label/text', 'Model 2')

    graph.addCells([model, model2])

    paper.on('link:mouseenter', (linkView) => {
      showLinkTools(linkView)
    })

    paper.on('link:mouseleave', (linkView) => {
      linkView.removeTools()
    })

    function showLinkTools(linkView: any) {
      const tools = new dia.ToolsView({
        tools: [
          new linkTools.Remove({
            distance: '50%',
            markup: [
              {
                tagName: 'circle',
                selector: 'button',
                attributes: {
                  r: 7,
                  fill: '#f6f6f6',
                  stroke: '#ff5148',
                  'stroke-width': 2,
                  cursor: 'pointer',
                },
              },
              {
                tagName: 'path',
                selector: 'icon',
                attributes: {
                  d: 'M -3 -3 3 3 M -3 3 3 -3',
                  fill: 'none',
                  stroke: '#ff5148',
                  'stroke-width': 2,
                  'pointer-events': 'none',
                },
              },
            ],
          }),
        ],
      })
      linkView.addTools(tools)
    }

    return () => {
      graph.clear()
    }
  }, [graph, paper])

  return (
    <div>
      <h2>MarkComponent</h2>
      <div ref={paperRef}></div>
    </div>
  )
}
