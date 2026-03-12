import { dia, shapes, ui } from '@joint/plus'
import { useEffect, useRef, useState } from 'react'

/**
 * JointJS 初始化 Hook
 * @description 封装 Graph + Paper 的创建、挂载和清理
 *
 * @param scroller 是否启用 PaperScroller 模式，默认 false
 * @param paperOptions Paper 额外配置
 *
 * @example
 * const { paperRef, graph, paper } = useJointInit()
 *
 * @example
 * const { paperRef, graph, paper } = useJointInit(true)
 */
const useJointInit = (
  scroller = false,
  paperOptions: Partial<dia.Paper.Options> = {},
) => {
  const paperRef = useRef<HTMLDivElement | null>(null)
  const [graph, setGraph] = useState<dia.Graph | null>(null)
  const [paper, setPaper] = useState<dia.Paper | null>(null)
  const [paperScroller, setPaperScroller] = useState<ui.PaperScroller | null>(
    null,
  )

  useEffect(() => {
    const el = paperRef.current
    if (!el) return

    Object.assign(el.style, { width: '100%', height: '100%' })
    // 清空容器，避免重复挂载时的 DOM 冲突
    el.replaceChildren()

    const namespace = shapes
    const graph = new dia.Graph({}, { cellNamespace: namespace })

    const options: Partial<dia.Paper.Options> = {
      model: graph,
      cellViewNamespace: namespace,
      background: { color: '#F5F5F5' },
      defaultRouter: { name: 'orthogonal' },
      defaultConnector: { name: 'straight', args: { cornerType: 'line' } },
      ...paperOptions,
    }

    const paperConfig: Partial<dia.Paper.Options> = scroller
      ? options
      : { ...options, el, width: '100%', height: 1000 }

    const paper = new dia.Paper(paperConfig)
    setGraph(graph)
    setPaper(paper)

    let paperScroller: ui.PaperScroller | null = null
    if (scroller) {
      paperScroller = new ui.PaperScroller({
        paper,
        scrollWhileDragging: true,
        autoResizePaper: true,
        borderless: true,
      }).render()

      Object.assign(paperScroller.el.style, {
        width: '100%',
        height: '100%',
        scrollbarWidth: 'none',
      })
      el.appendChild(paperScroller.el)
      setPaperScroller(paperScroller)
    }

    return () => {
      // 清理内存资源 防止泄漏
      graph.clear()
      paperScroller?.remove()
      paper.remove()
      console.log('JointJS 卸载')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return { paperRef, graph, paper, paperScroller }
}

export { useJointInit }
