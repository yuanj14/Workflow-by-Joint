import { dia, shapes } from '@joint/core'
import { useEffect } from 'react'
import '../../css/text.css'

export default function PaperComponent() {
  useEffect(() => {
    const namespace = shapes
    const graph = new dia.Graph({}, { cellNamespace: namespace })
    const paper = new dia.Paper({
      el: document.getElementById('paper'),
      model: graph,
      width: 300,
      height: 300,
      background: { color: '#F5F5F5' },
      cellViewNamespace: namespace,
    })
    return () => {
      // paper.remove();
    }
  }, [])

  const codeExample = `const namespace = shapes; 
const graph = new dia.Graph({}, { cellNamespace: namespace }); 
const paper = new dia.Paper({
  el: document.getElementById("paper"), 
  model: graph,
  width: 300,
  height: 300,
  background: { color: "#F5F5F5" },
  cellViewNamespace: namespace
});`

  return (
    <div className="container">
      <div
        id="paper"
        style={{ border: '1px solid #ccc', marginBottom: '20px' }}></div>

      <h2>Create Paper</h2>
      <p>
        Every JointJs diagram needs a Paper, a Graph and a shared namespace.
      </p>
      <p>
        The JointJs Paper transforms an ordinary HTML element into an
        interactive diagram area. In our example, we identify
        <code className="inline">&lt;div id="paper"&gt;</code> as the host HTML
        element of our Joint paper via the <code className="inline">el</code>
        Paper property like this:
      </p>

      <pre className="code-block">
        <code className="block">{codeExample}</code>
      </pre>
    </div>
  )
}
