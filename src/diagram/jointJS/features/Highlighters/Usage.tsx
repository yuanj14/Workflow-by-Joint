import * as joint from '@joint/plus'
import { useEffect } from 'react'

export default function Usage() {
  const { highlighters, dia, shapes } = joint
  useEffect(() => {
    work()

    return () => {}
  }, [])

  function work() {
    const graph = new dia.Graph({}, { cellNamespace: shapes })

    const paper = new dia.Paper({
      el: document.getElementById('paper'),
      width: 400,
      height: 300,
      model: graph,
      cellViewNamespace: shapes,
      clickThreshold: 5,
      // highlighting: false,
      async: true,
      background: { color: '#F5F5F5' },
    })

    const rect1 = new shapes.standard.Rectangle({
      position: { x: 50, y: 220 },
      size: { width: 40, height: 40 },
      ports: {
        items: [
          { id: 'port1', group: 'group1' },
          { id: 'port2', group: 'group2' },
        ],
        groups: {
          group1: {
            //port 定义
            position: 'left',
            markup: [
              {
                tagName: 'circle',
                selector: 'portBody',
                attributes: {
                  magnet: 'passive',
                  r: 10,
                  fill: 'white',
                  stroke: 'black',
                  strokeWidth: 2,
                },
              },
            ],
          },
          group2: {
            position: 'right',
            markup: [
              {
                tagName: 'path',
                selector: 'portBody',
                attributes: {
                  magnet: 'passive',
                  d: 'M -10 10 10 10 0 -10 Z',
                  fill: 'white',
                  stroke: 'black',
                  strokeWidth: 2,
                },
              },
            ],
          },
        },
      },
    })

    const rect2 = rect1.clone().position(150, 220)

    const rect3 = rect1.clone().position(250, 220)

    const link1 = new shapes.standard.Link({
      source: { x: 50, y: 50 },
      target: { x: 300, y: 70 },
      // source -> vertices -> target
      vertices: [{ x: 150, y: 50 }],
      labels: [
        {
          markup: [
            { tagName: 'rect', selector: 'labelBody' },
            { tagName: 'text', selector: 'labelText' },
          ],
          attrs: {
            labelText: {
              text: 'Label',
              fill: '#000000',
              fontSize: 14,
              fontFamily: 'sans-serif',
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
              pointerEvents: 'none',
            },
            labelBody: {
              ref: 'labelText',
              fill: '#ffffff',
              stroke: 'black',
              strokeWidth: 2,
              rx: 3,
              ry: 3,
              refWidth: '100%',
              refHeight: '100%',
              refWidth2: 8,
              refHeight2: 8,
              refX: -4,
              refY: -4,
              event: 'link:label:pointerdown',
              cursor: 'pointer',
            },
          },
        },
      ],
    })

    const link2 = link1
      .clone()
      .set({
        source: { x: 50, y: 100 },
        target: { x: 300, y: 120 },
        vertices: [{ x: 150, y: 100 }],
      })

    const link3 = link1
      .clone()
      .set({
        source: { x: 50, y: 150 },
        target: { x: 300, y: 170 },
        vertices: [{ x: 150, y: 150 }],
      })

    graph.addCells([rect1, rect2, rect3, link1, link2, link3])

    const mask = highlighters.mask

    // console.log(rect1.findView(paper));
    // console.log(paper.findViewByModel(rect1));

    mask.add(
      rect1.findView(paper),
      // {selector : body}
      //rect
      'body',
      'example-id',
      //highlighters
      {
        layer: 'back',
        attrs: {
          stroke: '#4666E5',
          'stroke-width': 3,
          'stroke-linejoin': 'round',
        },
      },
    )

    mask.add(
      rect2.findView(paper),
      // {port : xxxx}
      { port: 'port1' },
      'example-id',
      {
        layer: null,
        attrs: {
          stroke: '#4666E5',
          'stroke-width': 3,
          //mask - cornor : round
          'stroke-linejoin': 'round',
        },
      },
    )

    mask.add(
      rect3.findView(paper),
      // root all ,body main entity
      'root',
      'example-id',
      {
        layer: 'back',
        deep: true,
        attrs: {
          stroke: '#4666E5',
          'stroke-width': 3,
          'stroke-linejoin': 'round',
        },
      },
    )
    // console.log(paper.findViewByModel(link1));
    mask.add(link1.findView(paper), { selector: 'line' }, 'example-id', {
      layer: 'back',
      // deep: true,
      attrs: {
        stroke: '#4666E5',
        'stroke-width': 3,
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round',
      },
    })
    // console.log(link2.findView(paper));

    mask.add(
      link2.findView(paper),
      { label: 0, selector: 'labelBody' },
      'example-id',
      {
        layer: 'front',
        // padding, space of context and mask
        padding: 2,
        attrs: {
          stroke: '#4666E5',
          'stroke-width': 3,
          // vertics 圆形
          'stroke-linejoin': 'round',
          //端点
          'stroke-linecap': 'round',
        },
      },
    )

    mask.add(link3.findView(paper), { selector: 'root' }, 'example-id', {
      deep: true,
      padding: 5,
      attrs: {
        stroke: '#4666E5',
        'stroke-width': 3,
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round',
      },
    })

    paper.on('element:magnet:pointerclick', (cellView, evt, magnet) => {
      evt.stopPropagation()
      highlighters.mask.remove(cellView)
      const portId = cellView.findAttribute('port', magnet)
      mask.add(cellView, { port: portId }, 'element-highlight', {
        attrs: { stroke: '#FF4365', 'stroke-width': 3 },
      })
    })

    paper.on('element:pointerclick', (cellView) => {
      mask.remove(cellView)
      mask.add(cellView, 'root', 'element-highlight', {
        deep: true,
        attrs: { stroke: '#FF4365', 'stroke-width': 3 },
      })
    })

    paper.on('link:label:pointerdown', (cellView, evt) => {
      evt.stopPropagation()
      mask.remove(cellView)
      const labelIndex = cellView.findAttribute('label-idx', evt.target)
      mask.add(cellView, { label: labelIndex }, 'link-highlight', {
        attrs: { stroke: '#FF4365', 'stroke-width': 3 },
      })
    })

    paper.on('link:pointerclick', (cellView) => {
      mask.remove(cellView)
      mask.add(cellView, { selector: 'line' }, 'link-highlight', {
        layer: 'back',
        attrs: {
          stroke: '#FF4365',
          'stroke-width': 3,
          'stroke-linecap': 'square',
        },
      })
    })

    paper.on('blank:pointerclick', () => {
      // Remove all Highlighters from all cells
      graph.getCells().forEach(function (cell) {
        mask.remove(cell.findView(paper))
      })
    })
  }

  return (
    <div>
      <div id="paper"></div>
    </div>
  )
}
