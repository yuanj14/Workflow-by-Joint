import { useMemo } from 'react'
import styles from '../scss/Temp.module.scss'

export default function Temp() {
  const globalStyleA = useMemo(
    () => `.title { color: #1677ff; font-weight: 700; }`,
    [],
  )
  const globalStyleB = useMemo(() => `.title { color: #f5222d; }`, [])

  return (
    <div className={styles.page}>
      <h2>CSS 冲突 vs SCSS Modules</h2>

      <section className={styles.block}>
        <h3>1) 普通全局 CSS：容易冲突</h3>
        <style>{globalStyleA}</style>
        <style>{globalStyleB}</style>
        <div className={styles.row}>
          <div className={styles.card}>
            <div className="title">
              组件 A：期望蓝色，最终被后加载样式覆盖成红色
            </div>
          </div>
          <div className={styles.card}>
            <div className="title">组件 B：红色</div>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <h3>2) SCSS Modules：默认局部作用域</h3>
        <div className={styles.row}>
          <div className={styles.moduleCardA}>
            <div className={styles.title}>模块 A 标题（蓝色）</div>
          </div>
          <div className={styles.moduleCardB}>
            <div className={styles.title}>模块 B 标题（红色）</div>
          </div>
        </div>
      </section>
    </div>
  )
}
