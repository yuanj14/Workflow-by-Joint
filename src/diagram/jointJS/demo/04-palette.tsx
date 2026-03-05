/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react'
import { dia, shapes, ui } from '@joint/plus'
import { useEffect } from 'react'

export default function PaletteComponent() {
  // 📌 Emotion CSS 内联样式定义
  const globalStyles = css`
    html,
    body,
    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  `
  const stencilStyles = css`
    position: absolute;
    top: 0;
    width: 170px;
    left: 0;
    bottom: 0;
  `

  // 📌 Main - 占据剩余空间
  const paperStyles = css`
    margin: 50px 0 0 50px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 170px;
    position: relative;
  `
  useEffect(() => {
    const namespace = shapes
    const graph = new dia.Graph({}, { cellNamespace: namespace })
    const paper = new dia.Paper({
      el: document.getElementById('paper'),
      model: graph,
      background: { color: '#F5F5F5' },
      cellViewNamespace: namespace,
    })
    const stencil = new ui.Stencil({
      paper: paper,
      width: 170,
      height: '100%',
      layout: true,
      dropAnimation: true,
    }).render()
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
  return (
    <div>
      <Global styles={globalStyles} />
      <div id="paper" css={paperStyles}></div>
      <div id="stencil" css={stencilStyles}></div>
    </div>
  )
}
