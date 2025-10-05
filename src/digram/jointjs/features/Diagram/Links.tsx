import React, { useRef, useEffect } from "react";
import { dia, g, shapes, ui } from "@joint/plus";
import "../../App.css";
import { useJointInit } from "../../global/hooks/useJointInit";

export default function Links() {
    const { paperRef, paper, graph, graphRef } = useJointInit();

    useEffect(() => {
        if (!paper) { return }
        // 创建源元素
        const sourceElement = new shapes.standard.Rectangle({
            position: { x: 100, y: 100 },
            size: { width: 100, height: 60 },
            attrs: {
                body: { fill: "lightblue", },
                label: { text: "Source", fill: "black" },
            },
        });

        const targetElement = new shapes.standard.Rectangle({
            position: { x: 300, y: 100 },
            size: { width: 100, height: 60 },
            attrs: {
                body: { fill: "lightgreen" },
                label: { text: "Target", fill: "black" },
            }
        })
        const element3 = sourceElement.clone().set('position', { x: 100, y: 200 })
        graph.addCells([sourceElement, targetElement, element3]);

        // const link1 = new shapes.standard.Link({
        //     target: { id: targetElement.id },
        //     attrs: {
        //         line: { stroke: "red", strokeWidth: 2 },
        //     },

        // });
        // // link.source(element, subattrs)
        // // link1.source(sourceElement, { selector: "label" });
        // link1.source(sourceElement, {
        //     // anchor: {
        //     //     name: 'perpendicular',
        //     //     args: {
        //     //         dx: 0,
        //     //         dy: 0
        //     //     }
        //     // }, 
        //     linkAnchor: {
        //         name: 'connectionRatio',
        //         args: {
        //             ratio: 0.25
        //         }
        //     }
        // });
        // 先创建 linkA（连接两个元素）
        const linkA = new shapes.standard.Link({
            source: { id: sourceElement.id },
            target: { id: targetElement.id },
            attrs: { line: { stroke: 'blue' } }
        });
        graph.addCell(linkA);
        console.log(linkA.get('vertices')); // 应该输出 []
        // 创建 linkB，源端点连接到 linkA 的 25% 位置
        const linkB = new shapes.standard.Link({
            target: { id: element3.id },
            attrs: { line: { stroke: 'red' } }
        });

        linkB.source(linkA, {
            linkAnchor: {
                name: 'connectionRatio',
                args: {
                    ratio: 0.8
                }
            }
        });

        graph.addCell(linkB);
        // graph.addCell(link1);
        return () => {
            graph.clear()
        };
    }, [paper]);

    return (
        <div>
            <div>Joint Links</div>
            <div ref={paperRef}></div>
        </div>
    );
}