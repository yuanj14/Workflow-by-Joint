import { useJointInit } from '@/hooks'
import { dia, linkTools, shapes } from '@joint/plus'
import { useEffect } from 'react'

export default function LinkRestrictionComponent() {
  const { paperRef, graph, paper } = useJointInit(false, {
    gridSize: 1,
    linkPinning: false,
    defaultLink: () =>
      new shapes.standard.Link({ attrs: { wrapper: { cursor: 'default' } } }),
    defaultConnectionPoint: { name: 'boundary' },
    validateConnection(cellViewS, magnetS, cellViewT, magnetT) {
      if (magnetS && magnetS.getAttribute('port-group') === 'in') return false
      if (cellViewS === cellViewT) return false
      return !!magnetT && magnetT.getAttribute('port-group') === 'in'
    },
    validateMagnet(_cellView, magnet) {
      return magnet.getAttribute('magnet') !== 'passive'
    },
    snapLinks: { radius: 10 },
  })

  useEffect(() => {
    if (!graph || !paper) return

    const portsIn = {
      position: { name: 'left' },
      label: {
        position: { name: 'left', args: { y: 6 } },
        markup: [
          { tagName: 'text', selector: 'label', className: 'label-text' },
        ],
      },
      markup: [
        {
          tagName: 'circle',
          selector: 'portBody',
          attributes: {
            magnet: true,
            r: 10,
            fill: '#023047',
            stroke: '#023047',
          },
        },
      ],
    }

    const portsOut = {
      position: { name: 'right' },
      attrs: {
        portBody: {
          magnet: 'passive',
          r: 10,
          fill: '#E6A502',
          stroke: '#023047',
        },
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
      { group: 'in', id: 'in1', attrs: { label: { text: 'in1' } } },
      { group: 'in', id: 'in2', attrs: { label: { text: 'in2' } } },
      { group: 'out', id: 'out', attrs: { label: { text: 'out' } } },
    ])

    const model2 = model.clone().translate(300, 0).attr('label/text', 'Model 2')

    graph.addCells([model, model2])

    paper.on('link:mouseenter', (linkView) => {
      showLinkTools(linkView)
    })

    paper.on('link:mouseleave', (linkView) => {
      linkView.removeTools()
    })
    graph.on('change:source change:target', function (link) {
      const sourcePort = link.get('source').port
      const sourceId = link.get('source').id
      const targetPort = link.get('target').port
      const targetId = link.get('target').id

      const paragraph = document.createElement('p')
      paragraph.innerHTML = [
        'The port <b>' + sourcePort,
        '</b> of element with ID <b>' + sourceId,
        '</b> is connected to port <b>' + targetPort,
        '</b> of element with ID <b>' + targetId + '</b>',
      ].join('')

      appendMessage(paragraph)
    })

    function appendMessage(p: HTMLParagraphElement) {
      const body = document.getElementById('paper-links-message')!
      body.innerHTML = ''

      body.appendChild(p)
    }

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
      <h2>LinkRestrictionComponent</h2>
      <div ref={paperRef}></div>
      <div id="paper-links-message"></div>
    </div>
  )
}
