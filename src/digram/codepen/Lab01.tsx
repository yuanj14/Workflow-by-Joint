import * as joint from '@joint/plus'
import { useEffect } from 'react'
import '../css/codepen/lab01.css'
export default function Lab01() {
  useEffect(() => {
    work()
    // test();
    return () => {}
  }, [])

  function work() {
    const { dia, shapes, highlighters, linkTools } = joint

    // Styles

    const unit = 4
    const bevel = 2 * unit
    const spacing = 2 * unit
    const flowSpacing = unit / 2

    const rootEl = document.querySelector(':root')
    rootEl.style.setProperty('--flow-spacing', `${flowSpacing}px`)

    const fontAttributes = {
      fontFamily: 'PPFraktionSans, sans-serif',
      fontStyle: 'normal',
      fontSize: 14,
      lineHeight: 18,
    }

    // Paper & Graph

    const paperContainer = document.getElementById('canvas')
    const graph = new dia.Graph({}, { cellNamespace: shapes })
    const paper = new dia.Paper({
      model: graph,
      cellViewNamespace: shapes,
      width: '100%',
      height: '100%',
      async: true,
      sorting: dia.Paper.sorting.APPROX,
      background: { color: 'transparent' },
      snapLabels: true,
      clickThreshold: 10,
      interactive: { linkMove: false },
      gridSize: 5,
      defaultConnectionPoint: {
        name: 'boundary',
        args: { offset: spacing, extrapolate: true },
      },
      defaultRouter: { name: 'rightAngle', args: { margin: unit * 7 } },
      defaultConnector: {
        name: 'rounded',
        // args: { cornerType: "line", cornerPreserveAspectRatio: true }
      }, // bevelled path
    })
    paperContainer.appendChild(paper.el)

    // Flowchart content

    function createStart(x, y, text) {
      return new shapes.standard.Rectangle({
        position: { x: x + 10, y: y + 5 },
        size: { width: 80, height: 50 },
        z: 1,
        attrs: {
          body: { class: 'jj-start-body', rx: 25, ry: 25 },
          label: {
            class: 'jj-start-text',
            ...fontAttributes,
            fontSize: fontAttributes.fontSize * 1.4,
            fontWeight: 'bold',
            text,
          },
        },
      })
    }

    function createStep(x, y, text) {
      return new shapes.standard.Path({
        position: { x, y },
        size: { width: 100, height: 60 },
        z: 1,
        attrs: {
          body: {
            class: 'jj-step-body',
            d: `M 0 ${bevel} ${bevel} 0 calc(w-${bevel}) 0 calc(w) ${bevel} calc(w) calc(h-${bevel}) calc(w-${bevel}) calc(h) ${bevel} calc(h) 0 calc(h-${bevel}) Z`,
          },
          label: {
            ...fontAttributes,
            class: 'jj-step-text',
            text,
            textWrap: { width: -spacing, height: -spacing },
          },
        },
      })
    }

    function createDecision(x, y, text) {
      return new shapes.standard.Path({
        position: { x: x - 30, y: y - 10 },
        size: { width: 160, height: 80 },
        z: 1,
        attrs: {
          body: {
            class: 'jj-decision-body',
            d: 'M 0 calc(0.5 * h) calc(0.5 * w) 0 calc(w) calc(0.5 * h) calc(0.5 * w) calc(h) Z',
          },
          label: { ...fontAttributes, class: 'jj-decision-text', text },
        },
      })
    }

    function createFlow(
      source,
      target,
      sourceAnchor = 'right',
      targetAnchor = 'left',
    ) {
      return new shapes.standard.Link({
        // anchor 连接点位置
        source: { id: source.id, anchor: { name: sourceAnchor } },
        target: { id: target.id, anchor: { name: targetAnchor } },
        z: 2,
        attrs: {
          line: {
            class: 'jj-flow-line',
            targetMarker: {
              class: 'jj-flow-arrowhead',
              d: `M 0 0 L ${2 * unit} ${unit} L ${2 * unit} -${unit} Z`,
            },
          },
          // The `outline` path is added to the `standard.Link` below in `markup``
          // We want to keep the `wrapper` path to do its original job,
          // which is the hit testing
          // outline: {
          //     class: "jj-flow-outline",
          //     connection: true
          // }
        },
        markup: [
          {
            tagName: 'path',
            selector: 'wrapper',
            attributes: {
              fill: 'none',
              cursor: 'pointer',
              stroke: 'transparent',
              'stroke-linecap': 'round',
            },
          },
          {
            tagName: 'path',
            selector: 'outline',
            attributes: { fill: 'none', 'pointer-events': 'none' },
          },
          {
            tagName: 'path',
            selector: 'line',
            attributes: { fill: 'none', 'pointer-events': 'none' },
          },
        ],
        defaultLabel: {
          attrs: {
            labelBody: {
              class: 'jj-flow-label-body',
              ref: 'labelText',
              d: `
                        M calc(x-${spacing}) calc(y-${spacing})
                        m 0 ${bevel} l ${bevel} -${bevel}
                        h calc(w+${2 * (spacing - bevel)}) l ${bevel} ${bevel}
                        v calc(h+${2 * (spacing - bevel)}) l -${bevel} ${bevel}
                        H calc(x-${spacing - bevel}) l -${bevel} -${bevel} Z
                    `,
            },
            labelText: {
              ...fontAttributes,
              class: 'jj-flow-label-text',
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
              fontStyle: 'italic',
            },
          },
          markup: [
            { tagName: 'path', selector: 'labelBody' },
            { tagName: 'text', selector: 'labelText' },
          ],
        },
      })
    }

    const start = createStart(50, 40, 'Start')
    const addToCart = createStep(200, 40, 'Add to Cart')
    const checkoutItems = createStep(350, 40, 'Checkout Items')
    const addShippingInfo = createStep(500, 40, 'Add Shipping Info')
    const addPaymentInfo = createStep(500, 140, 'Add Payment Info')
    const validPayment = createDecision(500, 250, 'Valid Payment?')
    const presentErrorMessage = createStep(750, 250, 'Present Error Message')
    const sendOrderToWarehouse = createStep(200, 250, 'Send Order to Warehouse')
    const packOrder = createStep(200, 350, 'Pack Order')
    const qualityCheck = createDecision(200, 460, 'Quality Check?')
    const shipItemsToCustomer = createStep(500, 460, 'Ship Items to Customer')

    graph.addCells([
      start,
      addToCart,
      checkoutItems,
      addShippingInfo,
      addPaymentInfo,
      validPayment,
      presentErrorMessage,
      sendOrderToWarehouse,
      packOrder,
      qualityCheck,
      shipItemsToCustomer,
      createFlow(start, addToCart, 'right', 'left'),
      createFlow(addToCart, checkoutItems, 'right', 'left'),
      createFlow(checkoutItems, addShippingInfo, 'right', 'left'),
      createFlow(addShippingInfo, addPaymentInfo, 'bottom', 'top'),
      createFlow(addPaymentInfo, validPayment, 'bottom', 'top'),
      createFlow(validPayment, presentErrorMessage, 'right', 'left').labels([
        { attrs: { labelText: { text: 'No' } } },
      ]),
      createFlow(presentErrorMessage, addPaymentInfo, 'top', 'right').vertices([
        { x: 800, y: 170 },
      ]),
      createFlow(validPayment, sendOrderToWarehouse, 'left', 'right').labels([
        { attrs: { labelText: { text: 'Yes' } } },
      ]),
      createFlow(sendOrderToWarehouse, packOrder, 'bottom', 'top'),
      createFlow(packOrder, qualityCheck, 'bottom', 'top'),
      createFlow(qualityCheck, shipItemsToCustomer, 'right', 'left').labels([
        { attrs: { labelText: { text: 'Ok' } } },
      ]),
      createFlow(qualityCheck, sendOrderToWarehouse, 'left', 'left').labels([
        { attrs: { labelText: { text: 'Not Ok' } } },
      ]),
      // .vertices([
      //     { x: 100, y: 490 },
      //     { x: 100, y: 280 }
      // ])
    ])

    // Automatically scale the content to fit the paper.

    // graph model
    const graphBBox = graph.getBBox()

    function transformToFitContent() {
      paper.transformToFitContent({
        padding: 30,
        contentArea: graphBBox,
        verticalAlign: 'middle',
        horizontalAlign: 'middle',
      })
    }

    window.addEventListener('resize', () => transformToFitContent())
    transformToFitContent()

    // Theme switcher.

    document.querySelector('.theme-switch').addEventListener(
      'click',
      () => {
        document.body.classList.toggle('light-theme')
      },
      false,
    )

    // Add a frame around the element when the mouse enters the element.
    // mask as MaskHighlighter
    const { mask: MaskHighlighter, stroke: StrokeHighlighter } = highlighters

    paper.on('cell:mouseenter', (cellView, evt) => {
      let selector, padding
      if (cellView.model.isLink()) {
        // console.log(StrokeHighlighter.get(cellView, "selection"));
        // TODO stroke
        if (StrokeHighlighter.get(cellView, 'selection')) return
        // In case of a link, the frame is added around the label.
        selector = { label: 0, selector: 'labelBody' }
        padding = unit / 2
      } else {
        selector = 'body'
        padding = unit
      }
      const frame = MaskHighlighter.add(cellView, selector, 'frame', {
        padding,
        layer: dia.Paper.Layers.FRONT,
        attrs: { 'stroke-width': 1.5, 'stroke-linejoin': 'round' },
      })
      frame.el.classList.add('jj-frame')
    })

    paper.on('cell:mouseleave', (cellView) => {
      MaskHighlighter.removeAll(paper, 'frame')
    })

    paper.on('link:pointerclick', (cellView) => {
      paper.removeTools()
      dia.HighlighterView.removeAll(paper)

      const snapAnchor = function (coords, endView) {
        const bbox = endView.model.getBBox()
        // Find the closest point on the bbox border.
        const point = bbox.pointNearestToPoint(coords)
        const center = bbox.center()
        // Snap the point to the center of the bbox if it's close enough.
        const snapRadius = 10
        if (Math.abs(point.x - center.x) < snapRadius) {
          point.x = center.x
        }
        if (Math.abs(point.y - center.y) < snapRadius) {
          point.y = center.y
        }
        return point
      }

      const toolsView = new dia.ToolsView({
        tools: [
          new linkTools.TargetAnchor({
            snap: snapAnchor,
            resetAnchor: cellView.model.prop(['target', 'anchor']),
          }),
          new linkTools.SourceAnchor({
            snap: snapAnchor,
            resetAnchor: cellView.model.prop(['source', 'anchor']),
          }),
        ],
      })
      toolsView.el.classList.add('jj-flow-tools')
      cellView.addTools(toolsView)
      // Add copy of the link <path> element behind the link.
      // The selection link frame should be behind all elements and links.
      // const strokeHighlighter = StrokeHighlighter.add(
      //     cellView,
      //     "root",
      //     "selection",
      //     {
      //         layer: dia.Paper.Layers.BACK
      //     }
      // );
      // strokeHighlighter.el.classList.add("jj-flow-selection");
    })

    paper.on('blank:pointerdown', () => {
      paper.removeTools()
      dia.HighlighterView.removeAll(paper)
    })
  }

  return (
    <div>
      <h2>Lab01</h2>
      <div id="canvas"></div>
      <div className="theme-switch" title="Switch between light and dark mode">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#dde6ed"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="light-icon">
          <path
            d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"
            stroke-width="1.5"
          />
          <path
            d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z"
            stroke-width="2"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="#131e29"
          className="dark-icon">
          <path d="M12.0557 3.59974C12.2752 3.2813 12.2913 2.86484 12.0972 2.53033C11.9031 2.19582 11.5335 2.00324 11.1481 2.03579C6.02351 2.46868 2 6.76392 2 12C2 17.5228 6.47715 22 12 22C17.236 22 21.5313 17.9764 21.9642 12.8518C21.9967 12.4664 21.8041 12.0968 21.4696 11.9027C21.1351 11.7086 20.7187 11.7248 20.4002 11.9443C19.4341 12.6102 18.2641 13 17 13C13.6863 13 11 10.3137 11 6.99996C11 5.73589 11.3898 4.56587 12.0557 3.59974Z" />
        </svg>
        <div className="switch"></div>
      </div>
      <a target="_blank" href="https://www.jointjs.com">
        <svg
          version="1.2"
          id="logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 280"
          width="200"
          height="56">
          <path d="m130.71 225.71l-27.28-27.27q0-0.01 0-0.01h76.41v-103.68h27.28c0 0 0 59.4 0 98.19l-32.77 32.77zm330.37-116.97c10.68 10.41 17.29 25.87 17.29 46.13 0 20.26-6.61 35.71-17.29 46.13-10.69 10.41-25.47 15.79-41.91 15.79-16.44 0-31.22-5.38-41.91-15.79-10.68-10.42-17.29-25.87-17.29-46.13 0-20.26 6.61-35.72 17.29-46.13 10.69-10.41 25.47-15.79 41.91-15.79 16.44 0 31.22 5.38 41.91 15.79zm401.41-18.61q-8.23-7.14-22.76-7.15-11.77 0.01-18.3 5.07-6.59 5.11-6.59 14.42 0 6.67 3.47 10.89 3.42 4.18 10.27 7.59 6.77 3.37 20.96 8.6h0.01q14.98 5.85 23.95 10.62 8.92 4.74 15.31 13.26 6.38 8.48 6.38 21.16 0 12.48-6.28 22.05-6.29 9.58-18.03 14.86-11.78 5.29-27.76 5.29-15.99 0-28.09-5.4-12.05-5.39-18.55-15.18-6.49-9.79-6.49-22.71v-7.66h23.37v6.36q-0.01 10.17 8.71 16.92 8.64 6.7 22.95 6.7 13.05-0.01 19.69-5.74 6.69-5.76 6.69-14.84-0.01-6.23-3.69-10.56-3.63-4.29-10.37-7.81-6.67-3.48-20.01-8.7 0 0-0.01 0-14.98-5.64-24.27-10.63-9.23-4.95-15.42-13.46-6.16-8.49-6.16-21.17 0-18.93 13.39-29.9 13.45-11 35.93-10.99 15.77 0 27.86 5.61 12.07 5.6 18.78 15.62 6.7 10.01 6.7 23.13v5.92h-23.37v-4.61q0-10.38-8.27-17.56zm-318.54 18.35h1.52c7.2-9.6 18.63-15.53 34.94-15.53 14.12 0 25.51 4.23 33.38 12.18 7.88 7.95 12.27 19.65 12.27 34.71v74.96h-21.74v-71.71c0-9.84-2.46-17.37-7.24-22.42-4.78-5.03-11.84-7.55-20.88-7.55-10.09 0-18.19 3.05-23.74 9.4-5.05 5.79-7.99 14.26-8.51 25.47v66.53h-21.83v-119.76h21.83zm-194.95-13.73c0 0 0 63.58 0 98.2l-21.85 21.85c-10.29 0-22.53 0-32.81 0l-21.83-21.83q0 0 0 0h54.66v-98.22zm353.46 98.22l-21.83 21.83c0 0-10.89 0-21.8 0l-21.85-21.85v-130.94h21.83v32.74h32.74v21.83h-32.74v76.39h98.31v-130.96h21.83c0 0 0 88.7 0 130.94l-21.85 21.85c-10.29 0-22.53 0-32.81 0 0 0-21.83-21.83-21.83-21.83zm-213.17-98.22h21.83v119.77h-21.83zm-96.8 29.36c-6.6 7.05-10.44 17.44-10.44 30.75 0 13.3 3.84 23.69 10.44 30.74 6.57 7.02 15.86 10.69 26.68 10.69 10.82 0 20.11-3.67 26.68-10.69 6.61-7.05 10.45-17.44 10.45-30.74 0-13.31-3.84-23.7-10.45-30.75-6.57-7.01-15.86-10.69-26.68-10.69-10.82 0-20.11 3.68-26.68 10.69zm-299.99 63.38l-27.28-27.28q0 0 0 0h76.4v-103.69h27.29c0 0 0 59.4 0 98.2l-32.77 32.77zm396.79-125.48h21.82v21.82h-21.82zm-162.11 0h21.82v21.83h-21.82z" />
        </svg>
      </a>
    </div>
  )
}
