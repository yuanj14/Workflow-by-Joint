import { useJointInit } from '@/hooks'
import { dia, linkTools, shapes } from '@joint/plus'
import { useEffect } from 'react'

export default function Tools() {
  const { paperRef, paper, graph, paperScroller } = useJointInit(true, {
    markAvailable: true,
    linkPinning: true,
    defaultRouter: {
      name: 'manhattan',
      args: {
        step: 30, // 网格大小
        padding: { top: 40, bottom: 40, left: 30, right: 30 }, // 各参数最小要大于1/2 Block 大小对应宽高的值，否则可能会出现连接线穿过节点的情况
        perpendicular: true,
        maximumLoops: 100,
        maxAllowedDirectionChange: 270,
        excludeEnds: [], // 代替默认值'source,target'
      },
    },
    defaultConnector: { name: 'normal' }, // 连接线垂直连接线
    defaultConnectionPoint: { name: 'boundary', args: { offset: 2 } }, // 连接点为节点边界
  })

  useEffect(() => {
    if (!paper || !graph) {
      return
    }

    const unit = 4
    const CustomTargetArrowhead = linkTools.TargetArrowhead.extend({
      attributes: {
        d: 'M -12 -8 L 12 0 L -12 8 L -6 0 Z',
        fill: '#0d6efd',
        stroke: '#FFFFFF',
        'stroke-width': 2,
        cursor: 'move',
        class: 'target-arrowhead',
      },
    })

    const portGroup = {
      left: {
        position: { name: 'left' as const },
        attrs: {
          circle: {
            r: 6,
            magnet: true,
            fill: '#fff',
            stroke: '#0d6efd',
            strokeWidth: 2,
          },
        },
        markup: [{ tagName: 'circle', selector: 'circle' }],
      },
      right: {
        position: { name: 'right' as const },
        attrs: {
          circle: {
            r: 6,
            magnet: true,
            fill: '#fff',
            stroke: '#0d6efd',
            strokeWidth: 2,
          },
        },
        markup: [{ tagName: 'circle', selector: 'circle' }],
      },
    }

    const createRect = (x: number, y: number, label: string) =>
      new shapes.standard.Rectangle({
        position: { x, y },
        size: { width: 140, height: 70 },
        attrs: {
          body: { fill: '#fff', stroke: '#222', strokeWidth: 2 },
          label: { text: label, fill: '#222' },
        },
        ports: {
          groups: portGroup,
          items: [
            { group: 'left', id: `${label}-left` },
            { group: 'right', id: `${label}-right` },
          ],
        },
      })

    // ✨ Node A 使用左+下端口做兼容性测试
    const rect1 = new shapes.standard.Rectangle({
      position: { x: 60, y: 80 },
      size: { width: 140, height: 70 },
      attrs: {
        body: { fill: '#fff', stroke: '#222', strokeWidth: 2 },
        label: { text: 'Node A', fill: '#222' },
      },
      ports: {
        groups: {
          ...portGroup,
          bottom: {
            position: { name: 'bottom' as const },
            attrs: {
              circle: {
                r: 6,
                magnet: true,
                fill: '#fff',
                stroke: '#0d6efd',
                strokeWidth: 2,
              },
            },
            markup: [{ tagName: 'circle', selector: 'circle' }],
          },
        },
        items: [
          { group: 'left', id: 'Node A-left' },
          { group: 'bottom', id: 'Node A-bottom' },
        ],
      },
    })
    const rect2 = createRect(350, 80, 'Node B')
    const rect3 = createRect(350, 260, 'Node C')

    const link1 = new shapes.standard.Link({
      source: { id: rect1.id, port: 'Node A-right' },
      target: { id: rect2.id, port: 'Node B-left' },
      attrs: {
        line: {
          stroke: '#0d6efd',
          strokeWidth: 2,
          targetMarker: {
            d: `M 0 0 L ${2 * unit} ${unit} L ${2 * unit} -${unit} Z`,
          },
        },
        wrapper: { magnet: true },
      },
    })
    graph.addCells([rect1, rect2, rect3, link1])

    // ✨ 为所有 link 添加工具
    const addLinkTools = (linkModel: shapes.standard.Link) => {
      const lv = paper.findViewByModel(linkModel)
      if (!lv) return
      lv.addTools(
        new dia.ToolsView({
          tools: [
            new linkTools.Segments({ snapRadius: 10 }),
            new CustomTargetArrowhead(),
            new linkTools.SourceAnchor(),
            new linkTools.Remove({ distance: 40 }),
          ],
        }),
      )
    }
    addLinkTools(link1)

    const onCtrlClickBranch = (
      _linkView: dia.LinkView,
      evt: dia.Event,
      x: number,
      y: number,
    ) => {
      const pointerEvent = evt as unknown as { ctrlKey?: boolean }
      if (!pointerEvent.ctrlKey) {
        return
      }

      evt.preventDefault()
      evt.stopPropagation()

      // ✨ 计算点击位置在 link 路径上的比例，作为 source anchor 偏移
      const closestPointRatio = _linkView.getClosestPointRatio({ x, y })

      const branchLink = new shapes.standard.Link({
        source: {
          id: _linkView.model.id,
          anchor: {
            name: 'connectionRatio',
            args: { ratio: closestPointRatio ?? 0.5 },
          },
        },
        target: { x, y },
        attrs: {
          line: {
            stroke: '#0d6efd',
            strokeWidth: 2,
            targetMarker: {
              d: `M 0 0 L ${2 * unit} ${unit} L ${2 * unit} -${unit} Z`,
            },
          },
        },
      })

      graph.addCell(branchLink)

      const branchLinkView = paper.findViewByModel(branchLink)
      if (!branchLinkView) {
        return
      }

      const linkView = branchLinkView as dia.LinkView
      const paperApi = paper as unknown as {
        delegateDragEvents: (
          view: dia.LinkView,
          data?: Record<string, unknown>,
        ) => void
      }

      const dragData = (
        linkView as unknown as {
          startArrowheadMove: (
            end: 'source' | 'target',
            options?: Record<string, unknown>,
          ) => Record<string, unknown>
        }
      ).startArrowheadMove('target', { whenNotAllowed: 'remove' })
      paperApi.delegateDragEvents(linkView, dragData)

      // ✨ 拖拽结束后再添加 tools，避免立即 addTools 干扰 delegateDragEvents 的拖拽/端口连接
      paper.once('link:pointerup', (upLinkView: dia.LinkView) => {
        if (upLinkView.model.id !== branchLink.id) return
        upLinkView.addTools(
          new dia.ToolsView({
            tools: [
              new linkTools.TargetArrowhead(),
              new linkTools.SourceAnchor({ restrictArea: false }),
            ],
          }),
        )
      })
    }
    paper.on('link:pointerdown', onCtrlClickBranch)
    paperScroller?.centerContent()
    return () => {
      paper.off('link:pointerdown', onCtrlClickBranch)
    }
  }, [paper, graph])

  // ✨ 将 source 为 link 的连线重映射为对应 link 的 source（只需要处理一层）
  const logRemappedJSON = () => {
    if (!graph) return
    const json = graph.toJSON()
    const cellMap = new Map<string, any>(json.cells.map((c: any) => [c.id, c]))

    const remapped = json.cells.map((cell: any) => {
      if (!cell.source?.id) return cell
      const sourceCell = cellMap.get(cell.source.id)
      // 如果 source 指向的是一条 link，则替换为该 link 的 source
      if (sourceCell && sourceCell.source !== undefined) {
        return { ...cell, source: sourceCell.source }
      }
      return cell
    })

    const slim = remapped.map(({ id, type, source, target }: any) =>
      Object.fromEntries(
        Object.entries({ id, type, source, target }).filter(
          ([, v]) => v !== undefined,
        ),
      ),
    )
    console.log(JSON.stringify(slim, null, 2))
  }

  return (
    <div style={{ width: '100%' }}>
      <button onClick={logRemappedJSON} style={{ marginBottom: 8 }}>
        Log Remapped JSON
      </button>
      <div
        style={{
          // overflow: 'hidden',
          width: '100%',
          height: '600px',
        }}>
        <div ref={paperRef}></div>
      </div>
    </div>
  )
}
