import { useJointInit } from '@/hooks'
import { dia, linkTools, shapes } from '@joint/plus'
import { useEffect } from 'react'

export default function PortProperyComponent() {
  const { paperRef, graph, paper } = useJointInit(false, {
    gridSize: 1,
    defaultLink: () => new shapes.standard.Link(),
    defaultConnectionPoint: { name: 'boundary' },
  })
  useEffect(() => {
    if (!graph || !paper) return
    const portsIn = {
      label: {
        position: { name: 'left', args: { y: 6 } },
        markup: [{ tagName: 'text', selector: 'label' }],
      },
      markup: [
        {
          tagName: 'circle',
          selector: 'portBody',
          attributes: { magnet: true, r: 10, fill: '#023047' },
        },
      ],
    }

    const portsOut = {
      position: { name: 'right' },
      attrs: { portBody: { magnet: true, r: 10, fill: '#E6A502' } },
      label: {
        position: { name: 'right' },
        markup: [{ tagName: 'text', selector: 'label' }],
      },
      markup: [{ tagName: 'circle', selector: 'portBody' }],
    }

    const model = new shapes.standard.Rectangle({
      position: { x: 125, y: 50 },
      size: { width: 90, height: 90 },
      attrs: {
        //自身不可连接 false 只可作为终点passive
        root: { magnet: false },
        body: { fill: '#8ECAE6' },
        label: { text: 'Model', fontSize: 16, y: -10 },
      },
      ports: { groups: { in: portsIn, out: portsOut } },
    })
    // port实例id 对应model的source/target.port属性
    model.addPorts([
      { group: 'in', id: 'source : port', attrs: { label: { text: 'in1' } } },
      { group: 'in', id: 'in2', attrs: { label: { text: 'in2' } } },
      { group: 'out', id: 'out', attrs: { label: { text: 'out' } } },
    ])

    const model2 = model.clone().translate(300, 0).attr('label/text', 'Model 2')

    const customPort = {
      id: 'custom-port-id',
      label: {
        position: { name: 'left' },
        markup: [{ tagName: 'text', selector: 'label' }],
      },
      attrs: {
        portBody: {
          magnet: true,
          width: 16,
          height: 16,
          x: -8,
          y: -8,
          fill: '#03071E',
        },
        label: { text: 'custom-port-in' },
      },
      markup: [{ tagName: 'rect', selector: 'portBody' }],
    }

    const portIdBase = new shapes.standard.Rectangle({
      position: { x: 125, y: 260 },
      size: { width: 140, height: 90 },
      attrs: {
        body: { fill: '#8ECAE6' },
        label: { text: 'PortID Base', fontSize: 13, y: -8 },
      },
      ports: { items: [customPort] },
    })

    const portIdDemo = portIdBase
      .clone()
      .translate(300, 0)
      .attr('label/text', 'PortID Demo')

    portIdDemo.portProp('custom-port-id', 'attrs/portBody', {
      r: 8,
      fill: 'darkslateblue',
    })

    const portId = portIdDemo.getPorts()[0]?.id
    let customData: unknown = null

    if (portId) {
      portIdDemo.portProp(portId, 'custom', { testAttribute: true })
      portIdDemo.portProp(portId, 'attrs/portBody/fill', 'tomato')
      customData = portIdDemo.portProp(portId, 'custom')
    }

    graph.addCells([model, model2, portIdBase, portIdDemo])

    const portIdMessage = document.getElementById('paper-portid-message')
    if (portIdMessage) {
      portIdMessage.textContent = `portId: ${portId} | custom: ${JSON.stringify(
        customData,
      )}`
    }

    paper.on('link:mouseenter', (linkView) => {
      showLinkTools(linkView)
    })

    paper.on('link:mouseleave', (linkView) => {
      linkView.removeTools()
    })
    graph.on('change:source change:target', function (link) {
      console.log(link)

      //name attrs label text
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

    // Actions
    function appendMessage(p: HTMLParagraphElement) {
      const body = document.getElementById('paper-links-message')!

      // Remove paragraph from DOM if it already exists
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
    return () => {}
  }, [graph, paper])

  return (
    <div>
      <h2>PortProperyComponent</h2>
      <div ref={paperRef}></div>
      <div id="paper-links-message"></div>
      <div id="paper-portid-message"></div>
    </div>
  )
}
