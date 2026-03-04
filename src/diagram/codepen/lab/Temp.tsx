// ✨ unplugin-auto-import 示例
// 配置了 auto-import 后，useState / useEffect 等 React API
// 无需手动 import，可以直接使用
//
// 未配置时你必须写：
//   import { useState, useEffect } from 'react'
//
// 配置后可以省略上面这行，直接用 👇

export default function Temp() {
  // ✨ 直接使用，无需 import
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ padding: 32, fontFamily: 'monospace' }}>
      <h2>unplugin-auto-import 示例</h2>

      <section style={{ marginBottom: 24 }}>
        <p>当前时间（useEffect + setInterval）：</p>
        <strong style={{ fontSize: 24 }}>{time}</strong>
      </section>

      <section>
        <p>计数器（useState）：</p>
        <button onClick={() => setCount((c) => c - 1)}>-</button>
        <span style={{ margin: '0 16px', fontSize: 20 }}>{count}</span>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
      </section>

      <pre
        style={{
          marginTop: 32,
          background: '#f5f5f5',
          padding: 16,
          borderRadius: 8,
        }}>
        {`// ❌ 没有 auto-import，需要手动写：
import { useState, useEffect } from 'react'

// ✅ 配置 auto-import 后，这行可以删掉
//    构建时会自动注入 import`}
      </pre>
    </div>
  )
}
