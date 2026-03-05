import { dia, shapes } from '@joint/core'
import { useEffect } from 'react'

export default function PaletteComponent() {
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
    })
    const rect1 = new shapes.standard.Rectangle()
      .position(50, 50)
      .resize(100, 40)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'Source', fill: 'balck' },
      })
      .addTo(graph)
    const rect2 = new shapes.standard.Rectangle()
      .position(100, 250)
      .resize(100, 40)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'Source', fill: 'balck' },
      })
      .addTo(graph)
    // appendLabel return label[] can only as the last one property
    const link = new shapes.standard.Link()
      .source(rect1)
      .target(rect2)
      .addTo(graph)
      .router('orthogonal')
      .connector('straight', { cornerType: 'line' })
      .appendLabel({ attrs: { text: { text: 'to' } } })
    const stencil = new ui.Stencil({
      paper: paper,
      width: 170,
      height: '100%',
      layout: true,
      dropAnimation: true,
    }).render()
    //binding el with real dom
    document.getElementById('stencil')!.appendChild(stencil.el)
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
    return () => {}
  }, [])
  const ExplanationText1 = `const stencil = new ui.Stencil({
            paper: paper,
            width: 170,
            height: '100%',
            layout: true,
            dropAnimation: true
        })
        stencil.render()
        //binding el with real dom
        document.getElementById('stencil')!.appendChild(stencil.el);`
  const ExplanationText2 = `const elements = [
            {
                type: 'standard.Rectangle',
                size: { width: 70, height: 50 },
                attrs: {
                    body: {
                        stroke: '#C94A46',
                        rx: 2,
                        ry: 2
                    }
                }
            },
            {
                type: 'standard.Ellipse',
                size: { width: 70, height: 50 },
                attrs: {
                    body: {
                        stroke: '#C94A46',
                    }
                }
            },
            {
                type: 'standard.Polygon',
                size: { width: 70, height: 50 },
                attrs: {
                    body: {
                        stroke: '#C94A46',
                        points: 'calc(w/2),0 calc(w),calc(h/2) calc(w/2),calc(h) 0,calc(h/2)'
                    }
                }
            },
            {
                type: 'standard.Cylinder',
                size: { width: 70, height: 50 },
                attrs: {
                    body: {
                        stroke: '#C94A46',
                    },
                    top: {
                        fill: '#C94A46',
                        stroke: '#C94A46'
                    }
                }
            }
        ];
        stencil.load(elements);//thats all you need to do for this part
    `
  return (
    <div>
      <div id="paper"></div>
      <div id="stencil"></div>
      {/* flex布局 */}
      <p>
        In this part, you need the lib 'rappid' of JointJS+ first and then
        import rappid.min.js and rappid.min.css into ur public floder. or try
        import { ui } from 'joint-plus';
using work@email to get 30days free,then follow the integration guide to
        add rappid
      </p>
      <h2>Element Palette(left side)</h2>
      <p>
        For low-code platforms,we need to provide modules for user to use, and{' '}
        <code className="inline">palette</code> is the element that realizes
        this function in JointJs.
      </p>
      <p>
        To create an element palette, we use the `Stencil` plugin of rappid.The
        plugin populates an ordinary
        <code className="inilne">&lt;div&gt;</code> with a selection tool and
        allows the user to drag them into the Paper. Let we learn the main
        property about Stencil:
      </p>
      <ul>
        <li>paper: specify the work paper</li>
        <li>layout: automatic arrangement need or not</li>
        <li>
          dropAnimation: the animation of not placed on paper to better feel for
          user
        </li>
      </ul>
      <pre className="code-block">
        <code className="block">{ExplanationText1}</code>
      </pre>
      <p>
        Next as a step, we need to add element into stencil for user like this:
      </p>
      <pre className="code-block">
        <code className="block">{ExplanationText2}</code>
      </pre>
    </div>
  )
}
