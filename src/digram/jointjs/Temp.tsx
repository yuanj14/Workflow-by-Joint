import { dia, shapes } from '@joint/core'

export const Temp = (): React.ReactElement => {
  const namespace = shapes

  const graph = new dia.Graph({}, { cellNamespace: namespace })

  const paper = new dia.Paper({
    el: document.getElementById('paper'),
    model: graph,
    width: 600,
    height: 100,
    gridSize: 1,
    //拖拽
    interactive: false,
    cellViewNamespace: namespace,
  })

  const rect = new shapes.standard.Rectangle()
  rect.position(100, 30)
  rect.resize(100, 40)
  rect.attr({
    body: { cursor: 'pointer', fill: 'white', stroke: 'black' },
    label: { text: 'Element #1', cursor: 'pointer', fill: 'black' },
  })
  rect.addTo(graph)

  const rect2 = rect.clone()
  rect2.translate(300, 0)
  rect2.attr('label/text', 'Element #2')
  rect2.addTo(graph)

  const link = new shapes.standard.Link()
  link.source(rect)
  link.target(rect2)
  link.attr({ line: { stroke: 'black' } })
  link.labels([
    {
      markup: [
        { tagName: 'rect', selector: 'body' },
        { tagName: 'text', selector: 'label' },
      ],
      attrs: {
        label: {
          cursor: 'pointer',
          text: 'Link',
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
          fill: 'black',
        },
        body: {
          cursor: 'pointer',
          ref: 'label',
          refX: '-10%',
          refY: '-10%',
          refWidth: '120%',
          refHeight: '120%',
          fill: 'white',
          stroke: 'black',
          strokeWidth: 2,
        },
      },
    },
  ])
  link.addTo(graph)

  const info = new shapes.standard.Rectangle()
  info.position(250, 70)
  info.resize(100, 20)
  info.attr({
    body: {
      visibility: 'hidden',
      cursor: 'default',
      fill: 'white',
      stoke: 'black',
    },
    label: {
      visibility: 'hidden',
      text: 'Link clicked',
      cursor: 'default',
      fill: 'black',
      fontSize: 12,
    },
  })
  info.addTo(graph)

  paper.on('blank:pointerdblclick', () => {
    resetAll(paper)

    info.attr('body/visibility', 'hidden')
    info.attr('label/visibility', 'hidden')

    paper.drawBackground({ color: 'orange' })
  })

  paper.on('element:pointerdblclick', (elementView) => {
    resetAll(paper)

    const currentElement = elementView.model
    currentElement.attr('body/stroke', 'orange')
  })

  paper.on('link:pointerdblclick', (linkView) => {
    resetAll(paper)

    const currentLink = linkView.model
    currentLink.attr('line/stroke', 'orange')
    currentLink.label(0, { attrs: { body: { stroke: 'orange' } } })
  })

  paper.on('cell:pointerdblclick', (cellView) => {
    const isElement = cellView.model.isElement()
    const message = (isElement ? 'Element' : 'Link') + ' clicked'
    info.attr('label/text', message)

    info.attr('body/visibility', 'visible')
    info.attr('label/visibility', 'visible')
  })

  function resetAll(paper: dia.Paper) {
    paper.drawBackground({ color: 'white' })

    const elements = paper.model.getElements()
    for (let i = 0, ii = elements.length; i < ii; i++) {
      const currentElement = elements[i]
      currentElement.attr('body/stroke', 'black')
    }

    const links = paper.model.getLinks()
    for (let j = 0, jj = links.length; j < jj; j++) {
      const currentLink = links[j]
      currentLink.attr('line/stroke', 'black')
      currentLink.label(0, { attrs: { body: { stroke: 'black' } } })
    }
  }
  return <div id="paper"></div>
}
