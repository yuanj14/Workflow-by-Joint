import { dia, format, shapes, ui, util } from 'joint-plus'
import { useEffect } from 'react'
import '../../css/text.css'
import '../App.css'
export default function PropertyEditComponent() {
  useEffect(() => {
    const namespace = shapes
    const graph = new dia.Graph({}, { cellNamespace: namespace })
    const paper = new dia.Paper({
      // el: document.getElementById('paper'),
      model: graph,
      width: 2000,
      height: 2000,
      background: { color: '#F5F5F5' },
      cellViewNamespace: namespace,
      defaultRouter: { name: 'orthogonal' },
      defaultConnector: { name: 'straight', args: { cornerType: 'line' } },
    })

    const paperScroller = new ui.PaperScroller({
      paper: paper,
      scrollWhileDragging: true,
    }).render()
    document.getElementById('paper')!.appendChild(paperScroller.el)

    paper.on('paper:pinch', (_evt, ox, oy, scale) => {
      const zoom = paperScroller.zoom()
      paperScroller.zoom(zoom * scale, {
        min: 0.2,
        max: 5,
        ox,
        oy,
        absolute: true,
      })
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
    const stencil = new ui.Stencil({
      paper: paper,
      width: 170,
      height: '100%',
      layout: true,
      dropAnimation: true,
    }).render()
    document.getElementById('stencil')!.appendChild(stencil.el)

    function openHalo(cellView: any) {
      new ui.Halo({ cellView: cellView }).render()
    }
    paper.on('cell:pointerup', (cellView) => {
      openHalo(cellView)
    })

    const elements = [
      {
        type: 'standard.Rectangle',
        size: { width: 70, height: 50 },
        attrs: { body: { stroke: '#C94A46', rx: 2, ry: 2 } },
      },
      {
        type: 'standard.Ellipse',
        size: { width: 70, height: 50 },
        attrs: { body: { stroke: '#C94A46' } },
      },
      {
        type: 'standard.Polygon',
        size: { width: 70, height: 50 },
        attrs: {
          body: {
            stroke: '#C94A46',
            points:
              'calc(w/2),0 calc(w),calc(h/2) calc(w/2),calc(h) 0,calc(h/2)',
          },
        },
      },
      {
        type: 'standard.Cylinder',
        size: { width: 70, height: 50 },
        attrs: {
          body: { stroke: '#C94A46' },
          top: { fill: '#C94A46', stroke: '#C94A46' },
        },
      },
    ]
    stencil.load(elements)

    paperScroller.centerContent()

    const toolbar = new ui.Toolbar({
      tools: [
        { type: 'button', name: 'json', text: 'Export JSON' },
        { type: 'button', name: 'svg', text: 'Export SVG' },
        'separator',
        'zoomToFit',
        'zoomSlider',
      ],
      references: { paperScroller: paperScroller },
    }).render()
    document.getElementById('toolbar')!.appendChild(toolbar.el)
    toolbar.on('json:pointerclick', () => {
      const str = JSON.stringify(graph.toJSON())
      const bytes = new TextEncoder().encode(str)
      const blob = new Blob([bytes], { type: 'application/json;charset=utf-8' })
      util.downloadBlob(blob, 'joint-plus.json')
    })
    toolbar.on('svg:pointerclick', () => {
      format.toSVG(
        paper,
        (svg: any) => {
          util.downloadDataUri(
            `data:image/svg+xml,${encodeURIComponent(svg)}`,
            'joint-plus.svg',
          )
        },
        { useComputedStyles: false },
      )
    })
    function getInspectorConfig(cell: any) {
      if (cell.isElement()) {
        return {
          attrs: {
            label: { text: { type: 'content-editable', label: 'Label' } },
          },
        }
      } else {
        // cell.isLink()
        return {
          labels: {
            type: 'list',
            label: 'Labels',
            item: {
              type: 'object',
              properties: {
                attrs: {
                  text: {
                    text: {
                      type: 'content-editable',
                      label: 'Text',
                      defaultValue: 'label',
                    },
                  },
                },
                position: {
                  type: 'select-box',
                  options: [
                    { value: 30, content: 'Source' },
                    { value: 0.5, content: 'Middle' },
                    { value: -30, content: 'Target' },
                  ],
                  defaultValue: 0.5,
                  label: 'Position',
                },
              },
            },
          },
        }
      }
    }

    function openInspector(cell: any) {
      closeInspector() // close inspector if currently open

      ui.Inspector.create('#inspector', {
        cell: cell,
        inputs: getInspectorConfig(cell),
      })
    }

    function closeInspector() {
      ui.Inspector.close()
    }

    paper.on('cell:pointerdown', function (cellView) {
      openInspector(cellView.model)
    })

    stencil.on('element:drop', function (elementView) {
      openInspector(elementView.model)
    })

    paper.on('blank:pointerdown', function () {
      closeInspector() // close inspector if currently open
    })
    // first element by default
    openHalo(paper.findViewByModel(rect1))
    openInspector(rect1)
    return () => {
      toolbar.remove()
    }
  }, [])

  return (
    <div>
      <div id="paper"></div>
      <div id="toolbar"></div>
      <div id="stencil"></div>
      <div id="inspector"></div>
    </div>
  )
}
