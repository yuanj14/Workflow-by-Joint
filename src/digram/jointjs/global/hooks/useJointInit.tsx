import React, { useRef, useEffect, useState } from "react";
import { dia, g, shapes, ui } from "@joint/plus";
import "../../App.css";

// 驼峰式命名 cellViewModel
export function useJointInit() {
    const graphRef = useRef<dia.Graph | null>(null);
    const paperRef = useRef<HTMLDivElement>(null);
    const paperInstanceRef = useRef<dia.Paper | null>(null);
    // const graph = new dia.Graph({}, { cellNamespace: shapes });
    const [paper, setPaper] = useState<dia.Paper | null>(null);
    // console.log(graph);
    if (graphRef.current === null) {
        graphRef.current = new dia.Graph({}, { cellNamespace: shapes });
    }

    useEffect(() => {
        //DOM更新机制
        if (paper) { return }
        if (paperRef.current) {
            const paper = new dia.Paper({
                el: paperRef.current,
                model: graphRef.current!,
                width: "100%",
                height: 500,
                async: true,
                sorting: dia.Paper.sorting.APPROX,
                cellViewNamespace: shapes,
                background: { color: "#f5f5f5" },
                snapLabels: true,
                clickThreshold: 10,
                interactive: {
                    linkMove: false
                },
                gridSize: 5,
                defaultConnectionPoint: {
                    name: "boundary",
                    args: {
                        offset: 8,
                        extrapolate: true
                    }
                },
                defaultRouter: { name: "rightAngle", args: { margin: 4 * 7 } },
                defaultConnector: {
                    name: "rounded",
                    // args: { cornerType: "line", cornerPreserveAspectRatio: true }
                } // bevelled path
            });
            paperInstanceRef.current = paper;
            setPaper(paper)
        } else {
            console.error('paperRef.current is null');
        }
        return () => { }
    }, []);

    return { graph: graphRef.current, graphRef, paperRef, paper };
}