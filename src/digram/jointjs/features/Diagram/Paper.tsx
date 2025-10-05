import React, { useRef, useEffect } from "react";
import { dia, g, shapes, ui } from "@joint/plus";
import "../../App.css";

export default function Paper(): React.ReactElement {
  const graphRef = useRef<dia.Graph | null>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const paperInstanceRef = useRef<dia.Paper | null>(null);
  useEffect(() => {
    const graph = new dia.Graph({}, { cellNamespace: shapes });
    graphRef.current = graph;
    if (paperRef.current && graphRef.current) {
      const paper = new dia.Paper({
        el: paperRef.current,
        model: graph,
        width: "100%",
        height: 500,
        cellViewNamespace: shapes,
        background: { color: "#f5f5f5" },
      });
      paperInstanceRef.current = paper;
      const rect1 = new shapes.standard.Rectangle()
        .position(100, 100)
        .resize(100, 40)
        .attr({
          body: { fill: "blue" },
          label: { text: "Hello", fill: "black" },
        });
      graph.addCell(rect1);
      // all points will be scaled down to (origin*x, origin*y) in paper
    //   paper.scale(0.5, 0.5);
    // move the origin of the paper to (x + 300, y + 0)
    // paper.translate(300, 0);
    } else {
      console.error("paperRef or graphRef is null");
    }
    return () => {
        
    };
  }, []);

  return (
    <div>
      <h3>JointJS Paper画布</h3>
      <div ref={paperRef}></div>
    </div>
  );
}
