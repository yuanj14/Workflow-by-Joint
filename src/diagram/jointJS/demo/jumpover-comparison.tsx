import { dia, shapes } from '@joint/plus'
import { useEffect } from 'react'

export default function JumpoverComparisonComponent() {
  useEffect(() => {
    const namespace = shapes

    // ========== Arc Type ==========
    const graphArc = new dia.Graph({}, { cellNamespace: namespace })
    const paperArc = new dia.Paper({
      el: document.getElementById('paper-arc'),
      model: graphArc,
      width: '100%',
      height: 400,
      background: { color: '#F5F5F5' },
      cellViewNamespace: namespace,
      defaultRouter: { name: 'orthogonal' },
      defaultConnector: { name: 'jumpover', args: { type: 'arc' } },
    })

    const arcRect1 = new shapes.standard.Rectangle()
      .position(50, 50)
      .resize(100, 50)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'Start', fill: 'black' },
      })
      .addTo(graphArc)

    const arcRect2 = new shapes.standard.Rectangle()
      .position(250, 50)
      .resize(100, 50)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'End', fill: 'black' },
      })
      .addTo(graphArc)

    const arcLink1 = new shapes.standard.Link()
      .source(arcRect1)
      .target(arcRect2)
      .addTo(graphArc)

    // 添加交叉线来展示 jumpover 效果
    const arcInterLine = new shapes.standard.Link()
      .source({ x: 150, y: 0 })
      .target({ x: 150, y: 400 })
      .attr({ line: { stroke: '#1890FF', strokeWidth: 2 } })
      .addTo(graphArc)

    // ========== Cubic Type ==========
    const graphCubic = new dia.Graph({}, { cellNamespace: namespace })
    const paperCubic = new dia.Paper({
      el: document.getElementById('paper-cubic'),
      model: graphCubic,
      width: '100%',
      height: 400,
      background: { color: '#F5F5F5' },
      cellViewNamespace: namespace,
      defaultRouter: { name: 'orthogonal' },
      defaultConnector: { name: 'jumpover', args: { type: 'cubic' , radius: 20 } },
    })

    const cubicRect1 = new shapes.standard.Rectangle()
      .position(50, 50)
      .resize(100, 50)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'Start', fill: 'black' },
      })
      .addTo(graphCubic)

    const cubicRect2 = new shapes.standard.Rectangle()
      .position(250, 50)
      .resize(100, 50)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'End', fill: 'black' },
      })
      .addTo(graphCubic)

    const cubicLink1 = new shapes.standard.Link()
      .source(cubicRect1)
      .target(cubicRect2)
      .addTo(graphCubic)

    const cubicInterLine = new shapes.standard.Link()
      .source({ x: 150, y: 0 })
      .target({ x: 150, y: 400 })
      .attr({ line: { stroke: '#1890FF', strokeWidth: 2 } })
      .addTo(graphCubic)

    // ========== Gap Type ==========
    const graphGap = new dia.Graph({}, { cellNamespace: namespace })
    const paperGap = new dia.Paper({
      el: document.getElementById('paper-gap'),
      model: graphGap,
      width: '100%',
      height: 400,
      background: { color: '#F5F5F5' },
      cellViewNamespace: namespace,
      defaultRouter: { name: 'orthogonal' },
      defaultConnector: { name: 'jumpover', args: { type: 'gap' } },
    })

    const gapRect1 = new shapes.standard.Rectangle()
      .position(50, 50)
      .resize(100, 50)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'Start', fill: 'black' },
      })
      .addTo(graphGap)

    const gapRect2 = new shapes.standard.Rectangle()
      .position(250, 50)
      .resize(100, 50)
      .attr({
        body: { stroke: '#C94A46', rx: 2, ry: 2 },
        label: { text: 'End', fill: 'black' },
      })
      .addTo(graphGap)

    const gapLink1 = new shapes.standard.Link()
      .source(gapRect1)
      .target(gapRect2)
      .addTo(graphGap)

    const gapInterLine = new shapes.standard.Link()
      .source({ x: 150, y: 0 })
      .target({ x: 150, y: 400 })
      .attr({ line: { stroke: '#1890FF', strokeWidth: 2 } })
      .addTo(graphGap)

    return () => {}
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Jumpover Connector Type 对比</h1>
      <p>
        下面展示了三种 jumpover type 的差异（蓝色线是交叉线，用来展示 jumpover
        效果）
      </p>

      <div style={{ marginBottom: '40px' }}>
        <h2>1. type: 'arc' - 圆弧跳过（默认）</h2>
        <p>使用 SVG Arcto 命令，产生光滑的圆弧效果</p>
        <div id="paper-arc" />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>2. type: 'cubic' - 立方贝塞尔曲线</h2>
        <p>使用贝塞尔曲线，是 Arcto 的近似，看起来很相似但计算略有不同</p>
        <div id="paper-cubic" />
      </div>

      <div>
        <h2>3. type: 'gap' - 留白间隙</h2>
        <p>不绘制弧线，而是在交叉点留下一个空隙</p>
        <div id="paper-gap" />
      </div>

      <div
        style={{
          marginTop: '40px',
          padding: '15px',
          backgroundColor: '#E6F7FF',
          borderRadius: '4px',
        }}>
        <h3>💡 区别说明：</h3>
        <ul>
          <li>
            <strong>arc</strong>：产生光滑的圆弧，视觉上最流畅
          </li>
          <li>
            <strong>cubic</strong>
            ：使用贝塞尔曲线，性能略好，但肉眼几乎看不出差异
          </li>
          <li>
            <strong>gap</strong>
            ：在交叉点处断开，完全不绘制弧线，最清晰地显示线的交叉
          </li>
        </ul>
      </div>
    </div>
  )
}
