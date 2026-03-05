// ✨ 三方库 TypeScript 声明示例
//
// 三方库（如 @joint/plus）在 node_modules 里自带 .d.ts 文件，
// TypeScript 会自动读取，无需手动声明。
// 调用时如果类型不匹配，TS 会直接报错。
//
// 自己写的函数没有 .d.ts，所以要在代码里手动写类型注解。

import { dia, shapes } from '@joint/plus'

export default function Temp() {
  useEffect(() => {
    const graph = new dia.Graph({}, { cellNamespace: shapes })

    // ✅ 正确：position 符合 { x: number, y: number } 类型
    const rect = new shapes.standard.Rectangle({
      position: { x: 100, y: 100 },
      size: { width: 120, height: 60 },
      attrs: { label: { text: 'Hello JointJS' } },
    })
    graph.addCell(rect)

    // ✅ 三方库方法：getBBox() 返回 Rect | null，TS 自动推导
    const bbox = graph.getBBox()
    console.log('bbox:', bbox?.width, bbox?.height)

    // ✅ Cell.ID 类型是 string | number，TS 自动推导
    const id: dia.Cell.ID = rect.id
    console.log('id:', id)
  }, [])

  return (
    <div style={{ padding: 32, fontFamily: 'monospace' }}>
    </div>
  )
}
